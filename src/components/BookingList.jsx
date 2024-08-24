import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);
    const [newBooking, setNewBooking] = useState({
        student_id: '',
        mentor_id: '',
        duration: '',
    });

    useEffect(() => {
        // Fetch bookings
        api.get('/bookings')
            .then(response => setBookings(response.data))
            .catch(err => setError(err));

        // Fetch mentors
        api.get('/mentors')
            .then(response => setMentors(response.data))
            .catch(err => setError(err));

        // Fetch students
        api.get('/students')
            .then(response => setStudents(response.data))
            .catch(err => setError(err));
    }, []);

    const handleChange = (e) => {
        setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/bookings', newBooking)
            .then(response => {
                setBookings([...bookings, response.data]);
                setNewBooking({
                    student_id: '',
                    mentor_id: '',
                    duration: ''
                });
            })
            .catch(err => setError(err));
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Booking List</h2>
            <ul>
                {bookings.map(booking => (
                    <li key={booking.id}>
                        Mentor: {booking.mentor_name} - Duration: {booking.duration} minutes - Booking Date: {new Date(booking.bookingDate).toLocaleString()}
                    </li>
                ))}
            </ul>
            <h3>Add New Booking</h3>
            <form onSubmit={handleSubmit}>
                <select name="student_id" value={newBooking.student_id} onChange={handleChange} required>
                    <option value="">Select Student</option>
                    {students.map(student => (
                        <option key={student.id} value={student.id}>{student.name}</option>
                    ))}
                </select>
                <select name="mentor_id" value={newBooking.mentor_id} onChange={handleChange} required>
                    <option value="">Select Mentor</option>
                    {mentors.map(mentor => (
                        <option key={mentor.id} value={mentor.id}>{mentor.name} (Premium: {mentor.is_premium ? 'Yes' : 'No'})</option>
                    ))}
                </select>
                <input type="number" name="duration" value={newBooking.duration} onChange={handleChange} placeholder="Duration (minutes)" required />
                <button type="submit">Add Booking</button>
            </form>
        </div>
    );
};

export default BookingList;
