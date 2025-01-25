import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, AlertTriangle, Download, Upload, Filter } from 'lucide-react';

const InventoryPage = () => {
  const inventory = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      sku: 'TS-001',
      stock: 5,
      sizes: ['S', 'M', 'L'],
      reorderPoint: 10,
      status: 'Low Stock',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      name: 'Blue Denim Jeans',
      sku: 'BJ-002',
      stock: 25,
      sizes: ['30', '32', '34'],
      reorderPoint: 15,
      status: 'In Stock',
      lastUpdated: '2024-01-16'
    },
    {
      id: 3,
      name: 'Summer Dress',
      sku: 'SD-003',
      stock: 0,
      sizes: ['S', 'M'],
      reorderPoint: 8,
      status: 'Out of Stock',
      lastUpdated: '2024-01-17'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Low Stock':
        return 'bg-orange-100 text-orange-800';
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#2E3440]">Inventory Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="text-[#5E81AC]">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" className="text-[#5E81AC]">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-red-50">
          <CardContent className="p-4 flex items-center gap-4">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <div>
              <h3 className="font-medium text-red-700">Low Stock Alert</h3>
              <p className="text-sm text-red-600">3 items below reorder point</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50">
          <CardContent className="p-4 flex items-center gap-4">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <div>
              <h3 className="font-medium text-orange-700">Out of Stock</h3>
              <p className="text-sm text-orange-600">1 item out of stock</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50">
          <CardContent className="p-4 flex items-center gap-4">
            <AlertTriangle className="h-5 w-5 text-blue-500" />
            <div>
              <h3 className="font-medium text-blue-700">Reorder Required</h3>
              <p className="text-sm text-blue-600">2 items need reordering</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card className="bg-[#ECEFF4]">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <CardTitle className="text-[#2E3440]">Stock Levels</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#4C566A]" />
                <Input
                  placeholder="Search inventory..."
                  className="pl-8 bg-white text-[#2E3440]"
                />
              </div>
              <Button variant="outline" className="text-[#5E81AC]">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E9F0]">
                  <th className="text-left p-4 text-[#4C566A]">Product</th>
                  <th className="text-left p-4 text-[#4C566A]">SKU</th>
                  <th className="text-left p-4 text-[#4C566A]">Stock</th>
                  <th className="text-left p-4 text-[#4C566A]">Sizes</th>
                  <th className="text-left p-4 text-[#4C566A]">Reorder Point</th>
                  <th className="text-left p-4 text-[#4C566A]">Status</th>
                  <th className="text-left p-4 text-[#4C566A]">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b border-[#E5E9F0]">
                    <td className="p-4 text-[#2E3440]">{item.name}</td>
                    <td className="p-4 text-[#4C566A]">{item.sku}</td>
                    <td className="p-4 text-[#2E3440] font-medium">{item.stock}</td>
                    <td className="p-4 text-[#4C566A]">
                      {item.sizes.join(', ')}
                    </td>
                    <td className="p-4 text-[#4C566A]">{item.reorderPoint}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-[#4C566A]">{item.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryPage;