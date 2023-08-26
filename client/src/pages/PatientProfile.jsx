import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientProfile = () => {
    const [patientID, setPatientID] = useState('');
    const [patient, setPatient] = useState(null);

    const fetchPatientData = () => {
        if (patientID.trim() === '') {
            return;
        }

        axios.get(`http://localhost:8000/api/patients/${patientID}`)
            .then(response => {
                setPatient(response.data);
            })
            .catch(error => {
                console.error('Error fetching patient data:', error);
            });
    };

    useEffect(() => {
        fetchPatientData();
    }, [patientID]);

    return (
        <div className="Profile">
            <h2>Patient Profile</h2>
            <div className="profile-input">
                <label htmlFor="patientIDInput">Enter Patient ID: </label>
                <input
                    id="patientIDInput"
                    type="text"
                    value={patientID}
                    onChange={event => setPatientID(event.target.value)}
                />
                <button onClick={fetchPatientData}>Fetch Profile</button>
            </div>
            {patient ? (
                <>
                    <h2>{patient.firstName} {patient.lastName}'s Profile</h2>
                    <div className="profile-details">
                        <p>Email: {patient.email}</p>
                        <p>Doctors: {patient.doctors.map(doctor => doctor.name).join(', ')}</p>
                    </div>
                    <h3>Posts</h3>
                    <ul className="post-list">
                        {patient.posts.map((post, index) => (
                            <li key={index}>
                                {post && (
                                    <div>
                                        {post.text ? (
                                            <>
                                                <p>Text: {post.text}</p>
                                                <p>Mood: {post.mood}</p>
                                                {post.timestamp && <p>Timestamp: {post.timestamp}</p>}
                                            </>
                                        ) : (
                                            <p>No text available</p>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    <h3>Doctor's Notes</h3>
                    <ul className="note-list">
                        {patient.doctorsNotes.map((note, index) => (
                            <li key={index}>{note.text}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>No patient data available</p>
            )}
        </div>
    );
};

export default PatientProfile;
