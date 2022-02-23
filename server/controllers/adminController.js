const { User } = require('../models/models')
const db = require('../db');
const sequelize = require('../db');

class AdminController {
    //sequelize variant
    // async users(req, res) {
    //     let users = await User.findAll({ attributes: ['login', 'role'] })
    //     return res.json(users)
    // }

    //pg variant
    async users(req, res) {
        let users = await db.query("SELECT u.login, u.role FROM users u",)
        return res.json(users.rows)
    }
    
    //sequelize variant
    // async user_delete(req, res) {
    //     try {
    //         const { login } = req.body
    //         if (login !== "admin" && login !== "reader" && login !== "writer") {
    //             await User.destroy({
    //                 where: {
    //                     login: login
    //                 }
    //             });
    //             return res.json({ message: "Пользователь удален!" })
    //         }
    //         else return res.json({ message: "Этого пользователя удалять нельзя!" })
    //     } catch (e) {
    //         return res.json(e.message);
    //     }
    // }

    //pg variant
    async user_delete(req, res) {
        try {
            const { login } = req.body
            if (login !== "admin" && login !== "reader" && login !== "writer") {
                await db.query("DELETE from users WHERE login = $1", [login]);
                return res.json({ message: "Пользователь удален!" })
            }
            else return res.json({ message: "Этого пользователя удалять нельзя!" })
        } catch (e) {
            return res.json(e.message);
        }
    }
}

module.exports = new AdminController()