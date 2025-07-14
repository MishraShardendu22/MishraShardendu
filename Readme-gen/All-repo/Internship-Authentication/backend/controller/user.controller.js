import User from '../schema/user.schema.js';

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (user) {
            return res.status(200).json({ user });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Get user failed" });
    }
};

export { getUser };
