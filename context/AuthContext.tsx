"use client";

import { createContext } from "react";


export const AuthContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>] | null>(null);