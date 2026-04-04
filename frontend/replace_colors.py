import os
import glob
import re

frontend_dir = r"d:\WEB Dev\Saree Shop\Final Project\frontend"

replacements = {
    r"#780000": "var(--gold)",
    r"#C1121F": "var(--gold-light)",
    r"#003049": "var(--ink)",
    r"#669BBC": "var(--warm)",
    r"#FCF5E8": "var(--cream)",
    r"#F8E9D5": "var(--cream)",
    r"font-serif": "font-display",
    r"font-sans\b": "font-sans-custom",
    r"bg-gray-50": ""   # remove or change
}

# The easiest way to replace in JS/TS without breaking CSS variables inside quotes 
# is to actually replace the literal hex strings with the new hex strings, since 
# tailwind classes like `bg-[#780000]` will become `bg-[#C9A84C]`, and `color: '#780000'` will become `color: '#C9A84C'`.

hex_replacements = {
    "#780000": "#C9A84C",
    "#C1121F": "#E8C97A",
    "#003049": "#0D0B0A",
    "#669BBC": "#C9A84C",
    "#FCF5E8": "#F5F0E8",
    "#F8E9D5": "#F5F0E8",
    "font-serif": "font-display",
    "font-sans ": "font-sans-custom ",
    "font-sans\"": "font-sans-custom\"",
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    for old, new in hex_replacements.items():
        new_content = new_content.replace(old, new)
        # Also handle lowercase hex
        new_content = new_content.replace(old.lower(), new)

    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(frontend_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css')):
            if "GlobalStyles.tsx" in file or "Footer.tsx" in file or "Home.tsx" in file:
                continue # Skip files already updated manually or that manage variables
            filepath = os.path.join(root, file)
            process_file(filepath)

print("Done!")
