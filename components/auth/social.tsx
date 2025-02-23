'use client'

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa6";
import { Button } from "../ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social =() => {
    const onClick = (provider: 'google' | 'facebook') => {
        signIn(provider, {
            callbackUrl:DEFAULT_LOGIN_REDIRECT,
        });
    }


    return(
        <div className="flex items-center w-full gap-2 ">
            {/* size and variant are specially defined for OAuth buttons*/}
                <Button
                size='oauth'
                className="w-full"
                variant='oauth'
                onClick={()=>{onClick('google')}}
                >
                    <FcGoogle className="h-6 w-6"/>
                </Button>
                <Button
                size='oauth'
                className="w-full text-blue-600 hover:text-blue-600" 
                variant='oauth'
                onClick={()=>{onClick('facebook')}}
                >
                    <FaFacebook className="h-8 w-8"/>
                </Button>
        </div>
    )
}