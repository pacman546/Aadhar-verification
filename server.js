import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import aadharRoutes from './routes/aadharRoutes.js'
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());


app.use('/aadhar-verification', aadharRoutes);

app.get("/", (req, res) => {
    res.send('Api is running... ');
});


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});