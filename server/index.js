require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 8080

app.get('/', (req, res) => res.send('Welcome to Lift App!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
require('./models/connection')

const cors = require('cors')
app.use(cors())

app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./routes'))

