const express = require('express');
const app = express();
const cors = require('cors');

const configRoutes = require('./routes');
app.use(express.json());
app.use(cors());

configRoutes(app);

app.listen(3001, () => {
    console.log("Server ON!!");
    console.log("Your routes will be running on http://localhost:3001");
});