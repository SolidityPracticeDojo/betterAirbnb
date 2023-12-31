from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics
from .models import Hotel, Room, Customer, Booking
from .serializers import HotelSerializer, RoomSerializer, CustomerSerializer, BookingSerializer

class HotelListCreateAPIView(generics.ListCreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

class HotelRetrieveDestroyAPIView(generics.RetrieveDestroyAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

class HotelUpdateAPIView(generics.UpdateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class RoomListCreateAPIView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class RoomRetrieveDestroyAPIView(generics.RetrieveDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class RoomUpdateAPIView(generics.UpdateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class CustomerListCreateAPIView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerRetrieveDestroyAPIView(generics.RetrieveDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerUpdateAPIView(generics.UpdateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class BookingListCreateAPIView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class BookingRetrieveDestroyAPIView(generics.RetrieveDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class BookingUpdateAPIView(generics.UpdateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)



from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.decorators import permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication

class HelloWorld(APIView):
    authentication_classes = []
    def get(self, request):
        return Response({'message': 'Hello, World!'})

class SecretHello(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    #permission_classes = [AllowAny]

    def get(self, request):
        return Response({'message': 'Hello Authenticated User!'})

