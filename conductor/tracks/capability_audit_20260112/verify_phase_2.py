import os
import re
import sys

capabilities_dir = "hugo/content/capabilities"
content_root = "hugo/content"
static_root = "hugo/static"
audit_tracking = "conductor/tracks/capability_audit_20260112/audit_tracking.md"

errors = []

# --- 1. Front Matter Check ---
def parse_front_matter(filepath):
    metadata = {}
    with open(filepath, 'r') as f:
        lines = f.readlines()
    if not lines or lines[0].strip() != "---":
        return metadata
    for line in lines[1:]:
        if line.strip() == "---":
            break
        if ":" in line:
            key, value = line.split(":", 1)
            metadata[key.strip()] = value.strip()
    return metadata

def check_front_matter(filepath, dirname):
    local_errors = []
    try:
        metadata = parse_front_matter(filepath)
        for key, value in metadata.items():
            if "TODO" in value:
                local_errors.append(f"Front Matter: 'TODO' found in '{key}'")
        if 'slug' in metadata:
            slug_val = metadata['slug'].strip('"').strip("'")
            # Exception for cloud-infrastructure which has slug flexible-infrastructure
            if dirname == "cloud-infrastructure" and slug_val == "flexible-infrastructure":
                pass
            elif slug_val != dirname:
                 local_errors.append(f"Front Matter: slug '{slug_val}' != dir '{dirname}'")
    except Exception as e:
        local_errors.append(f"Front Matter: Parse Error - {e}")
    return local_errors

# --- 2. Heading Check ---
def check_headings(filepath):
    local_errors = []
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    in_front_matter = False
    front_matter_count = 0
    last_level = 0
    
    for i, line in enumerate(lines):
        line = line.strip()
        if line == "---":
            front_matter_count += 1
            if front_matter_count == 2:
                in_front_matter = False
                continue
            in_front_matter = True
            continue
        if in_front_matter: continue
            
        if line.startswith("#"):
            level = 0
            for char in line:
                if char == '#': level += 1
                else: break
            
            effective_last = last_level if last_level > 0 else 1
            if level > effective_last + 1:
                local_errors.append(f"Headings: Line {i+1}: Jumped from H{effective_last} to H{level}")
            last_level = level
    return local_errors

# --- 3. Link Check ---
link_pattern = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')
def check_links(filepath):
    local_errors = []
    with open(filepath, 'r') as f:
        content = f.read()
    
    for match in link_pattern.finditer(content):
        text = match.group(1)
        url = match.group(2)
        clean_url = url.split('#')[0]
        if clean_url.startswith("http") or clean_url.startswith("mailto:"): continue
            
        if clean_url.startswith("/"):
            normalized_path = clean_url.lstrip('/').rstrip('/')
            path_variants = [
                os.path.join(content_root, normalized_path, "index.md"),
                os.path.join(content_root, normalized_path + ".md"),
                os.path.join(content_root, normalized_path),
                os.path.join(static_root, normalized_path)
            ]
            found = False
            for p in path_variants:
                if os.path.exists(p):
                    found = True; break
            if not found:
                dir_path = os.path.join(content_root, normalized_path)
                if os.path.isdir(dir_path) and os.path.exists(os.path.join(dir_path, "_index.md")):
                    found = True
            if not found:
                local_errors.append(f"Links: Broken link [{text}]({url})")
    return local_errors

# --- Execution ---
for root, dirs, files in os.walk(capabilities_dir):
    for file in files:
        if file == "index.md":
            filepath = os.path.join(root, file)
            dirname = os.path.basename(root)
            
            # Run Checks
            fm_errs = check_front_matter(filepath, dirname)
            hd_errs = check_headings(filepath)
            lnk_errs = check_links(filepath)
            
            if fm_errs or hd_errs or lnk_errs:
                errors.append(f"{filepath}:")
                for e in fm_errs + hd_errs + lnk_errs:
                    errors.append(f"  - {e}")

if errors:
    print("Phase 2 Verification FAILED:")
    for error in errors:
        print(error)
    sys.exit(1)

print("Phase 2 Verification PASSED.")
sys.exit(0)