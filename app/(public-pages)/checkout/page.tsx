"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Truck } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

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

interface CheckoutFormData {
  // Customer info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Shipping address
  address: string;
  city: string;
  postalCode: string;
  country: string;
  
  // Payment info
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  cardholderName: string;
  
  // Other
  notes: string;
  shipToDifferentAddress: boolean;
  agreeToTerms: boolean;
}

const CheckoutPage = () => {
  const router = useRouter();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    cardholderName: "",
    notes: "",
    shipToDifferentAddress: false,
    agreeToTerms: false,
  });

  useEffect(() => {
    // Get order items from localStorage (set by cart page)
    const savedOrder = localStorage.getItem("order");
    if (savedOrder) {
      setOrderItems(JSON.parse(savedOrder));
    } else {
      // If no order found, redirect to cart
      router.push("/cart");
    }
  }, [router]);

  const totalPrice = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (field: keyof CheckoutFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCardNumberChange = (value: string) => {
    // Format card number with spaces
    const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    if (formatted.length <= 19) { // 16 digits + 3 spaces
      setFormData(prev => ({ ...prev, cardNumber: formatted }));
    }
  };

  const handleExpirationChange = (value: string) => {
    // Format expiration date as MM/YY
    const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
    if (formatted.length <= 5) {
      setFormData(prev => ({ ...prev, expirationDate: formatted }));
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'address', 'city', 
      'postalCode', 'country', 'cardNumber', 'expirationDate', 
      'securityCode', 'cardholderName'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof CheckoutFormData]) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    
    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return false;
    }
    
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create order object
      const order = {
        id: `ORD-${Date.now()}`,
        items: orderItems,
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentInfo: {
          cardNumber: formData.cardNumber.slice(-4), // Only store last 4 digits
          cardholderName: formData.cardholderName,
        },
        total: totalPrice,
        status: "confirmed",
        date: new Date().toISOString(),
        notes: formData.notes,
      };

      // Save to order history
      const existingOrders = JSON.parse(localStorage.getItem("orderHistory") || "[]");
      existingOrders.unshift(order);
      localStorage.setItem("orderHistory", JSON.stringify(existingOrders));

      // Clear the current order
      localStorage.removeItem("order");

      setIsLoading(false);
      toast.success("Order placed successfully!");
      router.push("/orders-history");
    }, 2000);
  };

  if (orderItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/cart" className="flex items-center text-sm text-gray-500 hover:text-black">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Forms */}
        <div className="space-y-8">
          {/* Returning Customer */}
          <div className="bg-pink-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Returning Customer?</span>
              <button className="text-sm text-pink-600 hover:text-pink-700">
                Login from here
              </button>
            </div>
          </div>

          {/* Coupon */}
          <div className="bg-pink-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Have a Coupon?</span>
              <button className="text-sm text-pink-600 hover:text-pink-700">
                Apply coupon from here
              </button>
            </div>
          </div>

          {/* Shipping Details */}
          <div>
            <h2 className="text-lg font-semibold mb-4">SHIPPING DETAILS</h2>
            <p className="text-sm text-gray-600 mb-6">
              Enter the address where you want your order delivered.
            </p>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Country/ Region"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Postal code"
                  className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="City"
                  className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="shipToDifferent"
                  checked={formData.shipToDifferentAddress}
                  onChange={(e) => handleInputChange('shipToDifferentAddress', e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="shipToDifferent" className="text-sm text-gray-700">
                  Ship to a different address
                </label>
              </div>
            </div>
          </div>

          {/* Other Notes */}
          <div>
            <h2 className="text-lg font-semibold mb-4">OTHER NOTES</h2>
            <textarea
              placeholder="Notes about your order"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
            />
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-6">ORDER SUMMARY</h2>
            
            <div className="space-y-4 mb-6">
              {orderItems.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.productName}</h3>
                    <p className="text-sm text-gray-500">
                      {item.size && `${item.size}`}
                      {item.color && ` • ${item.color}`}
                    </p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium">Rs.  {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Sub total</span>
                <span>Rs.  {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>TOTAL</span>
                <span className="text-pink-600">Rs.  {totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white border rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="h-5 w-5" />
              <span className="font-medium">Credit / Debit Card</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Card number</label>
                <input
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={formData.cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiration date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={formData.expirationDate}
                    onChange={(e) => handleExpirationChange(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Security code</label>
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={formData.securityCode}
                    onChange={(e) => handleInputChange('securityCode', e.target.value)}
                    maxLength={3}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cardholder name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={formData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-md text-sm text-gray-600">
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{" "}
              <a href="#" className="text-pink-600 hover:text-pink-700">
                Privacy policy
              </a>
              .
            </div>

            <div className="mt-6 flex items-start space-x-2">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={formData.agreeToTerms}
                onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                I have read and agree to the website{" "}
                <a href="#" className="text-pink-600 hover:text-pink-700">
                  Terms and conditions
                </a>
              </label>
            </div>

            <Button
              onClick={handlePlaceOrder}
              disabled={isLoading}
              className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white py-3 text-lg font-medium"
            >
              {isLoading ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;