import React, { useState } from 'react';
import { messages_update } from '../../../http/writerAPI';
import classes from './input.module.css'

const InputDel = (props) => {

    const {message_id, f_modal }= props

    const [text, setText] = useState('')

    const updateMessage = async () => {
        try {
            await messages_update(message_id, text)
            setText('')
            f_modal()
            alert("Сообщение id:" + message_id + " изменено!")
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className={classes.container}>
            <input className={classes.input} type="text" placeholder='Изменить сообщение...' value={text} onChange={e => setText(e.target.value)}/>
            <button className={classes.btn} onClick={updateMessage}>ОК</button>
        </div>
    );
};

export default InputDel;