'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Mock credentials
  const mockCredentials: { [key: string]: { password: string; role: string } } = {
    admin: { password: 'admin123', role: 'admin' },
    user: { password: 'user123', role: 'user' },
    manager: { password: 'manager123', role: 'manager' }
  };

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    if (mockCredentials[username] && mockCredentials[username].password === password) {
      const userRole = mockCredentials[username].role;
      
      // Store user info (in real app, this would be JWT token or session)
      localStorage.setItem('user', JSON.stringify({
        username,
        role: userRole,
        isAuthenticated: true
      }));

      // Redirect based on role
      if (userRole === 'admin') {
        router.push('/dashboard/admin');
      } else if (userRole === 'manager') {
        router.push('/dashboard/manager');
      } else {
        router.push('/dashboard/user');
      }
    } else {
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-50'>
      <Card className='w-96 shadow-lg'>
        <CardHeader className='text-center'>
          <CardTitle className='p-0 text-2xl'>
            Login
          </CardTitle>
          <CardDescription>
            <p>Please enter your username and password to login.</p>
            <LogIn className='mx-auto my-6' size={32} />
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent>
            {error && (
              <div className="flex items-center gap-2 p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <Label htmlFor='username' className='text-start w-full text-sm font-semibold'>
                Username
              </Label>
              <Input 
                id='username'
                type='text' 
                placeholder='Username' 
                className='mb-3 mt-1 p-3'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor='password' className='text-start w-full text-sm font-semibold'>
                Password
              </Label>
              <Input 
                id='password'
                type='password' 
                placeholder='Password' 
                className='mb-3 mt-1 p-3'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
          </CardContent>
          
          <CardFooter className='mt-5'>
            <Button 
              type="submit"
              className='bg-blue-500 hover:bg-blue-600 w-full m-auto p-3 font-semibold'
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Dashboard;