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
#RUN python manage.py makemigrations
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.7.0/dockerize-linux-amd64-v0.7.0.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.7.0.tar.gz \
    && rm dockerize-linux-amd64-v0.7.0.tar.gz
 

# Run the Django development server
# CMD ["python","manage.py","migrate","&&","python", "manage.py", "runserver", "0.0.0.0:8000", "--settings=betterAirbnb.prod_settings"]
CMD dockerize -wait tcp://db:3306 -timeout 60s && python manage.py makemigrations --settings=betterAirbnb.prod_settings && python manage.py migrate --settings=betterAirbnb.prod_settings && python manage.py runserver 0.0.0.0:8000 --settings=betterAirbnb.prod_settings

