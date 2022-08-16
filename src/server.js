const express = require('express');
const uuid = require('uuid');

let fakeTodos = [
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
];

const app = express();
app.use(express.json());

app.get('/todos', (req, res) => {
    res.json(fakeTodos);
});

app.post('/todos', (req, res) => {
    const newTodoText = req.body.newTodoText;
    const newTodo = {
        id: uuid.v4(),
        text: newTodoText,
        isCompleted: false
    }
    fakeTodos.push(newTodo);
    res.json(newTodo);
});


app.listen(8088, () => {
    console.log('Server is listening on port 8088');
})