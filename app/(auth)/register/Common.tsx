"use client";

import RegisterForm from "./register/RegisterForm";
import OTPForm from "./otp/OTPForm";
import { useState } from "react";

// need to rename
const Common = () => {

    const [ email, setEmail ] = useState("");

    return (
        email ? <OTPForm email={email} /> : <RegisterForm setEmail={setEmail} />
    );
};

export default Common;