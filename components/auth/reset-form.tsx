'use client'
import*as z from 'zod';

import { useState, useTransition } from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { ResetSchema } from '@/schemas';
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage} from '@/components/ui/form';
import { CardWrapper } from "./card-wrapper";
import {Input} from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {FormError} from '@/components/FormError';
import {FormSuccess} from '@/components/FormSuccess';
import { reset } from '@/action/reset';


export const ResetForm = () => {

    const[error, setError] = useState<string | undefined>("");
    const[success, setSuccess] = useState<string | undefined>("");
    const[isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues:{
            email:'',
        },
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError('');
        setSuccess('');

        console.log(values);

        startTransition(() => {
            reset(values)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            })
        });
    };
    return(
        <CardWrapper
        headerLabel="Forgot your password!"
        backButtonlabel="Back to login"
        backButtonHref="/login"
        >
            <Form{...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
            >
                <div className='space-y-4'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                disabled={isPending}
                                placeholder='jhondoe@gmail.com'
                                type="email"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    >
                    </FormField>
                
                </div>
                <FormError message={error}/>
                <FormSuccess message={success} />
                <Button
                disabled={isPending}
                type='submit'
                className='w-full'
                >Send reset email
                </Button>
            </form>
            </Form>
        </CardWrapper>
    )
}