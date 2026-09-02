#!/usr/bin/env python3
"""Fail the build if a long dash appears anywhere in the repo.

House rule: no em dash, en dash, figure dash or horizontal bar. Not in copy,
headings, alt text, meta descriptions or code comments. Use a full stop, a
comma, or restructure the sentence.

Run from the repo root:

    python3 .claude/skills/mc-website-copy/scripts/check-dashes.py

Exits 0 when clean, 1 when it finds something. Wired to `npm run check:dashes`.
"""

from __future__ import annotations

import os
import re
import sys

# Written as escapes so this file stays clean under its own check.
DASHES = {
    "\u2012": "figure dash",
    "\u2013": "en dash",
    "\u2014": "em dash",
    "\u2015": "horizontal bar",
}

PATTERN = re.compile("[" + "".join(DASHES) + "]")

SKIP_DIRS = {".git", ".next", "node_modules", "out", "dist", "build", ".vercel", ".turbo"}

# AGENTS.md is rewritten by `next dev` on every boot and its text is Vercel's,
# not ours. The house dash rule covers copy and code we control.
SKIP_FILES = {"AGENTS.md", "package-lock.json", "pnpm-lock.yaml", "yarn.lock"}

TEXT_EXTENSIONS = {
    ".css", ".html", ".js", ".json", ".jsx", ".md", ".mdx", ".mjs", ".py",
    ".svg", ".ts", ".tsx", ".txt", ".yaml", ".yml",
}


def scan(root: str) -> list[str]:
    hits: list[str] = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for filename in sorted(filenames):
            if filename in SKIP_FILES:
                continue
            if os.path.splitext(filename)[1].lower() not in TEXT_EXTENSIONS:
                continue
            path = os.path.join(dirpath, filename)
            try:
                with open(path, encoding="utf-8") as handle:
                    lines = handle.read().splitlines()
            except (OSError, UnicodeDecodeError):
                continue
            for number, line in enumerate(lines, start=1):
                for match in PATTERN.finditer(line):
                    name = DASHES[match.group()]
                    rel = os.path.relpath(path, root)
                    hits.append(f"{rel}:{number}:{match.start() + 1}: {name} in: {line.strip()}")
    return hits


def main() -> int:
    root = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
    hits = scan(root)
    if not hits:
        print("check:dashes passed. No em or en dashes found.")
        return 0
    print(f"check:dashes failed. {len(hits)} banned dash(es) found:\n")
    for hit in hits:
        print(f"  {hit}")
    print("\nReplace each one with a full stop, a comma, or a rewritten sentence.")
    print("See .claude/skills/mc-website-copy/references/banned-language.md")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
