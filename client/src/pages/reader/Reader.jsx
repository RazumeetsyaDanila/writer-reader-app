import React from 'react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../index';
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from './../../utils/consts';
import classes from '../../pages/auth/auth.module.css'

const Reader = observer(() => {
    const {user} = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <div>
            READER
            <br/>
            <Link className={classes.lnk} to={LOGIN_ROUTE} onClick={() => logOut()}>Выйти</Link>
        </div>
    );
})

export default Reader;