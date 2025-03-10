import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import React from 'react'

const SearchBar = () => {
  return (
    <div className="flex items-center space-x-2">
      <Input type="text" className="px-3 py-2 w-40 rounded-none" placeholder="Search..." />
      <Button className="px-3 py-2 rounded-none">
        <SearchIcon />
      </Button>
    </div>
  )
}

export default SearchBar;