const express = require('express');
const bodyParser = require('body-parser');
const knexConfig = require('./db/knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV])
const app = express();
const port = 3000;
app.use(bodyParser.json());


app.get('/', (req, res)=>{
    res.sendFile(__dirname +"/index.html");
})

app.get('/showUser', (req, res) => {

    knex('usersKnex')
        .select({
            id: 'id',
            name: 'name',
            email: 'email'
        })
        .then((users) => {
            return res.json(users);
        })
        .catch((err) => {
            console.error(err);
            return res.json({success: false, message: 'An error occurred, please try again later.'});
        })
});
app.post('/showUserById', (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.json({success: false, message: 'Email is required'});
    }

    knex('usersKnex')
        .where('email', email)
        .select({
            id: 'id',
            name: 'name',
            email: 'email'
        })
        .then((users) => {
            return res.json(users);
        })
        .catch((err) => {
            console.error(err);
            return res.json({success: false, message: 'An error occurred, please try again later.'});
        })
});
app.post('/createUser', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    let timestamp = new Date(Date.now()).toISOString();


    if (!email) {
        return res.json({success: false, message: 'Email is required'});
    }

    if (!name) {
        return res.json({success: false, message: 'Name is required'});
    }

    knex('usersKnex')
        .insert({
            name,
            email,
            created_at: timestamp,
            updated_at: timestamp
        })
        .then((users) => {
            knex('usersKnex')
                .where('email', email)
                .select({
                    id: 'id',
                    name: 'name',
                    email: 'email'
                })
                .then((users) => {
                    let id = users[0].id;
                    return res.json({success: true, message: "User added to the database successfully", id: id, name: name, email: email});
                })
                .catch((err) => {
                    console.error(err);
                    return res.json({success: false, message: 'An error occurred, please try again later.'});
                })
        })
        .catch((err) => {
            console.error(err);
            return res.json({success: false, message: 'An error occurred, please try again later.'});
        });
});
app.put('/updateUser', (req, res)=>{
    const id = req.body.id;

    if (!id) {
        return res.json({success: false, message: 'ID is required'});
    }

    knex('usersKnex')
        .where('id', id)
        .update({
            name: req.body.name,
            email: req.body.email
        })
        .then((users) => {
            return res.json({"success": true});
        })
        .catch((err) => {
            console.error(err);
            return res.json({success: false, message: 'An error occurred, please try again later.'});
        })
})
app.delete('/deleteUser', (req, res)=>{
    const id = req.body.id;

    if (!id) {
        return res.json({success: false, message: 'ID is required'});
    }

    knex('usersKnex')
        .where('id', id)
        .del()
        .then((users) => {
            return res.json({"success": true});
        })
        .catch((err) => {
            console.error(err);
            return res.json({success: false, message: 'An error occurred, please try again later.'});
        })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

