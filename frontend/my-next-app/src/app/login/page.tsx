import LoginForm from './loginform';

export default function LoginPage() {
    return (
        <div>
            <div>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Login to your account
                </h2>
                <LoginForm />
            </div>
        </div>
    );
}
