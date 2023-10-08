# Use an official Python runtime as a parent image
FROM python:3.10

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Expose port 5000
EXPOSE 5000

# Define environment variable for Flask
ENV FLASK_APP=src/main.py

# Run flask when the container launches
CMD ["flask", "run", "--host=0.0.0.0"]
