import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const TeacherTable = () => {
    const [teacherDetails, setTeacherDetails] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [editedTeacher, setEditedTeacher] = useState({
        teacherId: '',
        teacherName: '',
        email: '',
        teacherMNo: '',
        classId: ''
    });

    // Fetch the role from localStorage
    const role = localStorage.getItem('role');

    const fetchData = async () => {
        try {
            const response = role === "admin" ? await axios.get('http://localhost:4000/admin/viewTeacher', {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem("token")}`
                },
                withCredentials: true
            }) : await axios.get('http://localhost:4000/principle/viewTeacher', {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem("token")}`
                },
                withCredentials: true
            })
            setTeacherDetails(response.data.data);
        } catch (error) {
            console.error('Error fetching teacher details:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditClick = (teacher) => {
        setEditMode(teacher.teacherId);
        setEditedTeacher({ ...teacher }); // Copy teacher details to editedTeacher
    };

    const handleSaveClick = async (id) => {
        try {
            // Ensure classId is converted back to array if edited as comma-separated string
            const updatedTeacher = { ...editedTeacher };
            if (typeof editedTeacher.classId === 'string') {
                updatedTeacher.classId = editedTeacher.classId.split(',').map(item => item.trim()).filter(item => item !== "");
            }

            const response = await axios.put(
                `http://localhost:4000/admin/updateTeacher/${id}`,
                updatedTeacher,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                // Update teacherDetails with the updated teacher
                const updatedDetails = teacherDetails.map((teacher) =>
                    teacher.teacherId === id ? response.data : teacher
                );

                setTeacherDetails(updatedDetails);
                setEditMode(null);
                setEditedTeacher({}); // Reset editedTeacher state

                // Refetch data to ensure UI reflects changes immediately
                fetchData();
            } else {
                console.error('Failed to update teacher details.');
            }
        } catch (error) {
            console.error('Error updating teacher details:', error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Handle classId specifically to convert comma-separated string to array
        if (name === 'classId') {
            setEditedTeacher({ ...editedTeacher, [name]: value });
        } else {
            setEditedTeacher({ ...editedTeacher, [name]: value });
        }
    };

    // Conditionally render the edit button based on the role
    const renderActionButton = (teacher) => {
        if (editMode === teacher.teacherId) {
            return (
                <button style={styles.button} onClick={() => handleSaveClick(teacher._id)}>Save</button>
            );
        } else if (role === 'admin') {
            return (
                <button style={styles.button} onClick={() => handleEditClick(teacher)}>Edit</button>
            );
        } else {
            return null;
        }
    };

    // Redirect non-admin users to the home page
    // if (role !== 'admin') {
    //     console.error("Not an Admin");
    //     return <Navigate to="/" replace />;
    // }
    const headers = ['ID', 'Name', 'Email', 'Mobile', 'Class ID'];
    if (role === 'admin') {
        headers.push('Actions');
    }
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Teacher Details</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th style={styles.th} key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {teacherDetails.map((teacher, index) => (
                        <tr key={teacher.teacherId} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                            <td style={styles.td}>
                                <input
                                    type="text"
                                    name="teacherId"
                                    value={editMode === teacher.teacherId ? editedTeacher.teacherId : teacher.teacherId}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    readOnly={editMode !== teacher.teacherId}
                                />
                            </td>
                            <td style={styles.td}>
                                <input
                                    type="text"
                                    name="teacherName"
                                    value={editMode === teacher.teacherId ? editedTeacher.teacherName : teacher.teacherName}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    readOnly={editMode !== teacher.teacherId}
                                />
                            </td>
                            <td style={styles.td}>
                                <input
                                    type="text"
                                    name="email"
                                    value={editMode === teacher.teacherId ? editedTeacher.email : teacher.email}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    readOnly={editMode !== teacher.teacherId}
                                />
                            </td>
                            <td style={styles.td}>
                                <input
                                    type="text"
                                    name="teacherMNo"
                                    value={editMode === teacher.teacherId ? editedTeacher.teacherMNo : teacher.teacherMNo}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    readOnly={editMode !== teacher.teacherId}
                                />
                            </td>
                            <td style={styles.td}>
                                <input
                                    type="text"
                                    name="classId"
                                    value={editMode === teacher.teacherId ? editedTeacher.classId : teacher.classId}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    readOnly={editMode !== teacher.teacherId}
                                />
                            </td>
                            {role === "admin" ? <td style={styles.td}>
                                {renderActionButton(teacher)}
                            </td> : null}

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        margin: '20px auto',
        maxWidth: '900px',
        backgroundColor: '#ffffff',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    heading: {
        fontSize: '28px',
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center',
        fontFamily: "'Roboto', sans-serif"
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px'
    },
    th: {
        border: '1px solid #ddd',
        padding: '12px',
        textAlign: 'left',
        backgroundImage: 'linear-gradient(to right, #0066cc, #0099ff)',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: '16px',
        position: 'sticky',
        top: '0',
        zIndex: '1'
    },
    td: {
        border: '1px solid #ddd',
        padding: '12px',
        textAlign: 'left',
        color: '#555',
        fontSize: '14px',
        transition: 'background-color 0.3s'
    },
    evenRow: {
        backgroundColor: '#f9f9f9',
        transition: 'background-color 0.3s',
    },
    oddRow: {
        backgroundColor: '#ffffff',
        transition: 'background-color 0.3s',
    },
    button: {
        backgroundColor: '#007BFF',
        color: '#ffffff',
        border: 'none',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '14px',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    input: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxSizing: 'border-box'
    }
};

export default TeacherTable;
