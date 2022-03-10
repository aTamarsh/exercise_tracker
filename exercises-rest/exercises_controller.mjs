/**
 * Tamarsh Abeysekera, CS290 - Intro to Web Development
 * Dr. Nauman Chaudhry & Professor Pam Von Londen
 * Assignment 4 - Exercise Tracker Web App
 * filename: `exercises_controller.mjs` - Controller file
 */



import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

/**
 * Because we are using the express.json(), the request body has been parsed as json; 
 */
app.use(express.json());

/**
 * 1. Create using POST /exercises
 * Create a new exercise with the name, reps, weight, unit, and date;
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});


/**
 * 2. Read using GET /exercises
 * Retrive Exercises (entire collection);
 */
app.get('/exercises', (req, res) => {
    let filter = {};
    exercises.findExercises(filter, '', 0)
        .then(movies => {
            res.status(200).json(movies);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        })
});


/**
 * 3. Update using /exercises/:id
 * Update the exercise whose id is provided in the path parameter and set its
 * name, reps, weight, unit, and date to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({ 
                    _id: req.params._id,
                    name: req.body.name, 
                    reps: req.body.reps,
                    weight: req.body.weight,
                    unit: req.body.unit,
                    date: req.body.date
                })
            } else {
                res.status(404).json({ Error: 'Resource not fuond' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});





/**
 * Delete the exercise whose id is provided in the query params;
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if(deletedCount === 1) {
                res.status(204).send();
            } else{
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});