import React, { useState, useContext } from 'react'
import classes from './auth.module.css'
import { Link, useLocation, useNavigate} from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, READER_ROUTE, WRITER_ROUTE, ADMIN_ROUTE } from './../../utils/consts';
import { loginf, registration } from '../../http/userAPI'
import { observer } from "mobx-react-lite";
import { Context } from "../../index"

const Auth = observer(() => {
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const {user} = useContext(Context)

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const defaultRole = 'READER'

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await loginf(login, password)
            }
            else {
                data = await registration(login, password, defaultRole)
            }        
            user.setUser(data)
            user.setIsAuth(true)
            if(data.role === 'READER') navigate(READER_ROUTE)
            if(data.role === 'WRITER') navigate(WRITER_ROUTE)
            if(data.role === 'ADMIN') navigate(ADMIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.fieldset}>
                <h2 className={classes.head}>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <input className={classes.input} type="text" placeholder='Введите логин' value={login} onChange={e => setLogin(e.target.value)} />
                <input className={classes.input} type="password" placeholder='Введите пароль' value={password} onChange={e => setPassword(e.target.value)} />

                {isLogin ?
                    <div className={classes.btns}>
                        <Link className={classes.lnk} to={REGISTRATION_ROUTE}>Регистрация</Link>
                        <button className={classes.btn} onClick={click}>Войти</button>
                    </div>
                    :
                    <div className={classes.btns}>
                        <Link className={classes.lnk} to={LOGIN_ROUTE}>Авторизация</Link>
                        <button className={classes.btn} onClick={click}>ОК</button>
                    </div>
                }
            </div>
        </div>
    )
})

export default Auth;