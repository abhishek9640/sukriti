const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/FormData');


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://abhishekgupta9640:X3VMDb4NLxMIuy4O@cluster0.vde12.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post('/register', (req, res)=>{
    // To post / insert data into database

    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            FormDataModel.create(req.body)
            .then(log_reg_form => res.json(log_reg_form))
            .catch(err => res.json(err))
        }
    })
    
})

app.post('/login', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})

// Fetch all registered users
app.get('/users', (req, res) => {
    FormDataModel.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    FormDataModel.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                res.status(204).send(); // No content
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => res.status(500).json(err));
});
// Update user by ID
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    FormDataModel.findByIdAndUpdate(id, { name, email }, { new: true })
        .then(updatedUser => {
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => res.status(500).json(err));
});


app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");

});