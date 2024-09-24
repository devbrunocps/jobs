import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import authRoutes from './auth/auth.js';
import usersRoutes from './users/users.js';
import jobsRoutes from './jobs/jobs.js'
import companiesRoutes from './companies/companies.js'
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/companies', companiesRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})