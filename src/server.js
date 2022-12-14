import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const start = async () => {
    const client = await MongoClient.connect('mongodb://localhost:27017/fsr-todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = client.db('fsr-todos');

/* const express = require('express');
const uuid = require('uuid'); */

/* let fakeTodos = [
    {
        id: '123',
        text: 'Go to the grocery store',
        isCompleted: false
    },
    {
        id: '234',
        text: 'Learn full stack',
        isCompleted: true
    }
]; */

const app = express();
app.use(express.json());

app.get('/todos', async (req, res) => {
    const todos = await db.collection('todos').find({}).toArray();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const newTodoText = req.body.newTodoText;
    /* se arma el todo a crear */
    const newTodo = {
        text: newTodoText,
        isCompleted: false
    }
    const result = await db.collection('todos').insertOne(newTodo);
    const todo = await db.collection('todos').findOne({ _id: result.insertedId })
    
    res.json({
        ...newTodo,
        _id: result.insertedId,
    });
});

app.delete('/todos/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    await db.collection('todos').deleteOne({ _id: ObjectId(todoId) });
    const todos = await db.collection('todos').find({}).toArray();
    res.json(todos);
})

app.put('/todos/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    await db.collection('todos').updateOne({ _id: ObjectId(todoId) }, {
        $set: { isCompleted: true },
    });
    const todos = await db.collection('todos').find({}).toArray();
    res.json(todos);
});


app.listen(8088, () => {
    console.log('Server is listening on port 8088');
})
}

start();