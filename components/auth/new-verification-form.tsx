'use client'

import { CardWrapper } from "./card-wrapper";
import {ScaleLoader} from 'react-spinners';
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import {FormError} from '@/components/form-error';
import {FormSuccess} from '@/components/form-success';


export const NewVerificationForm = () => {
    const [error, setError] = useState<string|undefined>();
    const [success, setSuccess] = useState<string|undefined>();
    const searchParams = useSearchParams();

    const token = searchParams.get('token');

    const onSubmit = useCallback(() => {
        if (success || error) return;
        if (!token){
            setError('Missing token!');
         return; 
}
        newVerification(token)
        .then((data) =>{
            setSuccess(data.success);
            setError(data.error);
        })
        .catch(()=>{
            setError('Something went wrong!')
        })
    },[token, success, error])

    useEffect(()=>{
        onSubmit();
    },[onSubmit]);
    
    return ( 
        <CardWrapper
            headerLabel='Confirming your verification'
            backButtonHref="/login"
            backButtonlabel="Back to login"
            >
                <div className="flex flex-col items-center w-full justify-center">
                    {!success && !error && (
                        <ScaleLoader/>
                    )}
                    {!success &&(
                    <FormSuccess message={success}/>
                    )}
                    <FormError message={error}/>
                </div>
        </CardWrapper>
    );
}