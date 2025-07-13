"use client"

import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { InputAuth } from '@/components/ui/input-auth';
import { useState, useTransition } from 'react';

import { 
    Form,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
    FormControl,
 } from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper"
import { register } from '@/action/register';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { Button } from '@/components/ui/button';

export const RegisterForm = () => {
    const[error, setError] = useState<string | undefined>("");
    const[success, setSuccess] = useState<string | undefined>("");
    const[isPending, startTransition] = useTransition();
    const[showTwoFactor, setShowTwoFactor] = useState<boolean>(false);


    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        })
    }
    
    return(
        <CardWrapper
        headerTitle="CREATE ACCOUNT"
        headerLabel="Please register below to create an account"
        backButtonHref="/login"
        backButtonLabel="Already have an account"
        showSocial
        >
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit((onSubmit))}
                className="space-y-6"
                    >
                        <div className="space-y-4">
                            
                            <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-xs text-slate-800'>Name</FormLabel>
                                    <FormControl>
                                        <InputAuth
                                        type="string"
                                        {...field}
                                        disabled={isPending}
                                        className=""
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-xs text-slate-800'>Your Email Address</FormLabel>
                                    <FormControl>
                                        <InputAuth
                                        type="email"
                                        {...field}
                                        disabled={isPending}
                                        className=""
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-xs text-slate-800'>Your Password</FormLabel>
                                    <FormControl>
                                        <InputAuth
                                        type="password"
                                        {...field}
                                        disabled={isPending}
                                        className=""
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                        </div>
                        <FormError message={error || ''}/>
                        <FormSuccess message={success || ''}/>
                        <Button
                        variant={"auth"}
                        disabled={isPending}
                        type='submit'
                        className="w-full"
                        >{showTwoFactor?"Confirm":"Register"}</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}