const express = require('express');

const app = express();

const contacts = [
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
    const id = req.params.id;
    const person = contacts.find(contact => contact.id == id);
    if(!person){
        return res.status(404).json({
            message: "Contact not found"
        });
    } else {
        res.json(person);
    }
})

const PORT = 3070;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})