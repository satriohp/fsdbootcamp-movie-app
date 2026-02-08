const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { registerSchema, loginSchema } = require('../validations/schema');
const { sendVerificationEmail } = require('../helpers/mailer');

class AuthController {
  static async register(req, res, next) {
    try {
      const validatedData = registerSchema.parse(req.body);
      const { username, email, password } = validatedData;
      const verificationToken = uuidv4();

      const user = await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 10),
        role: 'user',
        isVerified: false,
        verificationToken,
      });

      try {
        await sendVerificationEmail(email, verificationToken);
      } catch (mailErr) {
        console.error('Failed to send verification email:', mailErr.message);
      }

      res.status(201).json({
        id: user.id,
        email: user.email,
        message: 'Registrasi berhasil! Silakan cek email Anda untuk verifikasi.',
      });
    } catch (err) {
      next(err);
    }
  }

  static async verifyEmail(req, res, next) {
    try {
      const { token } = req.query;

      if (!token) {
        throw { status: 400, message: 'Invalid Verification Token' };
      }

      const user = await User.findOne({
        where: { verificationToken: token },
      });

      if (!user) {
        throw { status: 400, message: 'Invalid Verification Token' };
      }

      if (user.isVerified) {
        return res.status(200).json({ message: 'Email Verified Successfully' });
      }

      await user.update({
        isVerified: true,
        verificationToken: null,
      });

      res.status(200).json({ message: 'Email Verified Successfully' });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const { email, password } = validatedData;

      const user = await User.findOne({ where: { email } });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw { status: 401, message: 'Invalid email/password' };
      }

      if (!user.isVerified) {
        throw { status: 403, message: 'Email belum diverifikasi. Silakan cek inbox Anda.' };
      }

      const access_token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
      );

      res.status(200).json({
        access_token,
        username: user.username,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getMe(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password', 'verificationToken'] },
      });

      if (!user) throw { status: 404, message: 'User not found' };

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;