"use client";

import { AuthContext } from "@/context/AuthContext";
import { useState } from "react";


const Auth = ({ children } : {
    children: React.ReactNode
}) => {

    const emailState = useState("");

    return (
        <AuthContext.Provider value={emailState}>
            { children }
        </AuthContext.Provider>
    );

};

export default Auth;