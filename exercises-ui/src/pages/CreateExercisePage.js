/**
 * Tamarsh Abeysekera, CS290 - Intro to Web Development
 * Dr. Nauman Chaudhry & Professor Pam Von Londen
 * Assignment 4 - Exercise Tracker Web App
 * filename: `CreateExercisePage.js` - Component - 
 *  allows the user to add a new exercise to the database;
 */


import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import createLogo from '../createLogo.png';

export const CreateExercisePage = () => {
    /**
     * Set State variables for:
     * name, reps, weight, unit, date
     */
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    /**
     * useHistory hook to return to Home Page
     * after adding Exercise
     */
    const history = useHistory();

    const createExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the Exercise");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <>
            <img src={createLogo} className="App-logo" alt="create logo" />
            <div>
                <h1>Create Exercise</h1>
                <input 
                    type="text" 
                    placeholder="Enter name here"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <input 
                    type="text"
                    placeholder="Enter reps here"
                    value={reps}
                    onChange={e => setReps(e.target.value)} />
                <input 
                    type="text"
                    placeholder="Enter weight here"
                    value={weight}
                    onChange={e => setWeight(e.target.value)} />
                <input 
                    type="text"
                    placeholder="Enter unit here"
                    value={unit}
                    onChange={e => setUnit(e.target.value)} />
                <input
                    type="text"
                    placeholder="Enter date here"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
                <button onClick={createExercise}> Create </button>
            </div>
        </>
    );
}

export default CreateExercisePage;