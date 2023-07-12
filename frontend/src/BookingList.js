import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/BookingList.css'; // Import the CSS file

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [editBooking, setEditBooking] = useState(null);
  const [editCheckInDate, setEditCheckInDate] = useState('');
  const [editCheckOutDate, setEditCheckOutDate] = useState('');
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [newCheckInDate, setNewCheckInDate] = useState('');
  const [newCheckOutDate, setNewCheckOutDate] = useState('');
  const [newRoom, setNewRoom] = useState('');
  const [newCustomer, setNewCustomer] = useState('');
  const [roomIDs, setRoomIDs] = useState([]);
  const [customerIDs, setCustomerIDs] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/bookings/')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });

    axios.get('http://127.0.0.1:8000/rooms/')
      .then(response => {
        const ids = response.data.map(room => room.id);
        setRoomIDs(ids);
      })
      .catch(error => {
        console.error('Error fetching room IDs:', error);
      });

    axios.get('http://127.0.0.1:8000/customers/')
      .then(response => {
        const ids = response.data.map(customer => customer.id);
        setCustomerIDs(ids);
      })
      .catch(error => {
        console.error('Error fetching customer IDs:', error);
      });
  }, []);

  const handleDelete = (bookingId) => {
    axios.delete(`http://127.0.0.1:8000/bookings/${bookingId}/`)
      .then(response => {
        console.log('Booking deleted successfully.');
        setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
      })
      .catch(error => {
        console.error('Error deleting booking:', error);
      });
  };

  const handleEdit = (booking) => {
    setEditBooking(booking);
    setEditCheckInDate(booking.check_in_date);
    setEditCheckOutDate(booking.check_out_date);
  };

  const handleUpdate = () => {
    const updatedBooking = { ...editBooking, check_in_date: editCheckInDate, check_out_date: editCheckOutDate };
    axios.put(`http://127.0.0.1:8000/bookings/${editBooking.id}/update/`, updatedBooking)
      .then(response => {
        console.log('Booking updated successfully.');
        setBookings(prevBookings => prevBookings.map(booking => (booking.id === editBooking.id ? updatedBooking : booking)));
        setEditBooking(null);
        setEditCheckInDate('');
        setEditCheckOutDate('');
      })
      .catch(error => {
        console.error('Error updating booking:', error);
      });
  };

  const handleCreate = () => {
    const newBooking = {
      check_in_date: newCheckInDate,
      check_out_date: newCheckOutDate,
      room: newRoom,
      customer: newCustomer,
    };

    axios.post('http://127.0.0.1:8000/bookings/', newBooking)
      .then(response => {
        console.log('Booking created successfully.');
        setBookings(prevBookings => [...prevBookings, response.data]);
        setNewCheckInDate('');
        setNewCheckOutDate('');
        setNewRoom('');
        setNewCustomer('');
        setShowCreatePopup(false);
      })
      .catch(error => {
        console.error('Error creating booking:', error);
      });
  };

  const closePopup = () => {
    setEditBooking(null);
    setEditCheckInDate('');
    setEditCheckOutDate('');
    setShowCreatePopup(false);
  };

  const renderDateOptions = () => {
    const today = new Date();
    const dateOptions = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const formattedDate = formatDate(date);
      dateOptions.push(
        <option key={formattedDate} value={formattedDate}>
          {formattedDate}
        </option>
      );
    }

    return dateOptions;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="booking-list">
      <div className="booking-list-header">
        <h1>Booking List</h1>
        <button className="create-button" onClick={() => setShowCreatePopup(true)}>+</button>
      </div>
      {bookings.map(booking => (
        <div key={booking.id} className="booking-card">
          <div className="booking-details">
            <p>Check-in: {booking.check_in_date}</p>
            <p>Check-out: {booking.check_out_date}</p>
            <p>Room: {booking.room}</p>
            <p>Customer: {booking.customer}</p>
          </div>
          <div className="buttons-container">
            <button className="edit-button" onClick={() => handleEdit(booking)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(booking.id)}>Delete</button>
          </div>
        </div>
      ))}
      {editBooking && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Booking</h2>
            <select
              value={editCheckInDate}
              onChange={(e) => setEditCheckInDate(e.target.value)}
            >
              {renderDateOptions()}
            </select>
            <select
              value={editCheckOutDate}
              onChange={(e) => setEditCheckOutDate(e.target.value)}
            >
              {renderDateOptions()}
            </select>
            <div className="buttons-container">
              <button className="update-button" onClick={handleUpdate}>Update</button>
              <button className="cancel-button" onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showCreatePopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Create New Booking</h2>
            <select
              value={newCheckInDate}
              onChange={(e) => setNewCheckInDate(e.target.value)}
            >
              {renderDateOptions()}
            </select>
            <select
              value={newCheckOutDate}
              onChange={(e) => setNewCheckOutDate(e.target.value)}
            >
              {renderDateOptions()}
            </select>
            <select
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
            >
              <option value="">Select Room</option>
              {roomIDs.map(id => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
            <select
              value={newCustomer}
              onChange={(e) => setNewCustomer(e.target.value)}
            >
              <option value="">Select Customer</option>
              {customerIDs.map(id => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
            <div className="buttons-container">
              <button className="create-button" onClick={handleCreate}>Create</button>
              <button className="cancel-button" onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingList;

