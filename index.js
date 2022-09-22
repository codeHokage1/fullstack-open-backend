const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan());

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
    if(!person.name || !person.number){
        return res.status(400).json({
            error: "Either of name or number, or both are missing"
        })
    } else if(contacts.find(contact => contact.name === person.name)){
        return res.status(400).json({
            error: "Name already exists. Try a unique name"
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