import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);
    const [newStudent, setNewStudent] = useState({
        name: '',
        availability: '',
        area_of_interest: ''
    });

    useEffect(() => {
        api.get('/students')
            .then(response => setStudents(response.data))
            .catch(err => setError(err));
    }, []);

    const handleChange = (e) => {
        setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/students', newStudent)
            .then(response => {
                setStudents([...students, response.data]);
                setNewStudent({
                    name: '',
                    availability: '',
                    area_of_interest: ''
                });
            })
            .catch(err => setError(err));
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Student List</h2>
            <ul>
                {students.map(student => (
                    <li key={student.id}>
                        {student.name} - {student.area_of_interest}
                    </li>
                ))}
            </ul>
            <h3>Add New Student</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    value={newStudent.name} 
                    onChange={handleChange} 
                    placeholder="Name" 
                    required 
                />
                <input 
                    type="text" 
                    name="availability" 
                    value={newStudent.availability} 
                    onChange={handleChange} 
                    placeholder="Availability" 
                    required 
                />
                <input 
                    type="text" 
                    name="area_of_interest" 
                    value={newStudent.area_of_interest} 
                    onChange={handleChange} 
                    placeholder="Area of Interest" 
                    required 
                />
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
};

export default StudentList;

