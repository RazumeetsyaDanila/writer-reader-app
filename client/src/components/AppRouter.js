import React, { useContext } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { Context } from '..';
import { LOGIN_ROUTE } from '../utils/consts';
import { readerRoutes, adminRoutes, writerRoutes, publicRoutes } from './../routes';
import { routes_arr } from './../utils/consts'
import { observer } from 'mobx-react-lite';


const AppRouter = observer(() => {
    const {user} = useContext(Context)

    // костыль для проверки корректности текущего url, чтобы при некорректном перенаправлялось на страницу логина
    let checkPath = false
    let current_path = window.location.href.replace(process.env.REACT_APP_URL, '')
    if(routes_arr.indexOf(current_path) !== -1) checkPath = true

    return (
        <Routes>
            {user.isAuth && user.user.role === 'READER' && readerRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} exact/>
            )}

            {user.isAuth && user.user.role === 'WRITER' && writerRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} exact/>
            )}

            {user.isAuth && user.user.role === 'ADMIN' && adminRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} exact/>
            )}

            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} exact/>
            )}

            {!checkPath && <Route path="*" element={<Navigate to ={LOGIN_ROUTE} />}/>}
            
        </Routes>
    );
})

export default AppRouter;
