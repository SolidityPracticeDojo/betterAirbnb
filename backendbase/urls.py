from django.urls import path
from .views import (
    HotelListCreateAPIView, 
    HotelRetrieveDestroyAPIView, 
    HotelUpdateAPIView,
    RoomListCreateAPIView,
    RoomRetrieveDestroyAPIView,
    RoomUpdateAPIView,
    CustomerListCreateAPIView,
    CustomerRetrieveDestroyAPIView,
    CustomerUpdateAPIView,
    BookingListCreateAPIView,
    BookingRetrieveDestroyAPIView,
    BookingUpdateAPIView,
)

urlpatterns = [
    path('hotels/', HotelListCreateAPIView.as_view(), name='hotel-list-create'),
    path('hotels/<int:pk>/', HotelRetrieveDestroyAPIView.as_view(), name='hotel-retrieve-destroy'),
    path('hotels/<int:pk>/update/', HotelUpdateAPIView.as_view(), name='hotel-update'),
    path('rooms/', RoomListCreateAPIView.as_view(), name='room-list-create'),
    path('rooms/<int:pk>/', RoomRetrieveDestroyAPIView.as_view(), name='room-retrieve-destroy'),
    path('rooms/<int:pk>/update/', RoomUpdateAPIView.as_view(), name='room-update'),
    path('customers/', CustomerListCreateAPIView.as_view(), name='customer-list-create'),
    path('customers/<int:pk>/', CustomerRetrieveDestroyAPIView.as_view(), name='customer-retrieve-destroy'),
    path('customers/<int:pk>/update/', CustomerUpdateAPIView.as_view(), name='customer-update'),
    path('bookings/', BookingListCreateAPIView.as_view(), name='booking-list-create'),
    path('bookings/<int:pk>/', BookingRetrieveDestroyAPIView.as_view(), name='booking-retrieve-destroy'),
    path('bookings/<int:pk>/update/', BookingUpdateAPIView.as_view(), name='booking-update'),
]

