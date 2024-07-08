import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation, useNavigate } from 'react-router-dom';
import flattenStudentData from '../helpers/flattenStudentData'

function AddStudents(params) {
    const location = useLocation();
    const navigate = useNavigate();
    const { hash, pathname, search } = location;
    const username = pathname.split("/")[pathname.split("/").length - 1];
    const [isEditing, setIsEditing] = useState(true);

    const classes = createUseStyles();
    const [info, setInfo] = useState({
        regNo: '',
        regDate: '',
        historyOfPresentCondition: [''],
    })
    const [presentingComplaints, setPresentingComplaints] = useState({
        hasDysmorphicFeatures: '',
        hasDysmorphicFeaturesDuration: '',
    })
    const [history, setHistory] = useState({
        chromosomalAberrations: '',
        rhIncompatibility: '',
    })
    const [familyHistory, setFamilyHistory] = useState({
        typeOfFamily: '',
        mentalRetardation: '',
    })
    const [developmentHistory, setDevelopmentHistory] = useState({
        headControl3To5Months: '',
        rolling3To5Months: '',
    })


    const [formData, setFormData] = useState({
        details: {
            info: info,
            presentingComplaints: presentingComplaints,
            history: history,
            familyHistory: familyHistory,
            developmentHistory: developmentHistory,
        },
        stdCred: {
            section: '',
            year: '',
        }

    });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handlePresentingComplaints = (e) => {
        const { name, value, type, checked } = e.target;
        setPresentingComplaints({
            ...presentingComplaints,
            [name]: value
        })
    }
    const handleInfo = (e) => {
        const { name, value, type, checked } = e.target;
        setInfo({
            ...info,
            [name]: value
        })
    }
    const handleHistory = (e) => {
        const { name, value, type, checked } = e.target;
        setHistory({
            ...history,
            [name]: value
        })
    }
    const handleFamilyHistory = (e) => {
        const { name, value, type, checked } = e.target;
        setFamilyHistory({
            ...familyHistory,
            [name]: value
        })
    }
    const handleDevelopmentHistory = (e) => {
        const { name, value, type, checked } = e.target;
        setDevelopmentHistory({
            ...developmentHistory,
            [name]: value
        })
    }

    const handleConditionChange = (index, e) => {
        const { name, value } = e.target;
        const newConditions = formData.presentCondition.slice();
        newConditions[index] = { ...newConditions[index], [name]: value };
        setFormData({
            ...formData,
            presentCondition: newConditions,
        });
    };

    const addConditionRow = () => {
        setFormData({
            ...formData,
            presentCondition: [...formData.presentCondition, { description: '' }],
        });
    };

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault();
        await axios.post('http://localhost:4000/updatestudentdetails', { formData }, {
            withCredentials: true
        })
            .then((res) => {
                console.log("success")
                console.log(formData)
                navigate("/admin");
            })
            .error((err) => { console.log(formData) })

    };

    useEffect = () => {
        console.log(formData)
    }

    return (
        <form onSubmit={handleSubmit} className={classes.registrationForm}>
            <div className={classes.title}>Student Details Form</div>
            <label className={classes.label}>
                Registration Number:
                <input
                    type="text"
                    name="regNo"
                    value={info.regNo}
                    onChange={handleInfo}
                    className={classes.textInput}
                />
            </label>
            <label className={classes.label}>
                Date:
                <input
                    type="text"
                    name="regDate"
                    value={info.regDate}
                    onChange={handleInfo}
                    className={classes.textInput}
                />
            </label>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th className={classes.th}>S.No</th>
                        <th className={classes.th}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {info.historyOfPresentCondition.map((condition, index) => (
                        <tr key={index}>
                            <td className={classes.td}>{index + 1}</td>
                            <td className={classes.td}>
                                <input
                                    type="text"
                                    name="description"
                                    value={condition.description}
                                    onChange={(e) => handleConditionChange(index, e)}
                                    className={classes.textInput}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="button" onClick={addConditionRow} className={classes.addButton}>Add Row</button>
            <button type="submit" className={classes.button}>Submit</button>

            <table className={classes.table}>
                <thead>
                    <tr>
                        <th className={classes.th}>Record Verbatim</th>
                        <th className={classes.th}>On Set</th>
                        <th className={classes.th}>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={classes.td}>Has dysmorphic features</td>
                        <td className={classes.td}>
                            <input
                                type="text"
                                name="hasDysmorphicFeatures"
                                value={presentingComplaints.hasDysmorphicFeatures}
                                onChange={handlePresentingComplaints}
                                className={classes.textInput}
                            />
                        </td>
                        <td className={classes.td}>
                            <input
                                type="text"
                                name="hasDysmorphicFeaturesDuration"
                                value={presentingComplaints.hasDysmorphicFeaturesDuration}
                                onChange={handlePresentingComplaints}
                                className={classes.textInput}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            <table className={classes.table}>
                <thead>
                    <tr>
                        <th className={classes.th}>S.No</th>
                        <th className={classes.th}>Sub Profile Name</th>
                        <th className={classes.th}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={classes.td}>1</td>
                        <td className={classes.td}>Chromosomal Aberrations</td>
                        <td className={classes.td}>
                            <input
                                type="text"
                                name="chromosomalAberrations"
                                value={history.chromosomalAberrations}
                                onChange={handleHistory}
                                className={classes.textInput}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={classes.td}>2</td>
                        <td className={classes.td}>Rh incompatibility</td>
                        <td className={classes.td}>
                            <input
                                type="text"
                                name="rhIncompatibility"
                                value={history.rhIncompatibility}
                                onChange={handleHistory}
                                className={classes.textInput}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th className={classes.th}>S.No</th>
                        <th className={classes.th}>Sub Profile Name</th>
                        <th className={classes.th}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={classes.td}>1</td>
                        <td className={classes.td}>Type of Family</td>
                        <td className={classes.td}>
                            <input
                                type="text"
                                name="typeOfFamily"
                                value={familyHistory.typeOfFamily}
                                onChange={handleFamilyHistory}
                                className={classes.textInput}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={classes.td}>2</td>
                        <td className={classes.td}>Mental retardation</td>
                        <td className={classes.td}>
                            <input
                                type="text"
                                name="mentalRetardation"
                                value={familyHistory.mentalRetardation}
                                onChange={handleFamilyHistory}
                                className={classes.textInput}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th className={classes.th}>S.No</th>
                        <th className={classes.th}>Sub Profile Name</th>
                        <th className={classes.th}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={classes.td}>1</td>
                        <td className={classes.td}>Head Control:(3-5 Months)</td>
                        <td className={classes.td}>
                            <input
                                type="text"
                                name="headControl3To5Months"
                                value={developmentHistory.headControl3To5Months}
                                onChange={handleDevelopmentHistory}
                                className={classes.textInput}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={classes.td}>2</td>
                        <td className={classes.td}>Rolling:(3-5 Months)</td>
                        <td className={classes.td}>
                            <input
                                type="text"
                                name="rolling3To5Months"
                                value={developmentHistory.rolling3To5Months}
                                onChange={handleDevelopmentHistory}
                                className={classes.textInput}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className={classes.tableContainer}>
                <div className={classes.tableTitle}>Educational Details</div>
                <table className={classes.table}>
                    <tbody>
                        <tr>
                            <td className={classes.th}>Year</td>
                            <td>
                                <select
                                    className={classes.textInput}
                                    name="year"
                                    onChange={handleChange}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </td>

                        </tr>
                        <tr>
                            <td className={classes.th}>Section</td>
                            <td>
                                <select
                                    className={classes.textInput}
                                    name="section"
                                    onChange={handleChange}
                                >
                                    <option value="preprimary">preprimary</option>
                                    <option value="primary_I">primary_I</option>
                                    <option value="primary_II">primary_II</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br></br>
            <div>
                <button className={classes.button} type="submit">save</button>
            </div>
        </form>
    );
};

export default AddStudents;
