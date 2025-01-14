import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react'

const EmailSubmission = () => {
  return (
    <div className="flex items-center space-x-2 my-4">
      <Input type="email" className="px-3 py-2 w-full rounded-none" placeholder="enter your email address" />
      <Button className="px-3 py-2 font-bold border bg-white text-black rounded-none">SUBMIT</Button>
    </div>
  )
}

export default EmailSubmission;