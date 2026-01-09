import json
from pathlib import Path

IN = Path(__file__).with_name("donboscodreams.json")
OUT = Path(__file__).with_name("titles.txt")

data = json.loads(IN.read_text(encoding="utf-8"))

pairs = []
for item in data:
    num = item.get("number") or 0
    title = "<a href=\"" + ("https://donboscosdreams.francescogabbrielli.it/dream/" + item.get("id")) + "\">" + item.get("title") + "</a>"
    pairs.append((num, title.strip()))

pairs.sort(key=lambda x: x[0])
width = max((len(str(n)) for n, _ in pairs), default=0)

with OUT.open("w", encoding="utf-8") as f:
    for n, t in pairs:
        f.write(f"{t}\n")

print(f"Wrote {len(pairs)} lines to {OUT}")