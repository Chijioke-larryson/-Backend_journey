

const express = require('express')
const app = express()
const PORT = 2003

let data =
    [ 'James']


app.use(express.json())

app.get('/', (req, res ) => {
    console.log('user requested homepage website ')
    res.send(`
    <body
    style="background: green"
    
    >
    <h1>DATA</h1>
    <p>${JSON.stringify(data)}</p>
    <a href="/dashboard">Dashboard </a>
</body>
<script>console.log('This is my script')</script>

    
    
    `)




})




app.post('/api/data', (req, res) => {
    const newEntry = req.body
    console.log(newEntry)
    data.push(newEntry.name)
    res.sendStatus(201)

})

app.delete('/api/data', (req,res) => {
    data.pop()
    console.log('we have deleted the element of the end of the array')
    res.send(203)
})


app.get('/dashboard', (req, res) => {
    console.log('Ohh now i hit /dashboard endpoint', )
    res.send(`
<body>
<h1>dashboard</h1>
<a href="/">home</a>

</body>

`)


})

app.get('/api/data',(req, res ) => {
    console.log("This is for data")
    res.send(data)
})

app.listen(PORT, () => console.log(`Server is running: ${PORT}`))