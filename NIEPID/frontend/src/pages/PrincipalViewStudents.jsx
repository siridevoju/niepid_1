import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Add the icons to the library
library.add(faSearch);

const SearchInput = ({ name, value, onChange }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <input
            type="text"
            ref={inputRef}
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={`Search ${name}`}
            style={styles.searchInput}
        />
    );
};

const PrincipalViewStudents = () => {
    const navigate = useNavigate();
    const [studentDetails, setStudentDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [teacherDetails, setTeacherDetails] = useState({});
    const [showSearch, setShowSearch] = useState({
        regNo: false,
        name: false,
        currYear: false,
        currTerm: false,
        classId: false,
    });

    const [searchValues, setSearchValues] = useState({
        regno: '',
        name: '',
        curryear: '',
        currterm: '',
        classid: '',
    });

    useEffect(() => {
        fetchStudentDetails();
    }, [searchValues]);

    const fetchStudentDetails = async () => {
        setLoading(true);
        try {
            console.log(searchValues)
            const { regno, name, curryear, currterm, classid } = searchValues;
            const response = await axios.get('http://localhost:4000/principle/student/search', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                params: { regno, name, curryear, currterm, classid }
            });

            setStudentDetails(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('Error fetching student details. Please try again later.');
            setLoading(false);
        }
    };

    const fetchTeacherDetails = async (classId) => {
        try {
            const response = await axios.get(`http://localhost:4000/principle/teacher/${classId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setTeacherDetails(prevState => ({ ...prevState, [classId]: response.data.teacher }));
        } catch (error) {
            console.error('Error fetching teacher details:', error);
        }
    };

    useEffect(() => {
        studentDetails.forEach(student => {
            if (student.classId && !teacherDetails[student.classId]) {
                fetchTeacherDetails(student.classId);
            }
        });
    }, [studentDetails]);

    const toggleSearch = (column) => {
        setShowSearch(prevState => ({ ...prevState, [column]: !prevState[column] }));
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchValues(searchValues => ({ ...searchValues, [name]: value }));
    };

    const showHistory = (studentId) => {
        navigate(`/principle/viewstudents/history/${studentId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Student Details</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        {['RegNo', 'Name', 'Year', 'Term', 'Class ID', 'Allotted Teacher', 'Actions'].map((header, index) => (
                            <th style={styles.th} key={header}>
                                <div style={styles.thContent}>
                                    <span>{header}</span>
                                    {header !== 'Actions' && (
                                        <FontAwesomeIcon
                                            style={styles.icon}
                                            icon={faSearch}
                                            onClick={() => toggleSearch(header.toLowerCase().replace(' ', ''))}
                                        />
                                    )}
                                </div>
                                {header !== 'Actions' && showSearch[header.toLowerCase().replace(' ', '')] && (
                                    <SearchInput
                                        name={header.toLowerCase().replace(' ', '')}
                                        value={searchValues[header.toLowerCase().replace(' ', '')]}
                                        onChange={handleSearchChange}
                                    />
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {studentDetails.map((student, index) => (
                        <tr key={student._id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                            <td style={styles.td}>{student.regNo}</td>
                            <td style={styles.td}>{student.name}</td>
                            <td style={styles.td}>{student.currYear}</td>
                            <td style={styles.td}>{student.currTerm}</td>
                            <td style={styles.td}>{student.classId}</td>
                            <td style={styles.td}>
                                {teacherDetails[student.classId] ? teacherDetails[student.classId] : 'Loading...'}
                            </td>
                            <td style={styles.td}>
                                <button style={styles.button} onClick={() => showHistory(student._id)}>
                                    Show History
                                </button>
                            </td>
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
    icon: {
        marginLeft: '8px',
        cursor: 'pointer'
    },
    thContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        zIndex: '1',
    },
    searchInput: {
        width: '100%',
        padding: '8px',
        margin: '5px 0',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxSizing: 'border-box'
    },
    td: {
        border: '1px solid #ddd',
        padding: '12px',
        textAlign: 'center',
        color: '#555',
        fontSize: '14px',
        transition: 'background-color 0.3s'
    },
    button: {
        padding: '8px 12px',
        border: 'none',
        backgroundColor: '#0066cc',
        color: '#fff',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#005bb5'
    },
    evenRow: {
        backgroundColor: '#f9f9f9',
        transition: 'background-color 0.3s',
    },
    oddRow: {
        backgroundColor: '#ffffff',
        transition: 'background-color 0.3s',
    },
    rowHover: {
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#e9ecef'
        }
    }
};

export default PrincipalViewStudents;
