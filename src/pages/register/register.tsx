import React from "react";
import { RegisterModal } from "../../components/user/";
import { useTokenContext } from "../../context";

export const RegisterPage: React.FC = () =>{
    const {token} = useTokenContext();
    
    if(token !== null){
        window.location.href = "/";
    }

    return(
        <RegisterModal />
    )
}