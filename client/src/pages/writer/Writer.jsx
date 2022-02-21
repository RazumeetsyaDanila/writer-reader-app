import React from 'react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
import { Context } from './../../index';
import classes from './writer.module.css'
import { message_create, messages_get, messages_delete } from './../../http/writerAPI';
import Modal from './../../components/UI/modal/modal';
import deleteImg from '../../img/del-btn(min).png';
import { observer } from 'mobx-react-lite';

const Writer = observer(() => {
    const { user } = useContext(Context)
    const userId = user.user.user_id
    const Login = user.user.login

    const [message, setMessage] = useState('')
    const [modal, setModal] = useState('')
    const [messages, setMessages] = useState([])


    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    const sendMessage = async () => {
        try {
            await message_create(message, userId)
            setMessage('')
            alert("Сообщение отправлено!")
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const getMessages = async () => {
        try {
            await messages_get(userId).then(data => setMessages(data))
            setModal(true)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const deleteMessage = async (message_id) => {
        try {
            await messages_delete(message_id)
            setModal(false)
            console.log(message_id)
            alert("Сообщение id:" + message_id + " удалено!")
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className={classes.container}>
            <p className={classes.roleLabel}>{Login}</p>
            <div className={classes.fieldset}>
                <p className={classes.funcLabel}>Добавление нового сообщения</p>
                <textarea className={classes.input} placeholder='Введите сообщение...' value={message} onChange={e => setMessage(e.target.value)} /><br />
                <button className={classes.btn} onClick={sendMessage}>Отправить</button>
                <button className={classes.btn} onClick={getMessages}>Мои сообщения</button>
            </div>

            <Link className={classes.lnk} to={LOGIN_ROUTE} onClick={() => logOut()}>Выйти</Link>

            <Modal visible={modal} setVisible={setModal}>
                <p>Мои сообщения:</p>
                {
                    messages.map(message => <div className={classes.messageString} key={message.message_id}> Сообщение: {message.message_text}
                        <img src={deleteImg} alt="" className={classes.deleteImg} onClick={deleteMessage.bind(this, message.message_id)} />
                    </div>)
                }
                <button className={classes.btn} onClick={() => setModal(false)}>ОК</button>
            </Modal>
        </div>
    );
});

export default Writer;