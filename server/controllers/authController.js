const db = require('../db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const sendResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        success: statusCode < 400,
        message,
        ...(data && { data })
    });
};

const register = async (req, res) => {
    const { fullname, username, password, email } = req.body;

    if (!fullname || !username || !password || !email) {
        return sendResponse(res, 400, 'Semua field wajib diisi');
    }

    try {
        const userExist = await db.query('SELECT email FROM users WHERE email = $1', [email]);
        if (userExist.rows.length > 0) {
            return sendResponse(res, 400, 'Email sudah terdaftar');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const verificationToken = uuidv4();

        const newUser = await db.query(
            'INSERT INTO users (fullname, username, password, email, verification_token) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, fullname, username',
            [fullname, username, hashedPassword, email, verificationToken]
        );

        return sendResponse(res, 201, 'User berhasil didaftarkan', {
            user: newUser.rows[0]
        });
    } catch (error) {
        console.error('Register Error:', error);
        return sendResponse(res, 500, error.message);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return sendResponse(res, 400, 'Email dan password wajib diisi');
    }

    try {
        const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (userResult.rows.length === 0) {
            return sendResponse(res, 401, 'Email atau password salah');
        }

        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return sendResponse(res, 401, 'Email atau password salah');
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET || 'secret_key_yang_sangat_rahasia',
            { expiresIn: '24h' } 
        );

        return sendResponse(res, 200, 'Login berhasil', {
            token,
            user: {
                id: user.id,
                fullname: user.fullname,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        return sendResponse(res, 500, error.message);
    }
};

const getMe = async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, fullname, username, email FROM users WHERE id = $1', 
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return sendResponse(res, 404, 'User tidak ditemukan');
        }

        return sendResponse(res, 200, 'Data profil berhasil diambil', result.rows[0]);
    } catch (error) {
        console.error('GetMe Error:', error);
        return sendResponse(res, 500, error.message);
    }
};

module.exports = { register, login, getMe };