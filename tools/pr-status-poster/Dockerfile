FROM python:3.8-slim

RUN pip install pygithub google-cloud-secret-manager click

COPY set-check-status.py /app/

ENTRYPOINT ["python", "/app/set-check-status.py"]