import User from '../schema/user.schema.js';
import bcrypt from 'bcrypt';

const signup = async (req, res) => {
    try {
        const { name, email, password, gender } = req.body;
        console.log("checkpoint - 1");

        const existingUser = await User.findOne({ $or: [{ email }, { name }] });
        
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ error: "Email is already registered" });
            }
            if (existingUser.name === name) {
                return res.status(400).json({ error: "Name is taken" });
            }
        }
        console.log("checkpoint - 2");
        

        let image = "https://avatar.iran.liara.run/public/boy" + name;
        if (gender === "female") {
            image = "https://avatar.iran.liara.run/public/girl" + name;
        }

        console.log("checkpoint - 3");
        const user = new User({
            name,
            email,
            password,
            gender,
            image
        });

        console.log("checkpoint - 4");
        user.password = await bcrypt.hash(password, 10);
        await user.save();

        console.log("checkpoint - 5");

        return res.status(200).json({ message: "Signup success" });
    } catch (error) {
        return res.status(400).json({ error: "Signup failed" });
    }
}

export {
    signup,
}
