import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorProfile = () => {
  const [doctorID, setDoctorID] = useState('');
  const [doctor, setDoctor] = useState(null);

  const fetchDoctorData = () => {
    if (doctorID.trim() === '') {
      return;
    }

    axios.get(`http://localhost:8000/api/doctors/${doctorID}`)
      .then(response => {
        setDoctor(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctor data:', error);
      });
  };

  useEffect(() => {
    fetchDoctorData();
  }, [doctorID]);

  return (
    <div className="DoctorProfile">
      <h2>Doctor Profile</h2>
      <div className="profile-input">
        <label htmlFor="doctorIDInput">Enter Doctor ID: </label>
        <input
          id="doctorIDInput"
          type="text"
          value={doctorID}
          onChange={event => setDoctorID(event.target.value)}
        />
        <button onClick={fetchDoctorData}>Fetch Profile</button>
      </div>
      {doctor ? (
        <>
          <h2>{doctor.firstName} {doctor.lastName}'s Profile</h2>
          <div className="profile-details">
            <p>Email: {doctor.email}</p>
            <p>Patients: {doctor.patients.map(patient => patient.name).join(', ')}</p>
          </div>
        </>
      ) : (
        <p>No doctor data available</p>
      )}
    </div>
  );
};

export default DoctorProfile;
