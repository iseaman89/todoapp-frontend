import React from 'react';
import LoginForm from "../components/auth/LoginForm.jsx";
import RegisterForm from "../components/auth/RegisterForm.jsx";

const AuthContainer = () => {
    const [showRegister, setShowRegister] = React.useState(false);

    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 h-screen w-screen">
            <h1
                className="text-5xl font-bold bg-clip-text text-transparent animate-gradient mt--10"
                style={{
                    backgroundImage: 'var(--color-progress)',
                    backgroundSize: '200% 200%', 
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
            }}
            >
                ToDo or not ToDo
            </h1>
            <h3 className="text-lg text-text-sub mb-10">
                To be, or not to be productive? That is the question!
            </h3>
            <div className="container h-2/3 w-3/4 md:w-1/2 md:h-1/2 lg:w-100 xl:w-120 overflow-x-hidden">
                <LoginForm 
                    showRegister={showRegister} 
                    setShowRegister={setShowRegister} 
                />
                <RegisterForm 
                    showRegister={showRegister} 
                    setShowRegister={setShowRegister} 
                />
            </div>

        </div>
    );
};

export default AuthContainer;