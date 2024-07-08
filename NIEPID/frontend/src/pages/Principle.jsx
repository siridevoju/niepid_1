import axios from 'axios'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import image from './th.jpeg';



function Principal() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);

    const handleLogout = () => {
        removeCookie('jwt');
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        navigate('/');
    };

    const handleViewTeachers = () => {
        navigate('/principle/viewteachers');
    };

    const handleViewStudents = () => {
        navigate('/principle/viewstudents');
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.logo}>
                    <img src={image} alt="Logo" style={styles.logoImage} />
                    <span style={styles.logoLabel}>NIEPID</span>
                </div>
                <button onClick={handleLogout} style={styles.b1}>
                    Logout
                </button>
            </header>

            <div style={styles.hero}>
                <h1 style={styles.heroTitle}>Welcome to Principal Dashboard</h1>
                <p style={styles.heroSubtitle}>
                    Manage teachers and students efficiently.
                </p>
            </div>

            <div style={styles.adminContainer}>
                <div style={styles.halfContainer}>
                    <h1 style={styles.h1}>Teachers</h1>
                    <div style={styles.buttonContainer}>
                        <div style={styles.buttonWrapper}>
                            <button
                                type="button"
                                onClick={handleViewTeachers}
                                style={styles.button}
                            >
                                View
                            </button>
                            <p style={styles.buttonDescription}>View registered teachers.</p>
                        </div>
                    </div>
                </div>

                <div style={styles.halfContainer}>
                    <h1 style={styles.h1}>Students</h1>
                    <div style={styles.buttonContainer}>
                        <div style={styles.buttonWrapper}>
                            <button
                                type="button"
                                onClick={handleViewStudents}
                                style={styles.button}
                            >
                                View
                            </button>
                            <p style={styles.buttonDescription}>View registered students.</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer style={styles.footer}>
                <p>&copy; 2023 Our Website. All rights reserved.</p>
            </footer>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f0f8ff',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'right',
        padding: '1rem 2rem',
        backgroundColor: '#007bff',
        color: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
    },
    logoImage: {
        width: '40px',
        height: '40px',
        marginRight: '0.5rem',
    },
    logoLabel: {
        fontSize: '1.5rem',
    },
    navLinks: {
        display: 'flex',
        gap: '1.5rem',
    },
    navLink: {
        color: '#ffffff',
        textDecoration: 'none',
        fontSize: '1rem',
        transition: 'color 0.3s',
    },
    navLinkHover: {
        color: '#cccccc',
    },
    hero: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        padding: '2rem',
        textAlign: 'center',
    },
    heroTitle: {
        fontSize: '3rem',
        color: '#333333',
        marginBottom: '1rem',
    },
    heroSubtitle: {
        fontSize: '1.5rem',
        color: '#666666',
        marginBottom: '2rem',
    },
    button: {
        padding: '0.8rem 1.5rem',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.3s',
        margin: '0.5rem',
        width: '100%',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
        transform: 'scale(1.05)',
    },
    footer: {
        textAlign: 'center',
        padding: '1rem',
        backgroundColor: '#007bff',
        color: '#ffffff',
    },
    adminContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '2rem',
        backgroundColor: '#f0f8ff',
    },
    halfContainer: {
        flex: '1 1 45%',
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    h1: {
        fontSize: '2rem',
        marginBottom: '1rem',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '1rem',
        width: '100%',
    },
    buttonDescription: {
        fontSize: '0.9rem',
        color: '#666',
        textAlign: 'center',
        marginTop: '0.5rem',
    },
    b1: {
        fontSize: '0.9rem',
        color: '#666',
        textAlign: 'center',
        marginTop: '0.5rem',
    },
};

export default Principal;