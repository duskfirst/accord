import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff, Lock } from "lucide-react";


export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export interface IconInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    pfx?: React.ReactNode;
    sfx?: React.ReactNode;
}

export const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
    ({ className, type, pfx, sfx, ...props }, ref) => {
        return (
            <div className="relative flex items-center">
                <div className={cn("absolute left-2", pfx ? "" : "")}>
                    { pfx }
                </div>
                <Input ref={ref} {...props} type={type} className={cn("px-8 min-w-72", className)} />
                <div className={cn("absolute right-2", sfx ? "" : "")}>
                    { sfx }
                </div>
            </div>
        );
    });
IconInput.displayName = "Icon Input";

export interface PasswordInputProps
    extends InputProps {
    pfxClassname: any;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, pfxClassname = "", ...props }, ref) => {

        const [showPassword, setShowPassword] = React.useState(false);
        const toggleShowPassword = () => {
            setShowPassword(show => !show);
        };

        return (
            <IconInput {...props} ref={ref}
                pfx={<Lock size={18} className={pfxClassname} />}
                sfx={<span className="cursor-pointer select-none" onClick={toggleShowPassword}> {
                    showPassword ? <EyeOff size={18} /> : <Eye size={18} />
                } </span>}
                type={showPassword ? "text" : "password"} placeholder="password"
            />
        );
    });
PasswordInput.displayName = "Password Input";