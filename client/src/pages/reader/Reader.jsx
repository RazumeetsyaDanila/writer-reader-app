import React from 'react';
import { observer } from 'mobx-react-lite';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../index';
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from './../../utils/consts';
import classes from './reader.module.css'
import { get_all_messages } from '../../http/readerAPI';

const Reader = observer(() => {
    const {user} = useContext(Context)
    const Login = user.user.login

    const [messages, setMessages] = useState([])

    useEffect(() => {
        getAllMessages()
    }, [])

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    const getAllMessages = async () => {
        try {            
            await get_all_messages().then(data => setMessages(data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    

    return (
        <div className={classes.container}>
            <p className={classes.roleLabel}>{Login}</p>
            <div className={classes.fieldset}>
                <p className={classes.funcLabel}>Все сообщения:</p>
                {
                    messages.map(message => <div key={message.message_id}>Текст: {message.message_text} Логин: {message.login}</div>)
                }
            </div>

            <Link className={classes.lnk} to={LOGIN_ROUTE} onClick={() => logOut()}>Выйти</Link>
        </div>
    );
})

export default Reader;