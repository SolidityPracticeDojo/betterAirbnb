from django.db import models

class Hotel(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    # Add other fields specific to the hotel

class Room(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    room_number = models.CharField(max_length=10)
    capacity = models.IntegerField()
    # Add other fields specific to the room

class Customer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    # Add other fields specific to the customer

class Booking(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    check_in_date = models.DateField()
    check_out_date = models.DateField()
    # Add other fields specific to the booking
