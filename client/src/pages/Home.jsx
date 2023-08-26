import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [selectedMood, setSelectedMood] = useState(1);
    const [patientID, setPatientID] = useState(''); // Added state for patient ID input

    const handleAddPost = async () => {
        if (newPost.trim() !== '') {
            try {
                const response = await axios.post(`http://localhost:8000/api/patients/addPost/${patientID}`, {
                    text: newPost,
                    mood: selectedMood,
                });

                if (response.data.msg) {
                    setPosts([...posts, newPost]);
                    setNewPost('');
                }
            } catch (error) {
                console.error('Error adding post:', error);
            }
        }
    };

    const handleDeletePost = (index) => {
        const updatedPosts = [...posts];
        updatedPosts.splice(index, 1);
        setPosts(updatedPosts);
    };

    const handleMoodChange = (event) => {
        setSelectedMood(parseInt(event.target.value));
    };

    return (
        <div className="Home">
            <h1>Welcome to Mirror!</h1>
            <h2>Go to profile to access previous posts and info!</h2>

            <p>Enter the patient ID and your newest post here</p>

            <div>
                <input
                    type="text"
                    value={patientID}
                    onChange={(e) => setPatientID(e.target.value)} // Handle patient ID input
                    placeholder="Enter patient ID"
                />
                <input
                    type="text"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Enter your post"
                />
                <select value={selectedMood} onChange={handleMoodChange}>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((mood) => (
                        <option key={mood} value={mood}>
                            Mood {mood}
                        </option>
                    ))}
                </select>
                <button onClick={handleAddPost}>Add Post</button>
            </div>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>
                        {post}
                        <button onClick={() => handleDeletePost(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
