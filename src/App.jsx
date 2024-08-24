import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MentorList from './components/MentorList';
import StudentList from './components/StudentList';
import BookingList from './components/BookingList';
import PaymentConfirmation from './components/PaymentConfirmation'; // Import the new component
import './styles/App.css';

function App() {
    return (
        <div className="App">
            <h1>CareerCarve Dashboard</h1>
            <Routes>
                <Route path="/" element={<MentorList />} />
                <Route path="/students" element={<StudentList />} />
                <Route path="/bookings" element={<BookingList />} />
                <Route path="/payment" element={<PaymentConfirmation />} /> {/* New route for payment confirmation */}
            </Routes>
        </div>
    );
}

export default App;


