import json
import re
from pathlib import Path

IN = Path(__file__).with_name("donboscodreams.json")
OUT = Path(__file__).with_name("donboscodreams.with_summaries.json")
bak = Path(__file__).with_name("donboscodreams.backup.json")

def strip_html(s: str) -> str:
    s = re.sub(r"<[^>]+>", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s

def first_sentence(text: str, max_len: int = 240) -> str:
    if not text:
        return ""
    # split on terminal punctuation (keep the punctuation)
    parts = re.split(r'(?<=[\.!\?])\s+', text)
    candidate = parts[0].strip() if parts else text.strip()
    if len(candidate) > max_len:
        candidate = candidate[:max_len].rstrip() + "..."
    return candidate

data = json.loads(IN.read_text(encoding="utf-8"))

# backup original
bak.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

for item in data:
    # skip non-dict items
    if not isinstance(item, dict):
        continue

    # prefer content, then explanation, then title
    source = None
    for k in ("content", "explanation", "title"):
        v = item.get(k)
        if isinstance(v, str) and v.strip():
            source = v
            break

    if not source:
        # leave empty summary for items with no usable text
        item["summary"] = ""
        continue

    text = strip_html(source)
    summary = first_sentence(text)
    # ensure summary is short and descriptive; if too short try to extend to two sentences
    if len(summary) < 40 and len(text) > len(summary):
        # take up to two sentences
        parts = re.split(r'(?<=[\.!\?])\s+', text)
        summary = " ".join(parts[:2]) if len(parts) >= 2 else parts[0]
        if len(summary) > 240:
            summary = summary[:240].rstrip() + "..."
    item["summary"] = summary

OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Wrote {len(data)} items with summaries to {OUT} (backup saved to {bak})")