import React from 'react';
import { useContext, useState } from 'react';
import { LOGIN_ROUTE } from '../../utils/consts';
import { Context } from './../../index';
import { Link } from 'react-router-dom';
import classes from './admin.module.css'
import { observer } from 'mobx-react-lite';
import { get_users, admin_registration, delete_user } from './../../http/adminAPI';
// import { useEffect } from 'react';
import Modal from '../../components/UI/modal/modal';
import deleteUser from '../../img/del-btn(min).png';


const Admin = observer(() => {
    const { user } = useContext(Context)
    const userLogin = user.user.login

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('READER')
    const [users, setUsers] = useState([])

    const [modal, setModal] = useState(false)


    // useEffect(() => {
    //     get_users().then(data => setUsers(data))
    // }, [])

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    const getUsersList = async () => {
        await get_users().then(data => setUsers(data))
        setModal(true)
    }

    const userDelete = async (lgn) => {
        await delete_user(lgn).then(data => alert(data.message))
        setModal(false)
    }

    // попытка использовать замыкание
    // const userDelete = async (lgn) => {
    //     return async function() {
    //         await delete_user(lgn).then(data => alert(data.message))
    //         setModal(false)
    //     }        
    // }

    const click = async () => {
        try {
            await admin_registration(login, password, role)
            setLogin('')
            setPassword('')
            alert("Новый пользователь успешно зарегистрирован!")
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className={classes.container}>
            <p className={classes.roleLabel}>{userLogin}</p>
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
                <button className={classes.btn} onClick={getUsersList}>Пользователи</button>
            </div>

            <Link className={classes.lnk} to={LOGIN_ROUTE} onClick={() => logOut()}>Выйти</Link>

            <Modal visible={modal} setVisible={setModal}>
                <p>Список пользователей:</p>
                {users.map(user => <div className={classes.userString} key={user.login}> Логин: {user.login}, Роль: {user.role}
                    {
                        user.login !== 'admin' && user.login !== 'reader' && user.login !== 'writer' &&
                        <img src={deleteUser} alt="" className={classes.deleteImg} onClick={userDelete.bind(this, user.login)} />}</div>)
                    // <button onClick={userDelete(user.login)}>Удалить</button>}</p>) // попытка использовать замыкание
                }
                <button className={classes.btn} onClick={() => setModal(false)}>ОК</button>
            </Modal>
        </div>
    );
})

export default Admin;