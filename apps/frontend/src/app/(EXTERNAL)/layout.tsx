import PageLayout from "@/components/template/PageLayout";
import React from "react";

interface layoutProps {
    children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
    return <PageLayout>{children}</PageLayout>;
};

export default layout;
