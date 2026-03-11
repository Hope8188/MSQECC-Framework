import csv
import math
import random
import sys

# Monte Carlo test: rotational averaging of |p_x||p_y||p_z|
# Pure-Python version (no external deps).

QUIET = '--quiet' in sys.argv


def qprint(*args, **kwargs):
    if not QUIET:
        print(*args, **kwargs)


def sample_unit_sphere(n, rng):
    samples = []
    for _ in range(n):
        x = rng.gauss(0.0, 1.0)
        y = rng.gauss(0.0, 1.0)
        z = rng.gauss(0.0, 1.0)
        r = math.sqrt(x * x + y * y + z * z)
        if r == 0.0:
            continue
        samples.append((x / r, y / r, z / r))
    return samples


def avg_product(samples, anisotropy=(1.0, 1.0, 1.0)):
    ax, ay, az = anisotropy
    total = 0.0
    for x, y, z in samples:
        total += abs(ax * x) * abs(ay * y) * abs(az * z)
    return total / len(samples)


def scaling_fit(radii, base_avg):
    xs = [math.log(r) for r in radii]
    ys = [math.log(base_avg * (r ** 3)) for r in radii]
    n = len(xs)
    xbar = sum(xs) / n
    ybar = sum(ys) / n
    num = sum((xs[i] - xbar) * (ys[i] - ybar) for i in range(n))
    den = sum((xs[i] - xbar) ** 2 for i in range(n))
    b = num / den
    a = ybar - b * xbar
    return a, b


def bootstrap_ci(samples, anisotropy=(1.0, 1.0, 1.0), trials=200, rng=None):
    if rng is None:
        rng = random.Random(999)
    n = len(samples)
    means = []
    for _ in range(trials):
        resampled = [samples[rng.randrange(n)] for _ in range(n)]
        means.append(avg_product(resampled, anisotropy=anisotropy))
    means.sort()
    lo = means[int(0.025 * trials)]
    hi = means[int(0.975 * trials)]
    return lo, hi


def lattice_shell_vectors(r):
    rr = r * r
    vecs = []
    for x in range(-r, r + 1):
        for y in range(-r, r + 1):
            for z in range(-r, r + 1):
                if x == 0 and y == 0 and z == 0:
                    continue
                if x * x + y * y + z * z == rr:
                    vecs.append((x, y, z))
    return vecs


def shell_stats(r, anisotropy=(1.0, 1.0, 1.0)):
    vecs = lattice_shell_vectors(r)
    if not vecs:
        return None
    ax, ay, az = anisotropy
    sum_all = 0.0
    sum2_all = 0.0
    count_all = 0
    sum_nz = 0.0
    sum2_nz = 0.0
    count_nz = 0
    for x, y, z in vecs:
        norm = math.sqrt(x * x + y * y + z * z)
        nx = x / norm
        ny = y / norm
        nz = z / norm
        val = abs(ax * nx) * abs(ay * ny) * abs(az * nz)
        sum_all += val
        sum2_all += val * val
        count_all += 1
        if val > 0.0:
            sum_nz += val
            sum2_nz += val * val
            count_nz += 1
    avg_all = sum_all / count_all if count_all else 0.0
    avg_nz = sum_nz / count_nz if count_nz else 0.0
    avg2_all = sum2_all / count_all if count_all else 0.0
    avg2_nz = sum2_nz / count_nz if count_nz else 0.0
    return {
        "r": r,
        "count_all": count_all,
        "sum_all": sum_all,
        "sum2_all": sum2_all,
        "avg_all": avg_all,
        "count_nz": count_nz,
        "sum_nz": sum_nz,
        "sum2_nz": sum2_nz,
        "avg_nz": avg_nz,
        "avg2_nz": avg2_nz,
    }


def fit_convergence(points):
    data = [(r, c) for (r, c) in points if c > 0.0]
    if len(data) < 5:
        return None
    cs = [c for _r, c in data]
    c_min = min(cs)
    lo = max(0.0, c_min * 0.5)
    hi = c_min * 0.999
    steps = 200
    best = None
    for i in range(steps):
        c_inf = lo + (hi - lo) * i / (steps - 1)
        xs = []
        ys = []
        for r, c in data:
            diff = c - c_inf
            if diff <= 0.0:
                break
            xs.append(math.log(r))
            ys.append(math.log(diff))
        if len(xs) != len(data):
            continue
        n = len(xs)
        xbar = sum(xs) / n
        ybar = sum(ys) / n
        num = sum((xs[j] - xbar) * (ys[j] - ybar) for j in range(n))
        den = sum((xs[j] - xbar) ** 2 for j in range(n))
        if den == 0.0:
            continue
        slope = num / den
        intercept = ybar - slope * xbar
        alpha = -slope
        A = math.exp(intercept)
        err = 0.0
        for r, c in data:
            pred = c_inf + A / (r ** alpha)
            err += (c - pred) ** 2
        rms = math.sqrt(err / n)
        if best is None or rms < best[3]:
            best = (c_inf, A, alpha, rms)
    return best


def fit_log_correction(points):
    data = [(r, f) for (r, f) in points if r > 1 and f < 1.0 and f > 0.0]
    if len(data) < 5:
        return None
    best = None
    for gamma in [i / 100.0 for i in range(10, 401)]:
        xs = []
        ys = []
        for r, f in data:
            x = 1.0 / (math.log(r) ** gamma)
            y = 1.0 - f
            xs.append(x)
            ys.append(y)
        num = sum(xs[i] * ys[i] for i in range(len(xs)))
        den = sum(xs[i] * xs[i] for i in range(len(xs)))
        if den == 0.0:
            continue
        B = num / den
        err = 0.0
        for r, f in data:
            pred = 1.0 - B / (math.log(r) ** gamma)
            err += (f - pred) ** 2
        rms = math.sqrt(err / len(data))
        if best is None or rms < best[2]:
            best = (gamma, B, rms)
    return best


def bin_shells(shells, delta_r=5):
    bins = []
    r_min = min(s["r"] for s in shells)
    r_max = max(s["r"] for s in shells)
    r = r_min
    while r <= r_max:
        r_start = r
        r_end = min(r + delta_r - 1, r_max)
        sum_all = 0.0
        sum2_all = 0.0
        count_all = 0
        sum_nz = 0.0
        sum2_nz = 0.0
        count_nz = 0
        for s in shells:
            if r_start <= s["r"] <= r_end:
                sum_all += s["sum_all"]
                sum2_all += s["sum2_all"]
                count_all += s["count_all"]
                sum_nz += s["sum_nz"]
                sum2_nz += s["sum2_nz"]
                count_nz += s["count_nz"]
        avg_all = sum_all / count_all if count_all else 0.0
        avg_nz = sum_nz / count_nz if count_nz else 0.0
        avg2_all = sum2_all / count_all if count_all else 0.0
        avg2_nz = sum2_nz / count_nz if count_nz else 0.0
        bins.append({
            "r_start": r_start,
            "r_end": r_end,
            "r_mid": (r_start + r_end) / 2.0,
            "count_all": count_all,
            "avg_all": avg_all,
            "avg2_all": avg2_all,
            "count_nz": count_nz,
            "avg_nz": avg_nz,
            "avg2_nz": avg2_nz,
            "f": (count_nz / count_all) if count_all else 0.0,
        })
        r += delta_r
    return bins


def angular_pdf_stats(samples, bin_count=100):
    xs = [abs(x) * abs(y) * abs(z) for (x, y, z) in samples]
    n = len(xs)
    mean = sum(xs) / n
    xs_sorted = sorted(xs)

    def percentile(p):
        if n == 1:
            return xs_sorted[0]
        k = (n - 1) * p
        f = math.floor(k)
        c = math.ceil(k)
        if f == c:
            return xs_sorted[int(k)]
        d = k - f
        return xs_sorted[int(f)] * (1 - d) + xs_sorted[int(c)] * d

    # histogram
    x_max = max(xs)
    bins = [0] * bin_count
    if x_max == 0.0:
        return None
    for v in xs:
        idx = int((v / x_max) * (bin_count - 1))
        bins[idx] += 1

    # mode from histogram
    mode_idx = max(range(bin_count), key=lambda i: bins[i])
    mode = (mode_idx + 0.5) * (x_max / bin_count)

    # skewness and kurtosis
    m2 = sum((v - mean) ** 2 for v in xs) / n
    m3 = sum((v - mean) ** 3 for v in xs) / n
    m4 = sum((v - mean) ** 4 for v in xs) / n
    skew = m3 / (m2 ** 1.5) if m2 > 0 else 0.0
    kurt = m4 / (m2 ** 2) - 3.0 if m2 > 0 else 0.0

    return {
        "mean": mean,
        "median": percentile(0.5),
        "mode": mode,
        "skew": skew,
        "kurtosis": kurt,
        "p5": percentile(0.05),
        "p25": percentile(0.25),
        "p75": percentile(0.75),
        "p95": percentile(0.95),
        "p10": percentile(0.10),
        "p90": percentile(0.90),
        "p99": percentile(0.99),
        "x_max": x_max,
        "hist": bins,
    }


def write_csv(path, rows, header):
    with open(path, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(rows)


def main():
    rng = random.Random(42)
    n = 30000

    sphere_samples = sample_unit_sphere(n, rng)
    iso = avg_product(sphere_samples, anisotropy=(1.0, 1.0, 1.0))
    iso_ci = bootstrap_ci(sphere_samples, anisotropy=(1.0, 1.0, 1.0), trials=200, rng=rng)

    aniso = avg_product(sphere_samples, anisotropy=(1.0, 1.2, 0.8))
    aniso_ci = bootstrap_ci(sphere_samples, anisotropy=(1.0, 1.2, 0.8), trials=200, rng=rng)

    lat_samples = []
    while len(lat_samples) < n:
        x = rng.uniform(-1.0, 1.0)
        y = rng.uniform(-1.0, 1.0)
        z = rng.uniform(-1.0, 1.0)
        r = math.sqrt(x * x + y * y + z * z)
        if r < 1e-9:
            continue
        lat_samples.append((x / r, y / r, z / r))
    lat_iso = avg_product(lat_samples, anisotropy=(1.0, 1.0, 1.0))
    lat_aniso = avg_product(lat_samples, anisotropy=(1.0, 1.2, 0.8))
    lat_iso_ci = bootstrap_ci(lat_samples, anisotropy=(1.0, 1.0, 1.0), trials=200, rng=rng)
    lat_aniso_ci = bootstrap_ci(lat_samples, anisotropy=(1.0, 1.2, 0.8), trials=200, rng=rng)

    print('=== Rotational averaging test (pure Python) ===')
    print(f'Isotropic <|px||py||pz|> on unit sphere: {iso:.6f}')
    print(f'  95% CI: [{iso_ci[0]:.6f}, {iso_ci[1]:.6f}]')
    print(f'Anisotropic <|px||py||pz|> (1,1.2,0.8): {aniso:.6f}')
    print(f'  95% CI: [{aniso_ci[0]:.6f}, {aniso_ci[1]:.6f}]')
    print(f'Lattice-like isotropic average: {lat_iso:.6f}')
    print(f'  95% CI: [{lat_iso_ci[0]:.6f}, {lat_iso_ci[1]:.6f}]')
    print(f'Lattice-like anisotropic average: {lat_aniso:.6f}')
    print(f'  95% CI: [{lat_aniso_ci[0]:.6f}, {lat_aniso_ci[1]:.6f}]')

    radii = [0.25, 0.5, 1.0, 2.0, 4.0]
    a, b = scaling_fit(radii, iso)
    print('\n=== Scaling check (expect exponent ~ 3) ===')
    print(f'log-log fit exponent b: {b:.6f}')
    print(f'log-log fit intercept a: {a:.6f}')

    qprint('\n=== Lattice shell (integer vectors) ===')
    shells = []
    for r in range(2, 101):
        stats = shell_stats(r, anisotropy=(1.0, 1.0, 1.0))
        if stats is None:
            continue
        qprint(f'r={r:>3} -> shell avg {stats["avg_all"]:.6f} (count={stats["count_all"]})')
        shells.append(stats)

    fit = fit_convergence([(s["r"], s["avg_all"]) for s in shells])
    if fit is not None:
        c_inf, A, alpha, rms = fit
        print('\n=== Convergence fit (raw shells): C(r)=C_inf + A/r^alpha ===')
        print(f'C_inf: {c_inf:.6f}')
        print(f'A: {A:.6f}')
        print(f'alpha: {alpha:.6f}')
        print(f'RMS error: {rms:.6e}')

    delta_r = 5
    bins = bin_shells(shells, delta_r=delta_r)
    qprint('\n=== Binned shells (delta_r=5) ===')
    for b in bins:
        qprint(
            f'r=[{b["r_start"]:>3},{b["r_end"]:>3}] -> avg_all {b["avg_all"]:.6f} '
            f'(count={b["count_all"]}) avg_nz {b["avg_nz"]:.6f} (count_nz={b["count_nz"]})'
        )

    fit_bin = fit_convergence([(b["r_mid"], b["avg_all"]) for b in bins])
    if fit_bin is not None:
        c_inf_all, A_all, alpha_all, rms_all = fit_bin
        print('\n=== Convergence fit (binned avg_all): C(r)=C_inf + A/r^alpha ===')
        print(f'C_inf: {c_inf_all:.6f}')
        print(f'A: {A_all:.6f}')
        print(f'alpha: {alpha_all:.6f}')
        print(f'RMS error: {rms_all:.6e}')

    fit_nz = fit_convergence([(b["r_mid"], b["avg_nz"]) for b in bins])
    if fit_nz is not None:
        c_inf_nz, A_nz, alpha_nz, rms_nz = fit_nz
        print('\n=== Convergence fit (binned avg_nz): C(r)=C_inf + A/r^alpha ===')
        print(f'C_inf: {c_inf_nz:.6f}')
        print(f'A: {A_nz:.6f}')
        print(f'alpha: {alpha_nz:.6f}')
        print(f'RMS error: {rms_nz:.6e}')

    f_points = [(b["r_mid"], b["f"]) for b in bins if b["r_mid"] > 1]
    fit_f = fit_log_correction(f_points)
    if fit_f is not None:
        gamma, B, rms = fit_f
        print('\n=== Fit f(r)=1-B/(log r)^gamma ===')
        print(f'gamma: {gamma:.6f}')
        print(f'B: {B:.6f}')
        print(f'RMS error: {rms:.6e}')

    if bins and fit_nz is not None:
        ir_ratio = bins[0]["avg_all"] / iso if iso > 0 else 0.0
        print('\n=== IR Renormalization Factor ===')
        print(f'Bin r=[{bins[0]["r_start"]},{bins[0]["r_end"]}] avg_all / continuum = {ir_ratio:.6f}')

        c_inf_nz, _, _, _ = fit_nz
        c2_ir = bins[0]["avg2_all"]
        k_var = math.sqrt(c2_ir / (c_inf_nz * c_inf_nz)) if c_inf_nz > 0 else 0.0
        print('\n=== IR Variance Correction ===')
        print(f'C2_IR = {c2_ir:.6f}')
        print(f'k_var = sqrt(C2_IR / C_inf^2) = {k_var:.6f}')

        print('\n=== k_var Table (avg_nz) ===')
        print('r_mid, C1_nz, C2_nz, k_var, N_eff, epsilon')
        first_below = None
        for b in bins:
            if b["count_nz"] <= 0:
                continue
            c1 = b["avg_nz"]
            c2 = b["avg2_nz"]
            k = math.sqrt(c2 / (c_inf_nz * c_inf_nz)) if c_inf_nz > 0 else 0.0
            eps = k / math.sqrt(b["count_nz"]) if b["count_nz"] > 0 else 0.0
            print(f'{b["r_mid"]:.1f}, {c1:.6f}, {c2:.6f}, {k:.6f}, {b["count_nz"]}, {eps:.6f}')
            if first_below is None and k <= 1.05:
                first_below = b["r_mid"]
        if first_below is not None:
            print(f'first k_var <= 1.05 at r_mid ~ {first_below:.1f}')
        else:
            print('k_var did not drop below 1.05 in this range')

    # angular PDF stats on S2
    pdf = angular_pdf_stats(sphere_samples, bin_count=100)
    if pdf:
        mean = pdf["mean"]
        mode = pdf["mode"]
        frac_hi = sum(1 for _x in [v for v in [abs(x)*abs(y)*abs(z) for (x,y,z) in sphere_samples] if v > 2 * mean]) / len(sphere_samples)
        frac_lo = sum(1 for _x in [v for v in [abs(x)*abs(y)*abs(z) for (x,y,z) in sphere_samples] if v < 0.1 * mean]) / len(sphere_samples)
        print('\n=== Angular PDF (unit sphere) ===')
        print(f'mean = {mean:.6f}')
        print(f'median = {pdf["median"]:.6f}')
        print(f'mode = {mode:.6f}')
        print(f'mode/mean = {mode / mean:.6f}')
        print(f'skewness = {pdf["skew"]:.6f}')
        print(f'kurtosis = {pdf["kurtosis"]:.6f}')
        print(f'P(X > 2*mean) = {frac_hi:.6f}')
        print(f'P(X < 0.1*mean) = {frac_lo:.6f}')
        print('percentiles:')
        print(f'  p5  = {pdf["p5"]:.6f}')
        print(f'  p25 = {pdf["p25"]:.6f}')
        print(f'  p50 = {pdf["median"]:.6f}')
        print(f'  p75 = {pdf["p75"]:.6f}')
        print(f'  p95 = {pdf["p95"]:.6f}')

    # a0 prediction (Candidate 2) using avg_all IR factor
    c = 299792458.0  # m/s (exact)
    mpc_m = 3.085677581491367e22  # m
    if fit_nz is not None and bins:
        c_inf_nz, _, _, _ = fit_nz
        c_all_ir = bins[0]["avg_all"]
        ratio_all = c_all_ir / c_inf_nz if c_inf_nz > 0 else 0.0
        cube_factor = ratio_all ** (1.0 / 3.0)

        def h0_to_si(h0_km_s_mpc):
            return (h0_km_s_mpc * 1000.0) / mpc_m

        h0_planck = 67.4
        h0_riess = 74.03
        for label, h0 in [("Planck2018", h0_planck), ("Riess2019", h0_riess)]:
            h0_si = h0_to_si(h0)
            a0_cont = (c * h0_si / (2.0 * math.pi))
            a0_pred = a0_cont * cube_factor
            print('\n=== a0 Prediction (Candidate 2, avg_all IR) ===')
            print(f'{label}: H0={h0:.2f} km/s/Mpc')
            print(f'ratio_all = C_all(IR)/C_inf = {ratio_all:.6f}')
            print(f'cube_factor = ratio_all^(1/3) = {cube_factor:.6f}')
            print(f'a0_cont = {a0_cont:.6e} m/s^2')
            print(f'a0_pred = {a0_pred:.6e} m/s^2')

    # CSV outputs
    csv_path = "C:\\Users\\HomePC\\Desktop\\New folder\\msqecc_vault\\triple_cs_rotavg.csv"
    write_csv(
        csv_path,
        [
            ("sphere_iso", iso, iso_ci[0], iso_ci[1]),
            ("sphere_aniso", aniso, aniso_ci[0], aniso_ci[1]),
            ("lattice_iso", lat_iso, lat_iso_ci[0], lat_iso_ci[1]),
            ("lattice_aniso", lat_aniso, lat_aniso_ci[0], lat_aniso_ci[1]),
        ],
        ["label", "mean", "ci_low", "ci_high"],
    )
    shell_csv_path = "C:\\Users\\HomePC\\Desktop\\New folder\\msqecc_vault\\triple_cs_rotavg_shells.csv"
    write_csv(
        shell_csv_path,
        [
            (s["r"], s["count_all"], s["avg_all"], s["count_nz"], s["avg_nz"], s["sum2_all"], s["sum2_nz"])
            for s in shells
        ],
        ["shell_r", "count_all", "avg_all", "count_nz", "avg_nz", "sum2_all", "sum2_nz"],
    )
    bin_csv_path = "C:\\Users\\HomePC\\Desktop\\New folder\\msqecc_vault\\triple_cs_rotavg_bins.csv"
    write_csv(
        bin_csv_path,
        [
            (b["r_start"], b["r_end"], b["r_mid"], b["count_all"], b["avg_all"], b["avg2_all"], b["count_nz"], b["avg_nz"], b["avg2_nz"], b["f"])
            for b in bins
        ],
        ["bin_start", "bin_end", "bin_mid", "count_all", "avg_all", "avg2_all", "count_nz", "avg_nz", "avg2_nz", "f"],
    )
    hist_csv_path = "C:\\Users\\HomePC\\Desktop\\New folder\\msqecc_vault\\triple_cs_rotavg_hist.csv"
    if pdf:
        write_csv(
            hist_csv_path,
            [(i, pdf["hist"][i]) for i in range(len(pdf["hist"]))],
            ["bin_index", "count"],
        )
        print(f'Wrote PDF histogram CSV: {hist_csv_path}')

    print(f'\nWrote CSV: {csv_path}')
    print(f'Wrote CSV: {shell_csv_path}')
    print(f'Wrote CSV: {bin_csv_path}')


if __name__ == '__main__':
    main()
