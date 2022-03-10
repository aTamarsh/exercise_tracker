/**
 * Tamarsh Abeysekera, CS290 - Intro to Web Development
 * Dr. Nauman Chaudhry & Professor Pam Von Londen
 * Assignment 4 - Exercise Tracker Web App
 * filename: `App.js` - View
 */


import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return(
    <div className="App">
      <Router>
        <div className="App-header">
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>

          <Route path="/create-exercise">
            <CreateExercisePage />
          </Route>

          <Route path="/edit-exercise">
            <EditExercisePage exerciseToEdit={exerciseToEdit} />
          </Route>

        </div>
      </Router>
    </div>
  )
}

export default App;