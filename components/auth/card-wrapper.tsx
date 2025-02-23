"use client"

import { 
    Card,
    CardFooter,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription
 } from "@/components/ui/card";
import { BackButton } from "@/components/auth/back-button";
import { Social } from "@/components/auth/social";

interface CardWrapperProps {
    children: React.ReactNode;
    headerTitle: string;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
};

export const CardWrapper = ({
    children,
    headerTitle,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
}: CardWrapperProps) => {
    return(
        <Card variant="noShadow" className="w-[550px] gap-4">
            <CardHeader className="items-center text-xl font-extrabold">
                {headerTitle}
            </CardHeader>
            <CardDescription className="items-center text-center text-sm justify-center space-y-4">
                    {headerLabel}
            </CardDescription>
            <CardContent>
                {children}
                {showSocial && 
                <div className="">
                    <div className="flex items-center justify-center my-4 flex-1">
                        <hr className="flex-grow border-slate-300"/>
                        <span className="mx-2 text-sm text-slate-400">
                            Or continue with
                        </span>
                        <hr className="flex-grow border-slate-300"/>
                    </div>
                        <Social/>
                </div>
                    }
            <CardFooter>
                <BackButton
                label={backButtonLabel}
                href={backButtonHref}
                />
            </CardFooter>
            </CardContent>
            
        </Card>
    )
}