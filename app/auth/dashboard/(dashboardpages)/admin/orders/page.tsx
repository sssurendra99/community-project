import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  ShoppingBag, 
  Clock, 
  Package, 
  CheckCircle,
  Filter,
  Eye
} from 'lucide-react';

const OrdersPage = () => {
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2024-01-17",
      total: 199.99,
      items: 3,
      status: "Processing",
      paymentStatus: "Paid"
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2024-01-16",
      total: 299.99,
      items: 2,
      status: "Shipped",
      paymentStatus: "Paid"
    },
    {
      id: "ORD-003",
      customer: "Bob Wilson",
      date: "2024-01-15",
      total: 159.99,
      items: 1,
      status: "Delivered",
      paymentStatus: "Paid"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#2E3440]">Orders</h1>
        <Button className="bg-[#5E81AC] hover:bg-[#81A1C1]">
          Export Orders
        </Button>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#ECEFF4]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#4C566A]">
              New Orders
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-[#5E81AC]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2E3440]">12</div>
            <p className="text-sm text-[#4C566A]">Today</p>
          </CardContent>
        </Card>

        <Card className="bg-[#ECEFF4]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#4C566A]">
              Processing
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2E3440]">8</div>
            <p className="text-sm text-[#4C566A]">Orders in progress</p>
          </CardContent>
        </Card>

        <Card className="bg-[#ECEFF4]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#4C566A]">
              Shipped
            </CardTitle>
            <Package className="h-4 w-4 text-[#5E81AC]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2E3440]">15</div>
            <p className="text-sm text-[#4C566A]">In transit</p>
          </CardContent>
        </Card>

        <Card className="bg-[#ECEFF4]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#4C566A]">
              Delivered
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2E3440]">45</div>
            <p className="text-sm text-[#4C566A]">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <Card className="bg-[#ECEFF4]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-[#2E3440]">Recent Orders</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#4C566A]" />
                <Input
                  placeholder="Search orders..."
                  className="pl-8 bg-white text-[#2E3440]"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E9F0]">
                <th className="text-left p-4 text-[#4C566A]">Order ID</th>
                <th className="text-left p-4 text-[#4C566A]">Customer</th>
                <th className="text-left p-4 text-[#4C566A]">Date</th>
                <th className="text-left p-4 text-[#4C566A]">Total</th>
                <th className="text-left p-4 text-[#4C566A]">Items</th>
                <th className="text-left p-4 text-[#4C566A]">Status</th>
                <th className="text-left p-4 text-[#4C566A]">Payment</th>
                <th className="text-left p-4 text-[#4C566A]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-[#E5E9F0]">
                  <td className="p-4 text-[#2E3440] font-medium">{order.id}</td>
                  <td className="p-4 text-[#2E3440]">{order.customer}</td>
                  <td className="p-4 text-[#4C566A]">{order.date}</td>
                  <td className="p-4 text-[#2E3440]">${order.total}</td>
                  <td className="p-4 text-[#4C566A]">{order.items}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Processing'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
    </Card>
          </div>
  )}

  export default OrdersPage;