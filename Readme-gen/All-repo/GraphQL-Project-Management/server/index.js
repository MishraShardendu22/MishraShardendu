import { graphqlHTTP } from 'express-graphql';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';  
import cors from 'cors';
import connectDB from './config/connectDB.js';
import schema from './schema/schema.js';
import path from 'path'; // Import path module
import { fileURLToPath } from 'url'; // Import for converting file URL

const __filename = fileURLToPath(import.meta.url); // Get current file name
const __dirname = path.dirname(__filename); // Get directory name

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;

connectDB();

// Enable CORS
app.use(cors());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// GraphQL endpoint
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));

// Redirect all other requests to index.html for frontend routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`\nServer is running on port ${port}`.blue.bold.underline);
    console.log(`Click To Connect to http://localhost:${port}`.blue.bold.underline);
});
