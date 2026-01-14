import sys

filepath = "conductor/tracks/archived/capability_audit_20260112/audit_tracking.md"
errors = []

with open(filepath, 'r') as f:
    content = f.read()

 sections = content.split("### ")[1:]

 for section in sections:
     name = section.split("\n")[0].strip()
     if "- [ ]" in section:
         errors.append(name)

 if errors:
     print(f"FAILED: Pending items for {', '.join(errors)}")
     sys.exit(1)
 else:
     print("Cohesion Check PASSED.")
     sys.exit(0)
