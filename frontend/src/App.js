import React from 'react';
import HotelList from './HotelList';
import RoomList from './RoomList';
import CustomerList from './CustomerList';
import BookingList from './BookingList'; // Import the BookingList component
import logo from './logo.svg';
import './CSS/HotelList.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Dojo <code>src/App.js</code> Reservation Hotel
          <pre>
            (୧⌐■˽■)୨ 🗝️ლ(˘⌣˘)ლ
          </pre>
        </p>
      </header>
      <div className="container">
        <div className="hotel-list-container">
          <HotelList />
        </div>
        <div className="room-list-container">
          <RoomList />
        </div>
        <div className="customer-list-container">
          <CustomerList />
        </div>
        <div className="booking-list-container"> {/* Add a container for BookingList */}
          <BookingList />
        </div>
      </div>
    </div>
  );
}

export default App;

