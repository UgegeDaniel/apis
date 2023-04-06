const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const createToken = (id) => {
    return jwt.sign(
        id, secret, { expiresIn: '1d' }
    )
}


const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ success: false, msg: "Token required" })
    const token = authorization.split(' ')[1];
    try {
        const { studentId, role } = jwt.verify(token, secret)
        req.studentId = studentId;
        req.role = role;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, msg: "Invalid token" })
    }
}

module.exports = {
    createToken, requireAuth
}