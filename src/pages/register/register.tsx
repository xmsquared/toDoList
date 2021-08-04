import React from "react";
import { RegisterModal } from "../../components/user/";
import { useTokenContext } from "../../context";
import { redirectToHome } from "../../utils";

export const RegisterPage: React.FC = () =>{
    const {token} = useTokenContext();
    
    if(token !== null){
        redirectToHome();
    }

    return(
        <RegisterModal />
    )
}