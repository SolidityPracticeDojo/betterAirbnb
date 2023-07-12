import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/RoomList.css'; // Import the CSS file

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [editRoom, setEditRoom] = useState(null);
  const [editRoomNumber, setEditRoomNumber] = useState('');
  const [editCapacity, setEditCapacity] = useState('');
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [newRoomNumber, setNewRoomNumber] = useState('');
  const [newCapacity, setNewCapacity] = useState('');
  const [newHotel, setNewHotel] = useState('');
  const [hotelIDs, setHotelIDs] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/rooms/')
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching rooms:', error);
      });

    axios.get('http://127.0.0.1:8000/hotels/')
      .then(response => {
        const ids = response.data.map(hotel => hotel.id);
        setHotelIDs(ids);
      })
      .catch(error => {
        console.error('Error fetching hotel IDs:', error);
      });
  }, []);

  const handleDelete = (roomId) => {
    axios.delete(`http://127.0.0.1:8000/rooms/${roomId}/`)
      .then(response => {
        console.log('Room deleted successfully.');
        setRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
      })
      .catch(error => {
        console.error('Error deleting room:', error);
      });
  };

  const handleEdit = (room) => {
    setEditRoom(room);
    setEditRoomNumber(room.room_number);
    setEditCapacity(room.capacity);
  };

  const handleUpdate = () => {
    const updatedRoom = { ...editRoom, room_number: editRoomNumber, capacity: editCapacity };
    axios.put(`http://127.0.0.1:8000/rooms/${editRoom.id}/update/`, updatedRoom)
      .then(response => {
        console.log('Room updated successfully.');
        setRooms(prevRooms => prevRooms.map(room => (room.id === editRoom.id ? updatedRoom : room)));
        setEditRoom(null);
        setEditRoomNumber('');
        setEditCapacity('');
      })
      .catch(error => {
        console.error('Error updating room:', error);
      });
  };

  const handleCreate = () => {
    const newRoom = {
      room_number: newRoomNumber,
      capacity: newCapacity,
      hotel: newHotel,
    };

    axios.post('http://127.0.0.1:8000/rooms/', newRoom)
      .then(response => {
        console.log('Room created successfully.');
        setRooms(prevRooms => [...prevRooms, response.data]);
        setNewRoomNumber('');
        setNewCapacity('');
        setNewHotel('');
        setShowCreatePopup(false);
      })
      .catch(error => {
        console.error('Error creating room:', error);
      });
  };

  const closePopup = () => {
    setEditRoom(null);
    setEditRoomNumber('');
    setEditCapacity('');
    setShowCreatePopup(false);
  };

  return (
    <div className="room-list">
      <div className="room-list-header">
        <h1>Room List</h1>
        <button className="create-button" onClick={() => setShowCreatePopup(true)}>+</button>
      </div>
      {rooms.map(room => (
        <div key={room.id} className="room-card">
          <div className="room-id">
            <p>{room.id}</p>
          </div>
          <div className="room-details">
            <h3>{room.room_number}</h3>
            <p>Capacity: {room.capacity}</p>
            <p>Hotel: {room.hotel}</p>
          </div>
          <div className="buttons-container">
            <button className="edit-button" onClick={() => handleEdit(room)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(room.id)}>Delete</button>
          </div>
        </div>
      ))}
      {editRoom && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Room</h2>
            <input
              type="text"
              value={editRoomNumber}
              onChange={(e) => setEditRoomNumber(e.target.value)}
            />
            <input
              type="text"
              value={editCapacity}
              onChange={(e) => setEditCapacity(e.target.value)}
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
            <h2>Create New Room</h2>
            <input
              type="text"
              placeholder="Room Number"
              value={newRoomNumber}
              onChange={(e) => setNewRoomNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Capacity"
              value={newCapacity}
              onChange={(e) => setNewCapacity(e.target.value)}
            />
            <select
              value={newHotel}
              onChange={(e) => setNewHotel(e.target.value)}
            >
              <option value="">Select Hotel</option>
              {hotelIDs.map(id => (
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

export default RoomList;

