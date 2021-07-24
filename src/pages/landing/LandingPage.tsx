import React from "react";
import { useState, useEffect } from "react";

import { useTokenContext } from '../../App';

import { LoginModal } from "../../components/user/loginModal";
import { ProfileModal } from "../../components/user/profileModal";

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