FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt ./

RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/* \
    && pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

COPY main.py random_forest_model.joblib xgb_model.json ./

VOLUME ["/app/data"]
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
