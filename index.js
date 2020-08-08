const express = require('express');
const { Router } = require('express');
const app = express();

//Import routes
const authRoute = require('./routes/auth');

//Middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server is running'));