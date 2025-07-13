import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function CustomerDetails() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/quote', { state: form });
  };

  return (
    <>
      <h2>Customer Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cust-name">Name</label>
          <input type="text" name="name" id="cust-name" required value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="cust-email">Email</label>
          <input type="email" name="email" id="cust-email" required value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="cust-phone">Phone</label>
          <input type="tel" name="phone" id="cust-phone" required value={form.phone} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="cust-address">Address</label>
          <input type="text" name="address" id="cust-address" required value={form.address} onChange={handleChange} />
        </div>
        <button type="submit">Next</button>
      </form>
    </>
  );
}

export default CustomerDetails;
