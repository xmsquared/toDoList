import React from "react";
import { RegisterModal } from "../../components/user/registerModal";
import { LoginModal } from "../../components/user/loginModal";
import { ProfileModal } from "../../components/user/profileModal";

export const LandingPage: React.FC = () => {
    return(
        <React.Fragment>
            <RegisterModal />
            <LoginModal />
            <ProfileModal />
        </React.Fragment>
    )
}