import { type ReactNode } from "react"

type ButtonProps = {
    children: ReactNode;
    variant?: "primary" | "danger";
};

export const Button = ({
    children,
    variant = "primary",
}: ButtonProps) => {
    const variantStyle = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };

    return (
        <button className={`py-1.5 px-2.5 rounded ${variantStyle[variant]}`}>
            {children}
        </button>
    );
};
