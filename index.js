const express = require('express')
const app = express()
const students = require('./students.json')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());

app.get('/students', (req, res) => res.send(students))

app.get('/students/:studentId', (req, res) => {
    res.send(students[req.params.studentId-1])
})

app.get('/grades/:studentId', (req, res) => {
    res.send(students[req.params.studentId-1].grades)
})

app.get('/students', (req, res) => {
    let search = req.query.search
    res.send('Hello ${search}, how are you?') //Not working
    // for (var x=0;x<students.length;x++){
    //     if (students[x].name.includes(search)){
    //         res.send(students[x])
    //     }
    // }
})

app.post('/grades', (req, res) => {
    let studentId  = req.body.studentId
    let grades = req.body.grades
    if (studentId !== undefined && grades !== undefined){
        res.send("Success, grade stored")
    }
})

app.post('/register', (req,res) => {
    let studentId  = req.body.studentId
    let name = req.body.name
    let grades = req.body.grades

    if (studentId !== undefined && name !== undefined){
        res.send("New Student Created!\n" + studentId + name + grades)
    }
    else {
        throw new Error("Enter a student ID () and name [first,last]!")
    }

})

const port = 3000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))