import { ProfileProvider } from "@/components/providers/profile-provider";
import LoginForm from "./LoginForm";


const LoginPage = () => {
    return (
        <ProfileProvider>
            <LoginForm />
        </ProfileProvider>
    );
};
 
export default LoginPage;