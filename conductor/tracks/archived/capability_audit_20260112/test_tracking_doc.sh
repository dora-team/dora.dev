#!/bin/bash
if [ -s "conductor/tracks/archived/capability_audit_20260112/audit_tracking.md" ]; then
  echo "Tracking document exists and is not empty."
  exit 0
else
  echo "Tracking document is missing or empty."
  exit 1
fi
