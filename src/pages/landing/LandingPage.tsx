import React, { useState, useEffect } from "react";

import { useTokenContext } from '../../context/';

import { LoginModal } from "../../components/user/";
import { ProfileModal } from "../../components/user/";

export const LandingPage: React.FC = () => {
    const {token} = useTokenContext();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        if(token !== ''){
            setLoggedIn(true)
        }
    }, [token])

    return(
        <React.Fragment>
            {loggedIn ? (
                <ProfileModal />
            ):(
                <LoginModal />
            )}
           
            
            
        </React.Fragment>
    )
}