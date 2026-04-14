FROM python:3.9-slim
WORKDIR /app
# Install dependencies for PostgreSQL and build tools for any Python packages that need compilation
RUN apt-get update && apt-get install -y libpq-dev gcc
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]