/**
 * Tamarsh Abeysekera, CS290 - Intro to Web Development
 * Dr. Nauman Chaudhry & Professor Pam Von Londen
 * Assignment 4 - Exercise Tracker Web App
 * filename: `EditExercisePage.js` - Component - 
 *  allows the user to edit specific exercise for which the user lcicked the edit icon;
 */



import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import editLogo from '../editLogo.png';

export const EditExercisePage = ({ exerciseToEdit }) => {
    /**
     * Set State variables for:
     * name, reps, weight, unit, date
     */
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    /**
     * useHistory hook to return to Home Page
     * after adding Exercise
     */
    const history = useHistory();

    const editExercise = async() => {
        const editedExercise = { name, reps, weight, unit, date };
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the exercise");
        } else {
            alert(`Failed to edit exercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <>
            <img src={editLogo} className="App-logo" alt="logo of edit" />
            <div>
                <h1> Edit Exercise </h1>
                <input 
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <input 
                    type="text"
                    value={reps}
                    onChange={e => setReps(e.target.value)} />
                <input 
                    type="text"
                    value={weight}
                    onChange={e => setWeight(e.target.value)} />
                <input
                    type="text"
                    value={unit}
                    onChange={e => setUnit(e.target.value)} />
                <input
                    type="text"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
                <button onClick={editExercise}> Save </button>
            </div>
        </>
    );
}

export default EditExercisePage;




