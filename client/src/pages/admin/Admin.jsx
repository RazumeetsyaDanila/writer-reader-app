import React from 'react';
import { useContext, useState } from 'react';
import { LOGIN_ROUTE } from '../../utils/consts';
import { Context } from './../../index';
import { Link } from 'react-router-dom';
import classes from './admin.module.css'
import { observer } from 'mobx-react-lite';
import { registration } from './../../http/userAPI';


const Admin = observer(() => {
    const { user } = useContext(Context)

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('READER')

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    const click = async () => {
        try {
            let data
            data = await registration(login, password, role)
            setLogin('')
            setPassword('')
            alert("Новый пользователь успешно зарегистрирован!")
        } catch (e) {
            alert(e.response.data.message)
        }


    }

    return (
        <div className={classes.container}>
            <p className={classes.roleLabel}>ADMIN</p>
            <div className={classes.fieldset}>
                <p className={classes.funcLabel}>Добавление нового пользователя</p>
                <input className={classes.input} type="text" placeholder='Введите логин' value={login} onChange={e => setLogin(e.target.value)} /><br />
                <input className={classes.input} type="password" placeholder='Введите пароль' value={password} onChange={e => setPassword(e.target.value)} />
                <div>
                    <select name="role" className={classes.slct} onChange={e => setRole(e.target.value)} value={role}>
                        <option value="READER">Читатель</option>
                        <option value="WRITER">Писатель</option>
                        <option value="ADMIN">Админ</option>
                    </select>
                </div>

                <button className={classes.btn} onClick={click}>Зарегистрировать</button>
            </div>

            <br />
            <Link className={classes.lnk} to={LOGIN_ROUTE} onClick={() => logOut()}>Выйти</Link>
        </div>
    );
})

export default Admin;