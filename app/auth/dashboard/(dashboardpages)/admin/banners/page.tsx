'use client'

import React, { useState } from 'react';
import { Trash2, Edit, Plus, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const BannerManagement = () => {
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: 'Summer Sale',
      image: '/api/placeholder/1200/400',
      active: true,
      startDate: '2025-01-20',
      endDate: '2025-02-20'
    },
    {
      id: 2,
      title: 'New Collection',
      image: '/api/placeholder/1200/400',
      active: false,
      startDate: '2025-02-21',
      endDate: '2025-03-21'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const BannerForm = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{editingBanner ? 'Edit Banner' : 'Add New Banner'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Enter banner title"
              defaultValue={editingBanner?.title}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Banner Image</label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-2">
                <Button variant="outline" size="sm">Upload Image</Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Recommended size: 1200x400px</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                defaultValue={editingBanner?.startDate}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                defaultValue={editingBanner?.endDate}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowForm(false);
                setEditingBanner(null);
              }}
            >
              Cancel
            </Button>
            <Button>Save Banner</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Banner Management</h1>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Banner
          </Button>
        )}
      </div>

      {showForm && <BannerForm />}

      <div className="grid gap-4">
        {banners.map((banner) => (
          <Card key={banner.id}>
            <CardContent className="p-4">
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="relative aspect-[3/1] bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-medium">{banner.title}</h3>
                  <p className="text-sm text-gray-500">
                    {banner.startDate} - {banner.endDate}
                  </p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    banner.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {banner.active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingBanner(banner);
                      setShowForm(true);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {banners.length === 0 && (
        <Alert>
          <AlertDescription>
            No banners found. Click "Add New Banner" to create your first banner.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default BannerManagement;