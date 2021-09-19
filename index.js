const express = require('express')
const mongoose = require('mongoose'); 
const cors = require('cors')
const dotenv = require('dotenv'); 
const compression = require('compression')
const enquiryRoutes = require('./routes/enquiry')


dotenv.config();

const app = express()

app.use(compression())

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())

app.use('/enquiry', enquiryRoutes)

const CONNECTION_URL = 'mongodb+srv://manipalRentals:mkQmu6yBScBqDOFa@cluster0.gz5zj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, ()=> {console.log(`Server running on port ${PORT}`)}))
    .catch((error) => console.log(error.message)) 
