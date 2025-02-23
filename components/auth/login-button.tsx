"use client";

import { useRouter } from "next/navigation";
interface LoginButtonProps {
    children: React.ReactNode;
    mode?:'model'|'redirect',
    asChild?:boolean;
};

export const LoginButton = ({
    children,
    mode = 'redirect',
    asChild,
}:LoginButtonProps) => {

    const router = useRouter();
//login route
    const onClick = () => {
        router.push('auth/login');
    }

    if (mode === 'model') {
        return(
            <span>
                todo: implement
            </span>
        )
    }
    return(
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}