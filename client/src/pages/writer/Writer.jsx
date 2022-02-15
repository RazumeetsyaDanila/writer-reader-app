import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
import { Context } from './../../index';
import classes from '../../pages/auth/auth.module.css'

const Writer = () => {
    const {user} = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <div>
            WRITER
            <br/>
            <Link className={classes.lnk} to={LOGIN_ROUTE} onClick={() => logOut()}>Выйти</Link>
        </div>
    );
};

export default Writer;