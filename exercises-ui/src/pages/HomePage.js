/**
 * Tamarsh Abeysekera, CS290 - Intro to Web Development
 * Dr. Nauman Chaudhry & Professor Pam Von Londen
 * Assignment 4 - Exercise Tracker Web App
 * filename: `HomePage.js` - Component - rendered when app starts up;
 */


import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import exerciseLogo from '../exerciseLogo.png';

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if(response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id));
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, 
                status code = ${response.status}`);
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    };

    const loadExercises = async() => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    };
    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <header className="App-header">
                <div class="img-container"> 
                <img src={exerciseLogo} className="App-logo" alt="logo"/>
                </div>
                <h1>Welcome to the Exercise Tracker!</h1>
            </header>
            
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} 
                onDelete={onDelete}
                onEdit={onEdit}>
            </ExerciseList>

            <section>
                <div>
                    <Link to="/create-exercise">Create an Exercise</Link>
                </div>
            </section>
        </>
    );
}

export default HomePage;
