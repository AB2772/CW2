const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// Get Account
router.get('/', async (req, res) => {
    const posts = await loadAccountsCollection();
    res.send(await accounts.find({}).toArray());
});

// Add Account
router.post('/', async (req, res) =>{
    const accounts = await loadAccountsCollection();
    await accounts.insertOne({
        email: req.body.email,
        password: req.body.password,
        accType: req.body.accType,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
    const accounts = await loadAccountsCollection();
    await accounts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send();
});

async function loadAccountsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://ExampleUser:ExampleUser@cw2db-mzdyx.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });
return client.db('cw2db').collection('accounts');
}
module.exports = router;