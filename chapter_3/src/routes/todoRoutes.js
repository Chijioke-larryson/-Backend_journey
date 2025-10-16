import express from "express";
import db from "../db.js";




const router = express.Router()

router.get('/', (req, res) => {
        const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
        const todos = getTodos.all(req.userId)
        res.json(todos)

})


    router.post('/', (req, res) => {
        const {task} = req.body;
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
       const result = insertTodo.run(req.userId, task)

        res.json({id: result.lastInsertRowid, task, completed: 0 })
    })

    router.put('/:id', (req, res) => {

        console.log('Request body:', req.body);

        const { completed} = req.body;
        const {id} = req.params;
        const {page} = req.query;

        const updatedTodo = db.prepare('UPDATE Todos SET completed = ?  WHERE  id = ? ')
        updatedTodo.run(completed, id)
        res.json({message: 'Todo Completed'})
    })


    router.delete('/:id', (req, res) => {})


    export default router;
