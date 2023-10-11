FROM python:3.9-alpine

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

EXPOSE 8000

ENV FLASK_APP=src/main.py

CMD ["python", "src/main.py"]
