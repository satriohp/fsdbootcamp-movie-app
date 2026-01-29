const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Ambil Bearer <token>

    if (!token) return res.status(401).json({ message: "Akses ditolak, token hilang" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded; // Isinya { id, username } sesuai yang lo sign di login
        next();
    } catch (error) {
        res.status(403).json({ message: "Token tidak valid atau kadaluarsa" });
    }
};

module.exports = verifyToken;