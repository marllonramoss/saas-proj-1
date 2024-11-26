import React from "react";

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    );
};

export default PageLayout;
