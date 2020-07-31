
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import {firebase} from '../firebase/firebase-config';
import { login } from '../actions/auth';
export const AppRouter = () => {

    const dispatch = useDispatch();
    
    const [checking, setchecking] = useState(true);
    
    const [isLoggEdIn, setisLoggEdIn] = useState(false)

    useEffect(() => {

        //obervable
        firebase.auth().onAuthStateChanged((user)=>{
         if (user?.uid) { //si existe uid
             dispatch(login(user.uid,user.displayName))
             setisLoggEdIn(true)
         }
         else{
            setisLoggEdIn(false)

         }

         setchecking(false)

 
        })
    }, [dispatch,setchecking,setisLoggEdIn])

    if (checking) {
        return(
            <h1> Espere... </h1>
        )
        
    }

    return (
        <Router>
            <div>
                <Switch>
                    <Route 
                      path="/auth"
                      component={AuthRouter}
                    />

                    <Route
                       exact
                       path="/"
                       component={JournalScreen}
                    />  

                    <Redirect to="/auth/login"/>
     
                </Switch>
            </div>            
        </Router>
    )
}
