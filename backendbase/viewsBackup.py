from django.shortcuts import render
from rest_framework.response import Response

from rest_framework import generics
from .models import Hotel
from .serializers import HotelSerializer

class HotelListCreateAPIView(generics.ListCreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

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

