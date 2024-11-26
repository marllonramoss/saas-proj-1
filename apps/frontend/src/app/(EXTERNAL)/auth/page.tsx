import LoginRegisterForm from "@/components/auth/LoginRegisterForm";
import React from "react";

const authPage = () => {
    return (
        <div className="bg-zinc-600 min-h-screen flex justify-center items-center">
            <LoginRegisterForm />
        </div>
    );
};

export default authPage;
