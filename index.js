const express = require('express');

const app = express();
app.use(express.json());

let contacts = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send("<h1>Welcome to the Phonebook</h1>")
})

app.get('/info', (req, res) => {
    res.send(
        `<div>
            <p>Phonebook has info for ${contacts.length} people</p>
            <p>${new Date()}</p>
        </div>`
    )
})

app.get('/api/persons', (req, res) => {
    res.json(contacts)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = contacts.find(contact => contact.id === id);
    if(!person){
        return res.status(404).json({
            message: "Contact not found"
        });
    } else {
        res.json(person);
    }
})

app.post('/api/persons', (req, res) => {
    const person = req.body;
    if(!person){
        return res.status(404).json({
            message: "Name and number are missing"
        })
    } else {
        const randomId = Math.floor(Math.random() * 100)
        const newPerson = {
            id : contacts.filter(contact => contact.id === randomId) ? Math.floor(Math.random() * 100) : randomId,
            ...person 
        }
        contacts = contacts.concat(newPerson);
        res.json({
            message: "Contact created",
            person: newPerson
        })
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = contacts.find(contact => contact.id === id);
    if(!person){
        return res.status(404).json({
            message: "Contact to be deleted not found"
        });
    } else {
        contacts = contacts.filter(contact => contact.id !== id);
        return res.status(204).json({
            message: "Contact deleted"
        })    
    }
})

const PORT = 3070;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})