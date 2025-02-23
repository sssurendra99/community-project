'use client'

import React from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Package, 
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  // Sample data
  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4500 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 5500 }
  ];

  const orderData = [
    { name: 'Mon', orders: 20 },
    { name: 'Tue', orders: 15 },
    { name: 'Wed', orders: 25 },
    { name: 'Thu', orders: 22 },
    { name: 'Fri', orders: 30 },
    { name: 'Sat', orders: 28 },
    { name: 'Sun', orders: 18 }
  ];

  const recentOrders = [
    { id: '#12345', customer: 'John Doe', total: '$129.99', status: 'Completed' },
    { id: '#12346', customer: 'Jane Smith', total: '$239.99', status: 'Processing' },
    { id: '#12347', customer: 'Bob Wilson', total: '$99.99', status: 'Pending' },
    { id: '#12348', customer: 'Alice Brown', total: '$189.99', status: 'Completed' },
    { id: '#12349', customer: 'Charlie Davis', total: '$159.99', status: 'Processing' }
  ];

  const StatCard = ({ title, value, icon: Icon, trend, percentage }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <div className="flex items-center mt-1">
              {trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {percentage}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="p-3 bg-gray-100 rounded-full">
            <Icon className="w-6 h-6 text-gray-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <select className="p-2 border rounded-md">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Revenue" 
          value="$54,230" 
          icon={DollarSign}
          trend="up"
          percentage={12.5}
        />
        <StatCard 
          title="Total Orders" 
          value="845" 
          icon={ShoppingCart}
          trend="up"
          percentage={8.2}
        />
        <StatCard 
          title="Total Customers" 
          value="1,234" 
          icon={Users}
          trend="up"
          percentage={5.7}
        />
        <StatCard 
          title="Total Products" 
          value="456" 
          icon={Package}
          trend="down"
          percentage={2.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Sales Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Order Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="p-3 font-medium">{order.id}</td>
                    <td className="p-3">{order.customer}</td>
                    <td className="p-3">{order.total}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Completed' 
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
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

export default Dashboard;