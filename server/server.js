import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import ideasRoutes from './routes/ideaRoutes.js'

dotenv.config()

const app = express();
const port = 3000;
app.use(express.json())
app.use(cors());

//Routes
app.use("/ideas", ideasRoutes);

//Database Connect

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Database connection error:', error));




app.listen(port, () =>  {
    console.log(`Server running on port ${port}`)
})