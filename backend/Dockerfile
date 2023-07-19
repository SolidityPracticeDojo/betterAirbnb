# Use an official Python runtime as the base image
FROM python:3.10

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY /backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project files to the container
COPY ./backend/ .

# Copy the frontend static files to the container
COPY ./frontend/build/ /app/frontend/build/

# Expose the default Django development server port
EXPOSE 8000

# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000", "--settings=betterAirbnb.prod_settings"]
