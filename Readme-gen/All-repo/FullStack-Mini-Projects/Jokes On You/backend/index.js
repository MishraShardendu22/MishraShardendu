import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors

dotenv.config();

const app = express();
const port = process.env.HIDDEN_PORT || 3000;

app.use(cors());
app.use(express.static("dist"));

app.get("/", (req, res) => {
    res.send("Hello World");
});

const jokes = [
    {
        id : 1,
        text : "Why did the scarecrow win an award? Because he was outstanding in his field.", 
    },
    {
        id : 2,
        text : "What do you call a belt made out of watches? A waist of time.",
    },
    {
        id : 3,
        text : "Why don't skeletons fight each other? They don't have the guts"
    },
    {
        id : 4,
        text : "Why did the math book look sad? Because it had too many problems."
    },
    {
        id : 5,
        text : "What do you call a fish wearing a crown? A kingfish."
    },
    {
        id : 6,
        text : "What do you call a factory that makes okay products? A satisfactory."
    },
    {
        id : 7,
        text : "Why did the tomato turn red? Because it saw the salad dressing."
    },
    {
        id : 8,
        text : "Why did the coffee file a police report? It got mugged."
    },
    {
        id : 9,
        text : "Why did the golfer bring two pairs of pants? In case he got a hole in one."
    },
    {
        id : 10,
        text : "What do you call a fake noodle? An impasta."
    },
    {
        id : 11,
        text : "Why did the cookie go to the doctor? It was feeling crumbly."   
    }
];

app.get("/api/jokes", (req, res) => {
    res.json(jokes); // Use res.json for automatic JSON conversion
});

app.listen(port, () => {
    console.log(`Server is running on port ${port} Enjoy!!!!`);
});
