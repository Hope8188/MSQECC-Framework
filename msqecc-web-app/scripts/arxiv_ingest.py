import urllib.request
import feedparser
import json
import os
import datetime

# ----------------------------------------------------
# MSQECC 20/80 ArXiv Ingestor Script
# Analyzes pre-prints for intersections with the paper.
# ----------------------------------------------------

JSON_PATH = os.path.join(os.path.dirname(__file__), '../src/data/research_stream.json')

# Basic keywords checking for MSQECC validation
KEYWORDS = [
    "quantum error correction", "cosmological constant", 
    "macroscopic entanglement", "dark matter", "SPARC", 
    "MOND", "holographic bound", "tensor network"
]

def fetch_recent_papers():
    # Simple query string for astro-ph and gr-qc (recent papers)
    url = "http://export.arxiv.org/api/query?search_query=cat:gr-qc+OR+cat:astro-ph.GA+OR+cat:quant-ph&sortBy=submittedDate&sortOrder=descending&max_results=50"
    
    response = urllib.request.urlopen(url)
    feed = feedparser.parse(response)
    
    matched_papers = []
    
    for entry in feed.entries:
        summary_text = entry.summary.lower()
        title_text = entry.title.lower()
        
        # 20/80 Logic: Does it mention our fundamental keywords?
        if any(kw in summary_text or kw in title_text for kw in KEYWORDS):
            # Evaluate relevance based on string matching (In production, replace with LLM payload)
            relevance = "Potentially convergent with MSQECC topological structures."
            if "error correction" in summary_text:
                relevance = "Strong topological symmetry match. Validates boundary logic."
            elif "dark matter" in summary_text or "sparc" in summary_text:
                relevance = "Empirical observable candidate. Check against k ≈ 9.575 distribution."
            
            paper = {
                "id": entry.id.split('/abs/')[-1],
                "date": datetime.datetime.strptime(entry.published, '%Y-%m-%dT%H:%M:%SZ').strftime('%Y-%m-%d'),
                "title": entry.title.replace('\n', ' '),
                "authors": ", ".join(author.name for author in entry.authors[:3]) + (" et al." if len(entry.authors) > 3 else ""),
                "summary": entry.summary.replace('\n', ' ')[:250] + "...",
                "relevance": relevance,
                "url": entry.link,
                "category": entry.tags[0]['term'] if entry.tags else "Physics"
            }
            matched_papers.append(paper)
    
    return matched_papers

def main():
    print("[MSQECC] Booting ArXiv Ingestor...")
    new_papers = fetch_recent_papers()
    
    if not new_papers:
        print("[MSQECC] No new relevant papers found today.")
        return

    # Load existing datastream
    if os.path.exists(JSON_PATH):
        with open(JSON_PATH, 'r', encoding='utf-8') as f:
            existing_data = json.load(f)
    else:
        existing_data = []

    # Filter out duplicates
    existing_ids = {p['id'] for p in existing_data}
    unique_new = [p for p in new_papers if p['id'] not in existing_ids]

    if unique_new:
        # Prepend new research to the stream
        updated_data = unique_new + existing_data
        
        # Serialize back to JSON for the Web UI to ingest
        os.makedirs(os.path.dirname(JSON_PATH), exist_ok=True)
        with open(JSON_PATH, 'w', encoding='utf-8') as f:
            json.dump(updated_data, f, indent=2)
            
        print(f"[MSQECC] Successfully injected {len(unique_new)} new papers into the quantum stream.")
    else:
        print("[MSQECC] Database up to date. No unique additions.")

if __name__ == "__main__":
    main()
