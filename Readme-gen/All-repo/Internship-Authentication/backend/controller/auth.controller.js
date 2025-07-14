import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET

const validateToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ valid: false, message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  }
};


export {
    validateToken
}