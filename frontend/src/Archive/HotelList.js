import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/HotelList.css'; // Import the CSS file

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [editHotel, setEditHotel] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [newHotelName, setNewHotelName] = useState('');
  const [newHotelAddress, setNewHotelAddress] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/hotels/')
      .then(response => {
        setHotels(response.data);
      })
      .catch(error => {
        console.error('Error fetching hotels:', error);
      });
  }, []);

  const handleDelete = (hotelId) => {
    axios.delete(`http://127.0.0.1:8000/hotels/${hotelId}/`)
      .then(response => {
        console.log('Hotel deleted successfully.');
        // Update the hotels state to remove the deleted hotel
        setHotels(prevHotels => prevHotels.filter(hotel => hotel.id !== hotelId));
      })
      .catch(error => {
        console.error('Error deleting hotel:', error);
      });
  };

  const handleEdit = (hotel) => {
    setEditHotel(hotel);
    setEditName(hotel.name);
    setEditAddress(hotel.address);
  };

  const handleUpdate = () => {
    const updatedHotel = { ...editHotel, name: editName, address: editAddress };
    axios.put(`http://127.0.0.1:8000/hotels/${editHotel.id}/update/`, updatedHotel)
      .then(response => {
        console.log('Hotel updated successfully.');
        // Update the hotels state with the updated hotel details
        setHotels(prevHotels => prevHotels.map(hotel => (hotel.id === editHotel.id ? updatedHotel : hotel)));
        // Reset the edit state
        setEditHotel(null);
        setEditName('');
        setEditAddress('');
      })
      .catch(error => {
        console.error('Error updating hotel:', error);
      });
  };

  const handleCreate = () => {
    const newHotel = {
      name: newHotelName,
      address: newHotelAddress,
    };

    axios.post('http://127.0.0.1:8000/hotels/', newHotel)
      .then(response => {
        console.log('Hotel created successfully.');
        // Add the new hotel to the existing list of hotels
        setHotels(prevHotels => [...prevHotels, response.data]);
        // Reset the new hotel form fields
        setNewHotelName('');
        setNewHotelAddress('');
        // Close the create popup
        setShowCreatePopup(false);
      })
      .catch(error => {
        console.error('Error creating hotel:', error);
      });
  };

  const closePopup = () => {
    setEditHotel(null);
    setEditName('');
    setEditAddress('');
    setShowCreatePopup(false);
  };

  return (
    <div className="hotel-list">
      <div className="hotel-list-header">
        <h1>Hotel List</h1>
        <button className="create-button" onClick={() => setShowCreatePopup(true)}>+</button>
      </div>
      {hotels.map(hotel => (
        <div key={hotel.id} className="hotel-card">
          <div className="hotel-details">
            <h3>{hotel.name}</h3>
            <p>{hotel.address}</p>
          </div>
          <div className="buttons-container">
            <button className="edit-button" onClick={() => handleEdit(hotel)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(hotel.id)}>Delete</button>
          </div>
        </div>
      ))}
      {editHotel && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Hotel</h2>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <input
              type="text"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
            />
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
            <h2>Create New Hotel</h2>
            <input
              type="text"
              placeholder="Hotel Name"
              value={newHotelName}
              onChange={(e) => setNewHotelName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Hotel Address"
              value={newHotelAddress}
              onChange={(e) => setNewHotelAddress(e.target.value)}
            />
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

export default HotelList;
