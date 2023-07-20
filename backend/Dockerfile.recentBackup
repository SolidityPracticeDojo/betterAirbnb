# Use an official Python runtime as the base image
FROM python:3.10-alpine3.17

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk add --no-cache mariadb-dev build-base pkgconfig

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY /backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project files to the container
COPY ./backend/ .

# Copy the frontend static files to the container
COPY ./frontend/build/ /app/frontend/build/

# Copy the dockerize binary into the container
COPY ./backend/utils/dockerize/dockerize /usr/local/bin/dockerize

# Make the dockerize binary executable
RUN chmod +x /usr/local/bin/dockerize

# Expose the default Django development server port
EXPOSE 8000

# Run the Django development server
CMD dockerize -wait tcp://db:3306 -timeout 60s && python manage.py makemigrations --settings=betterAirbnb.prod_settings && python manage.py migrate --settings=betterAirbnb.prod_settings && python manage.py runserver 0.0.0.0:8000 --settings=betterAirbnb.prod_settings

