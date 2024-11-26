import Link from "next/link";
import React from "react";

const HeroSection = () => {
    return (
        <section className="flex flex-col items-center justify-center py-16 bg-blue-500 text-white min-h-screen">
            <h1 className="text-4xl font-bold">Bem-vindo ao Nosso Produto</h1>
            <p className="text-xl mt-4">
                Solução inovadora para o seu problema
            </p>
            <Link
                href={"/auth"}
                className="mt-6 px-6 py-2 bg-white text-blue-500 font-semibold rounded-lg"
            >
                Go to App
            </Link>
        </section>
    );
};

export default HeroSection;
