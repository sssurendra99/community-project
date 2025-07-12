'use client'

import * as z from 'zod';
import {useForm} from 'react-hook-form';
import { useTransition, useState } from "react";
import { SettingsShema } from '@/schemas';
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import { settings } from "@/action/settings";
import { useSession } from "next-auth/react";
import { Form, FormField, FormLabel, FormControl, FormItem, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { Switch } from '@/components/ui/switch';

import { Card,
    CardHeader,
    CardContent,
 } from "@/components/ui/card";
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@prisma/client';


const SettingsPage = () => {
    const user = useCurrentUser();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const{update} = useSession()
    const[isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SettingsShema>>({
        resolver: zodResolver(SettingsShema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            password: undefined,
            newPassword: undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
        }
    });
    
    const onclick = (values: z.infer<typeof SettingsShema>) => {
        startTransition(() => {
        settings(values)
        .then((data)=>{
            if (data.error) {
                setError(data.error)
            }
            if (data.success) {
                update();
                setSuccess(data.success)
            }
        })
        .catch(() => setError("something went wrong!"))
    })
    }
    return ( 
        <Card className="w-[600px] mr-4">
            <CardHeader>
                <p>
                    Settings
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className='space-y-6'
                    onSubmit={form.handleSubmit(onclick)}
                    >
                        <div className='space-y-4'>
                            <FormField
                            control={form.control}
                            name='name'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                        <FormControl>
                                            <Input
                                            {...field}
                                            placeholder='Jhon Doe'
                                            disabled={isPending}
                                            />
                                        </FormControl>
                                </FormItem>
                            )}
                            >
                            </FormField>
                            <FormField
                            control={form.control}
                            name='email'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Email
                                    </FormLabel>
                                        <FormControl>
                                            <Input
                                            {...field}
                                            placeholder='jhondoe@gmail.com'
                                            disabled={isPending}
                                            />
                                        </FormControl>
                                </FormItem>
                            )}
                            >
                            </FormField>
                            <FormField
                            control={form.control}
                            name='password'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                        <FormControl>
                                            <Input
                                            {...field}
                                            placeholder='******'
                                            disabled={isPending}
                                            />
                                        </FormControl>
                                </FormItem>
                            )}
                            >
                            </FormField>
                            <FormField
                            control={form.control}
                            name='newPassword'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        New password
                                    </FormLabel>
                                        <FormControl>
                                            <Input
                                            {...field}
                                            placeholder='******'
                                            disabled={isPending}
                                            />
                                        </FormControl>
                                </FormItem>
                            )}
                            >
                            </FormField>
                            <FormField
                            control={form.control}
                            name='isTwoFactorEnabled'
                            render={({field}) => (
                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                                    <div className="space-y-1">
                                        <FormLabel>
                                            Two Factor Authentication
                                        </FormLabel>
                                            <FormDescription>
                                                Enable two factor authentication
                                            </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                        disabled={isPending}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                            >
                            </FormField>
                            {/* hide unnessesory data from OAuth people */}
                            {user?.isOAuth === false &&(
                                <>
                            <FormField 
                            control={form.control}
                            name='role'
                            render={({field}) => (
                                <FormItem className=''>
                                    <FormLabel>
                                        Role
                                    </FormLabel>
                                        <Select
                                        disabled={isPending}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role"/> 
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={UserRole.ADMIN}>
                                                    Admin
                                                </SelectItem>
                                                <SelectItem value={UserRole.CUSTOMER}>
                                                    CUSTOMER
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        </FormItem>
                            )}
                            >
                            </FormField>
                            </>
                            )}
                            <Button type='submit'>
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
     );
}
 
export default SettingsPage;

