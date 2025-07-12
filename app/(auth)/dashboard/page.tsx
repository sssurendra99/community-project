'use client'
import { UserInfo } from "@/components/UserInfo";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
    const user = useCurrentUser();
    return ( 
        <UserInfo
        user={user}
        label="Client Componenets"
        />
     );
}
 
export default ClientPage;



// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { LogIn } from 'lucide-react';
// import React from 'react'

// const Dashboard = () => {
//   return (
//     <div className='w-full h-screen flex justify-center items-center'>
//       <Card className='w-96 '>
//         <CardHeader className='text-center'>
//           <CardTitle className='p-0 text-2xl'>
//             Login
//           </CardTitle>
//           <CardDescription>
//             <p>Please enter your username and password to login.</p>
//             <LogIn className='mx-auto my-6'/>
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div>
//             <Label htmlFor='username' className='text-start w-full text-sm font-semibold'>Username</Label>
//             <Input type='text' placeholder='Username' className='mb-3 mt-1 p-3'/>
//           </div>
//           <div>
//             <Label htmlFor='password' className='text-start w-full text-sm font-semibold' >Password</Label>
//             <Input type='password' placeholder='Password' className='mb-3 mt-1 p-3'/>
//           </div>   
//         </CardContent>
//         <CardFooter className='mt-5'>
//           <Button className='bg-blue-500 w-full m-auto p-3 font-semibold'>Login</Button>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

// export default Dashboard;


