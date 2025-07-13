"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface OrderItem {
  productId: string;
  variantId?: string;
  productName: string;
  image?: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  stock: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentInfo: {
    cardNumber: string;
    cardholderName: string;
  };
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  notes?: string;
}

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = localStorage.getItem("orderHistory");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled':
        return <Clock className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'confirmed':
        return 'text-green-600 bg-green-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'shipped':
        return 'text-purple-600 bg-purple-50';
      case 'delivered':
        return 'text-green-700 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-6">
          <Link href="/collections" className="flex items-center text-sm text-gray-500 hover:text-black">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Continue Shopping
          </Link>
        </div>
        
        <div className="text-center py-16">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">No Orders Yet</h1>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
          <Button asChild>
            <Link href="/collections">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Order History</h1>
            <p className="text-gray-600 mt-2">Track and manage your orders</p>
          </div>
          <Link href="/collections" className="flex items-center text-sm text-gray-500 hover:text-black">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders List */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`border rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                  selectedOrder?.id === order.id 
                    ? 'border-pink-500 bg-pink-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="font-semibold text-lg">{order.id}</h3>
                      <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </p>
                    <p className="text-sm text-gray-600">
                      Delivered to {order.shippingAddress.city}, {order.shippingAddress.country}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">Rs. {order.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Total</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details */}
        <div className="lg:col-span-1">
          {selectedOrder ? (
            <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-medium mb-2">Order ID</h3>
                  <p className="text-sm text-gray-600">{selectedOrder.id}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Status</h3>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedOrder.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Order Date</h3>
                  <p className="text-sm text-gray-600">{formatDate(selectedOrder.date)}</p>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <h3 className="font-medium mb-3">Items ({selectedOrder.items.length})</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                        <img 
                          src={item.image || '/placeholder-product.jpg'} 
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{item.productName}</h4>
                        <p className="text-xs text-gray-500">
                          {item.size && `${item.size}`}
                          {item.color && ` • ${item.color}`}
                        </p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <h3 className="font-medium mb-3">Shipping Address</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{selectedOrder.customerInfo.firstName} {selectedOrder.customerInfo.lastName}</p>
                  <p>{selectedOrder.shippingAddress.address}</p>
                  <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                  <p>{selectedOrder.shippingAddress.country}</p>
                  <p className="mt-2">Phone: {selectedOrder.customerInfo.phone}</p>
                  <p>Email: {selectedOrder.customerInfo.email}</p>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <h3 className="font-medium mb-3">Payment Information</h3>
                <div className="text-sm text-gray-600">
                  <p>Card ending in ••••{selectedOrder.paymentInfo.cardNumber}</p>
                  <p>{selectedOrder.paymentInfo.cardholderName}</p>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="border-t pt-4 mb-6">
                  <h3 className="font-medium mb-3">Notes</h3>
                  <p className="text-sm text-gray-600">{selectedOrder.notes}</p>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-lg">Rs. {selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Button 
                  className="w-full"
                  onClick={() => router.push('/collections')}
                >
                  Reorder Items
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.print()}
                >
                  Print Receipt
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Select an Order</h3>
              <p className="text-sm text-gray-600">
                Click on an order from the list to view its details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;