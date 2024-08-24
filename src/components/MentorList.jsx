import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const MentorList = () => {
    const [mentors, setMentors] = useState([]);
    const [error, setError] = useState(null);
    const [booking, setBooking] = useState({
        mentor_id: '',
        duration: ''
    });

    useEffect(() => {
        api.get('/mentors')
            .then(response => setMentors(response.data))
            .catch(err => setError(err));
    }, []);

    const handleChange = (e) => {
        setBooking({ ...booking, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/bookings', booking)
            .then(response => {
                alert('Booking successful!');
                setBooking({
                    mentor_id: '',
                    duration: ''
                });
            })
            .catch(err => setError(err));
    };

    const calculateCost = (duration, isPremium) => {
        const baseRate = 50; // Base rate per hour
        const premiumMultiplier = isPremium ? 2 : 1;
        return (baseRate * premiumMultiplier * (duration / 60)).toFixed(2);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const selectedMentor = mentors.find(m => m.id === Number(booking.mentor_id));
    const estimatedCost = selectedMentor 
        ? calculateCost(booking.duration, selectedMentor.is_premium) 
        : '0.00';

    return (
        <div>
            <h2>Mentor List</h2>
            <ul>
                {mentors.map(mentor => (
                    <li key={mentor.id}>
                        {mentor.name} - {mentor.expertise} 
                        {mentor.is_premium ? " (Premium Mentor)" : ""}
                    </li>
                ))}
            </ul>
            <h3>Book a Session</h3>
            <form onSubmit={handleSubmit}>
                <select 
                    name="mentor_id" 
                    value={booking.mentor_id} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">Select Mentor</option>
                    {mentors.map(mentor => (
                        <option key={mentor.id} value={mentor.id}>
                            {mentor.name} ({mentor.is_premium ? "Premium" : "Standard"})
                        </option>
                    ))}
                </select>
                <input 
                    type="number" 
                    name="duration" 
                    value={booking.duration} 
                    onChange={handleChange} 
                    placeholder="Duration (minutes)" 
                    required 
                />
                <button type="submit">Book Session</button>
            </form>

            {booking.mentor_id && booking.duration && (
                <div>
                    <h4>Estimated Cost: 
                        ${estimatedCost}
                    </h4>
                </div>
            )}
        </div>
    );
};

export default MentorList;
