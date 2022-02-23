const ApiError = require('../error/ApiError')
const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')


const generateJwt = (user_id, login, role) => {
    return jwt.sign(
        {user_id, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    //sequelize variant
    // async registration(req, res, next) {
    //     const {login, password, role} = req.body
    //     if (!login || !password) {
    //         return next(ApiError.badRequest('Некорректный login или password'))
    //     }
    //     const candidate = await User.findOne({where: {login}})
    //     if (candidate) {
    //         return next(ApiError.badRequest('Пользователь с таким login уже существует'))
    //     }
    //     const hashPassword = await bcrypt.hash(password, 5)
    //     const user = await User.create({login, role, password: hashPassword})
    //     const token = generateJwt(user.user_id, user.login, user.role)
    //     return res.json({token})
    // }

    //pg variant
    async registration(req, res, next) {
        const {login, password, role} = req.body
        if (!login || !password) {
            return next(ApiError.badRequest('Некорректный login или password'))
        }
        const candidate = await db.query("SELECT * FROM users WHERE login = $1", [login])
        if (candidate.rows[0]) {
            return next(ApiError.badRequest('Пользователь с таким login уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await db.query("INSERT INTO users (login, password, role) values($1, $2, $3) RETURNING login", [login, hashPassword, role])
        const token = generateJwt(user.user_id, user.login, user.role)
        // res.header(Access-Control-Allow-Origin, ['*'])
        return res.json({token})
    }

    //sequelize variant
    // async login(req, res, next) {
    //     const {login, password} = req.body
    //     const user = await User.findOne({where: {login}})
    //     if (!user) {
    //         return next(ApiError.internal('Пользователь не найден'))
    //     }
    //     let comparePassword = bcrypt.compareSync(password, user.password)
    //     if (!comparePassword) {
    //         return next(ApiError.internal('Указан неверный пароль'))
    //     }
    //     const token = generateJwt(user.user_id, user.login, user.role)
    //     return res.json({token})
    // }

    //pg variant
    async login(req, res, next) {
        const {login, password} = req.body
        const user = await db.query("SELECT * FROM users WHERE login = $1", [login])
        if (!user.rows[0]) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.rows[0].password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.rows[0].user_id, user.rows[0].login, user.rows[0].role)
        return res.json({token})
    }

    async auth(req, res) {
        const token = generateJwt(req.user.user_id, req.user.login, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()