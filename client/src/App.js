import React, {useEffect, useContext} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter"
import './app.css'
import { observer } from 'mobx-react-lite';
import {check} from "./http/userAPI";
import {Context} from "./index";


const App = observer(() => {

  const {user} = useContext(Context)

  useEffect(() => {
    check().then(data => {
        user.setUser(data)
        user.setIsAuth(true)
    })
}, [user])

  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
})

export default App;





