#!/bin/bash
if [ -s "conductor/tracks/archived/capability_audit_20260112/audit_samples.md" ]; then
  echo "Audit report exists and is not empty."
  exit 0
else
  echo "Audit report is missing or empty."
  exit 1
fi
