"use client";

import { useEffect, useState } from "react";

interface OrderItem {
  image: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("order");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex space-x-4 items-center">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <p className="font-semibold">{item.productName}</p>
                  <p className="text-sm text-gray-500">{item.size} / {item.color}</p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold">Rs {item.price * item.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
