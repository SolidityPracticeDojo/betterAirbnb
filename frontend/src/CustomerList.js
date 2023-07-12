import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/CustomerList.css'; // Import the CSS file

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/customers/')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  const handleDelete = (customerId) => {
    axios.delete(`http://127.0.0.1:8000/customers/${customerId}/`)
      .then(response => {
        console.log('Customer deleted successfully.');
        setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== customerId));
      })
      .catch(error => {
        console.error('Error deleting customer:', error);
      });
  };

  const handleEdit = (customer) => {
    setEditCustomer(customer);
    setEditFirstName(customer.first_name);
    setEditLastName(customer.last_name);
    setEditEmail(customer.email);
  };

  const handleUpdate = () => {
    const updatedCustomer = {
      ...editCustomer,
      first_name: editFirstName,
      last_name: editLastName,
      email: editEmail,
    };
    axios.put(`http://127.0.0.1:8000/customers/${editCustomer.id}/update/`, updatedCustomer)
      .then(response => {
        console.log('Customer updated successfully.');
        setCustomers(prevCustomers => prevCustomers.map(customer => (customer.id === editCustomer.id ? updatedCustomer : customer)));
        setEditCustomer(null);
        setEditFirstName('');
        setEditLastName('');
        setEditEmail('');
      })
      .catch(error => {
        console.error('Error updating customer:', error);
      });
  };

  const handleCreate = () => {
    const newCustomer = {
      first_name: newFirstName,
      last_name: newLastName,
      email: newEmail,
    };
    axios.post('http://127.0.0.1:8000/customers/', newCustomer)
      .then(response => {
        console.log('Customer created successfully.');
        setCustomers(prevCustomers => [...prevCustomers, response.data]);
        setNewFirstName('');
        setNewLastName('');
        setNewEmail('');
        setShowCreatePopup(false);
      })
      .catch(error => {
        console.error('Error creating customer:', error);
      });
  };

  const closePopup = () => {
    setEditCustomer(null);
    setEditFirstName('');
    setEditLastName('');
    setEditEmail('');
    setShowCreatePopup(false);
  };

  return (
    <div className="customer-list">
      <div className="customer-list-header">
        <h1>Customer List</h1>
        <button className="create-button" onClick={() => setShowCreatePopup(true)}>+</button>
      </div>
      {customers.map(customer => (
        <div key={customer.id} className="customer-card">
          <div className="customer-details">
            <h3>{customer.first_name} {customer.last_name}</h3>
            <p>Email: {customer.email}</p>
            <p>Customer ID: {customer.id}</p> {/* Display Customer ID */}
          </div>
          <div className="buttons-container">
            <button className="edit-button" onClick={() => handleEdit(customer)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(customer.id)}>Delete</button>
          </div>
        </div>
      ))}
      {editCustomer && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Customer</h2>
            <input
              type="text"
              value={editFirstName}
              onChange={(e) => setEditFirstName(e.target.value)}
            />
            <input
              type="text"
              value={editLastName}
              onChange={(e) => setEditLastName(e.target.value)}
            />
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
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
            <h2>Create New Customer</h2>
            <input
              type="text"
              placeholder="First Name"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
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

export default CustomerList;

