const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../validations/schema');

class AuthController {
  static async register(req, res, next) {
    try {
      const validatedData = registerSchema.parse(req.body);
      
      const { username, email, password } = validatedData;
      
      const user = await User.create({ 
        username, 
        email, 
        password: bcrypt.hashSync(password, 10), 
        role: 'user' 
      });
      
      res.status(201).json({
        id: user.id,
        email: user.email,
        message: "User created successfully"
      });
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
        throw { status: 401, message: "Invalid email/password" };
      }

      const access_token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET || 'secret'
      );
      
      res.status(200).json({ 
        access_token, 
        username: user.username 
      });
    } catch (err) {
      next(err);
    }
  }

  static async getMe(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] } 
      });

      if (!user) throw { status: 404, message: "User not found" };

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;