"use client"

import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { InputAuth } from '@/components/ui/input-auth';
import { useState } from 'react';
import { FormError } from '@/components/FormError';
import { Button } from '@/components/ui/button';
import { FormSuccess } from '@/components/FormSuccess';

import { 
    Form,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
    FormControl,
 } from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper"
import { login } from '@/action/login';

export const LoginForm = () => {
    const[error, setError] = useState<string | undefined>("");
    const[success, setSuccess] = useState<string | undefined>("");
    const[isPending, startTransition] = useState<boolean>(false);
    const[showTwoFactor, setShowTwoFactor] = useState<boolean>(false);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        login(values);
    };

    return(
        <CardWrapper
        headerTitle="LOGIN"
        headerLabel="Please login below"
        backButtonHref="/auth/register"
        backButtonLabel="Don't have an account"
        showSocial
        >
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                    >
                        <div className="space-y-4">
                            {/*  */}
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
                                        className=""
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                        </div>
                        <FormError message={error || ''}/>
                <FormSuccess message={success || ''} />
                <Button
                variant={"auth"}
                disabled={isPending}
                type='submit'
                className='w-full'
                >{showTwoFactor?"Confirm":"Login"}
                </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}