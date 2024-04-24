"use client";

import RegisterForm from "./register/RegisterForm";
import OTPForm from "./otp/OTPForm";
import { useState } from "react";

// need to rename
const Common = () => {

    const [emailValue, setEmailValue] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);

    return (
        isValidEmail && emailValue ? <OTPForm email={emailValue} />
            : <RegisterForm  emailValue={emailValue} setEmailValue={setEmailValue} setIsValidEmail={setIsValidEmail} />
    );
};

export default Common;