import { createServerClient } from '@/utils/supabase/server';
import RegisterForm from './RegisterForm';
import { redirect } from 'next/navigation';

const RegisterPage = async () => {
    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        return redirect('/');
    }
    return (
        <RegisterForm />
    );
}

export default RegisterPage;