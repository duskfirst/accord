"use client";

import { RegisterSchema } from "./RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserClient } from "@/utils/supabase/client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormRootError,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";

import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    User,
    LoaderCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { register } from "./register";


const RegisterForm = ({ emailValue, setEmailValue, setIsValidEmail } : {
    emailValue: string,
    setEmailValue: React.Dispatch<React.SetStateAction<string>>,
    setIsValidEmail: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
    
    const form = useForm<RegisterSchema>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onChange",
        reValidateMode: "onSubmit",
    });
    const {
        clearErrors,
        control,
        formState,
        getFieldState,
        handleSubmit,
        setError,
        setValue,
        trigger,
    } = form;

    const [usernameValue, setUsernameValue] = useState("");
    const [errorFlag, setErrorFlag] = useState(false);
    const errorFlagRef = useRef(errorFlag);

    const supabase = createBrowserClient();

    const usernameState = getFieldState("username", formState);
    const emailState = getFieldState("email", formState);
    const passwordState = getFieldState("password", formState);
    const { isSubmitting } = formState;

    const usernameStateRef = useRef(usernameState);
    const emailStateRef = useRef(emailState);

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(show => !show);
    };

    const onSubmit = async (values: RegisterSchema) => {

        // emailState and usernameState are always valid by the time this function is run
        // email and username errors are cleared so we need to check again
        await validateEmail();
        await validateUsername();

        // email or username are taken so do not signup
        if (errorFlagRef.current) {
            errorFlagRef.current = false;
            return;
        }

        const error = await register(values);
        
        if (error) {
            setError("root", { message: error });
        } else {
            setIsValidEmail(true);
        }
    };

    const debounceUsername = useDebounceCallback(setUsernameValue, 500);
    const debounceEmail = useDebounceCallback(setEmailValue, 500);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        fieldName: keyof RegisterSchema,
    ) => {

        const { value } = event.target;

        if (fieldName == "username") {
            setValue(fieldName, value, { shouldDirty: true, shouldValidate: false });
            debounceUsername(value);
        }
        if (fieldName == "email") {
            setValue(fieldName, value, { shouldDirty: true, shouldValidate: false });
            debounceEmail(value);
        }
        if (fieldName == "password") {
            setValue(fieldName, value, { shouldDirty: true, shouldValidate: true });
        }

    };

    const validateUsername = async () => {
        await trigger("username");
        if (usernameStateRef.current.invalid) {
            setErrorFlag(errorFlagRef.current = true);
            return;
        }
        const {
            data, error
        } = await supabase
            .from("profiles")
            .select("username")
            .eq("username", usernameValue)
            .limit(1);
        if (error) {
            setError("username", error);
            setErrorFlag(errorFlagRef.current = true);
        } else if (data.length) {
            setError("username", { message: "Username is taken." });
            setErrorFlag(errorFlagRef.current = true);
        }
    };

    const validateEmail = async () => {
        await trigger("email");
        if (emailStateRef.current.invalid) {
            setErrorFlag(errorFlagRef.current = true);
            return;
        }
        const {
            data, error
        } = await supabase
            .from("profiles")
            .select("email")
            .eq("email", emailValue)
            .limit(1);
        if (error) {
            setError("email", error);
            setErrorFlag(errorFlagRef.current = true);
        } else if (data.length) {
            setError("email", { message: "This email is already in use." });
            setErrorFlag(() => errorFlagRef.current = true);
        }
    };

    useEffect(() => {
        if (emailValue)
            validateEmail();
        else
            clearErrors("email");
    }, [emailValue]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (usernameValue)
            validateUsername();
        else
            clearErrors("username");
    }, [usernameValue]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <div className="relative flex items-center">
                                    <Mail size={18} className={
                                        cn("absolute left-2", emailState.isDirty && !emailState.isValidating && (emailState.invalid ? "text-destructive" : "text-success"))
                                    } />
                                    <Input placeholder="email address" {...field} type="email" className="px-8" onChange={event => handleChange(event, field.name)} />
                                </div>
                            </FormControl>
                            <FormDescription>
                                Enter your email address
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <div className="relative flex items-center">
                                    <User size={18} className={
                                        cn("absolute left-2", usernameState.isDirty && (usernameState.invalid ? "text-destructive" : "text-success"))
                                    } />
                                    <Input placeholder="username" {...field} className="px-8" onChange={event => handleChange(event, field.name)} />
                                </div>
                            </FormControl>
                            <FormDescription>
                                Pick a unique username
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative flex items-center">
                                    <Lock size={18} className={
                                        cn("absolute left-2", passwordState.isDirty && (passwordState.invalid ? "text-destructive" : "text-success"))
                                    } />
                                    <Input placeholder="password" {...field} type={showPassword ? "text" : "password"} className="px-8 min-w-72" onChange={event => handleChange(event, field.name)} />
                                    {/* changing this to button instead of span will trigger form submission on click */}
                                    <span className="absolute right-2 select-none cursor-pointer" onClick={toggleShowPassword}>
                                        {
                                            showPassword 
                                                ? <EyeOff size={18}/>
                                                : <Eye size={18}/>
                                        }
                                    </span>
                                </div>
                            </FormControl>
                            <FormDescription>
                                Enter a secure password
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormRootError/>
                <Button className="min-w-24" disabled={isSubmitting} type="submit">
                    {
                        isSubmitting
                            ? <LoaderCircle size={18} className='animate-spin'/>
                            : "Submit"
                    }
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;