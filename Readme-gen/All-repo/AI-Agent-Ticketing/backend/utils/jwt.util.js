import jwt from "jsonwebtoken";
const JSign = (user) => {
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "24d" });
    return token;
};
export { JSign };
