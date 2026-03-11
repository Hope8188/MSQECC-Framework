# External Milky Way Model-Grid Test

## Purpose

A true multi-galaxy blind validation set with machine-readable baryonic decompositions is still not assembled in this repository.

The strongest feasible second external cross-check from the available data is therefore:

- independent Milky Way rotation-curve variants from Bhattacharjee et al. (2014),
- independent Milky Way baryonic model variants from McGaugh (2016),
- frozen SPARC-fit MSQECC parameters with no refit on the external data.

This is not a full external population study. It is a stricter one-galaxy stress test.

## Data Used

### Observation Variants

Bhattacharjee et al. (2014) provide three Milky Way rotation-curve variants:

- `R0 = 8.0`, `V0 = 200`
- `R0 = 8.3`, `V0 = 244`
- `R0 = 8.5`, `V0 = 220`

### Baryonic Models

McGaugh (2016) provides six Milky Way baryonic mass models:

- `Q1ZB`
- `Q1MB`
- `Q1BB`
- `Q4ZB`
- `Q4MB`
- `Q4BB`

Together these give `18` external scenarios.

## Method

For each scenario:

- interpolate the McGaugh (2016) disk, bulge, and gas rotation components onto the Bhattacharjee radii,
- treat the Milky Way as a `mid` morphology-bin spiral for the frozen morphology-aware fit,
- evaluate four models with no external refit:
- global MSQECC fit learned on SPARC,
- morphology-bin MSQECC fit learned on SPARC,
- MOND,
- baryons-only.

## Aggregate Results

Across all `18` scenarios:

- mean global MSQECC `R^2 = -2.0555`
- mean morphology-bin MSQECC `R^2 = -1.9134`
- mean MOND `R^2 = -0.2989`
- mean baryons-only `R^2 = -5.6100`

Counts:

- global MSQECC beats baryons-only in `18/18`
- morphology-bin MSQECC beats baryons-only in `18/18`
- global MSQECC beats MOND in `0/18`
- morphology-bin MSQECC beats MOND in `0/18`

## Best Scenario For MSQECC

The best external scenario for the frozen model is:

- observation variant: Bhattacharjee `R0 = 8.3`, `V0 = 244`
- baryonic model: McGaugh `Q4BB`

Scores:

- global MSQECC `R^2 = -0.8201`
- morphology-bin MSQECC `R^2 = -0.7487`
- MOND `R^2 = 0.3499`
- baryons-only is still much worse than both.

## Interpretation

This result is informative in two ways.

First, the MSQECC family is not random noise. It consistently beats baryons-only on every external Milky Way scenario tested.

Second, it still does not transfer well enough. The full external grid remains negative in absolute `R^2`, and MOND remains ahead in every scenario.

So the external evidence now says:

- the SPARC-fit ansatz captures some real structure,
- but it is not yet a robust externally validated alternative to MOND.

## Important Limit

This is still not the multi-galaxy blind test the programme ultimately needs.

It is the strongest feasible cross-check using the machine-readable external data already assembled locally.

## File Produced

The full scenario grid is stored in `output/audit/external_milky_way_model_grid_test.json`.
