import type { ReactNode } from "react";

type PageHeaderProps = {
    title: string;
    children?: ReactNode;
};

export const PageHeader = ({
    title,
    children,
}: PageHeaderProps) => {
    return (
        <div className="h-16 p-5 border-b flex items-center justify-between">
            <h1 className="text-3xl font-bold">{title}</h1>

            {children}
        </div>
    );
};
