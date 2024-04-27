"use client";

import RegisterForm from "./register/RegisterForm";
import OTPForm from "./otp/OTPForm";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

// need to rename
const Common = () => {

    const [ email, setEmail ] = useContext(AuthContext)!;

    return (
        email ? <OTPForm /> : <RegisterForm />
    );
};

export default Common;