'use client'

import React, { useState } from 'react';
import { 
  Store, 
  Mail, 
  Bell, 
  Shield, 
  CreditCard, 
  Truck, 
  Globe,
  Save
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SettingsPage = () => {
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'My Store',
    storeEmail: 'store@example.com',
    phoneNumber: '+1 234 567 8900',
    address: '123 Store Street',
    currency: 'USD',
    timezone: 'UTC-5'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderNotifications: true,
    stockAlerts: true,
    customerMessages: true,
    securityAlerts: true
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    paypalEnabled: true,
    cod: false
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Store className="w-5 h-5 mr-2" />
                Store Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Store Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={storeSettings.storeName}
                    onChange={(e) => setStoreSettings({
                      ...storeSettings,
                      storeName: e.target.value
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Store Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-md"
                    value={storeSettings.storeEmail}
                    onChange={(e) => setStoreSettings({
                      ...storeSettings,
                      storeEmail: e.target.value
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full p-2 border rounded-md"
                    value={storeSettings.phoneNumber}
                    onChange={(e) => setStoreSettings({
                      ...storeSettings,
                      phoneNumber: e.target.value
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={storeSettings.address}
                    onChange={(e) => setStoreSettings({
                      ...storeSettings,
                      address: e.target.value
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Currency</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={storeSettings.currency}
                    onChange={(e) => setStoreSettings({
                      ...storeSettings,
                      currency: e.target.value
                    })}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Timezone</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={storeSettings.timezone}
                    onChange={(e) => setStoreSettings({
                      ...storeSettings,
                      timezone: e.target.value
                    })}
                  >
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC">UTC</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Order Notifications</h3>
                    <p className="text-sm text-gray-500">Receive notifications for new orders</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.orderNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({
                      ...notificationSettings,
                      orderNotifications: checked
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Stock Alerts</h3>
                    <p className="text-sm text-gray-500">Get notified when products are low in stock</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.stockAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({
                      ...notificationSettings,
                      stockAlerts: checked
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Customer Messages</h3>
                    <p className="text-sm text-gray-500">Receive customer support messages</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.customerMessages}
                    onCheckedChange={(checked) => setNotificationSettings({
                      ...notificationSettings,
                      customerMessages: checked
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Security Alerts</h3>
                    <p className="text-sm text-gray-500">Get notified about security events</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.securityAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({
                      ...notificationSettings,
                      securityAlerts: checked
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Stripe</h3>
                    <p className="text-sm text-gray-500">Accept credit card payments</p>
                  </div>
                  <Switch 
                    checked={paymentSettings.stripeEnabled}
                    onCheckedChange={(checked) => setPaymentSettings({
                      ...paymentSettings,
                      stripeEnabled: checked
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">PayPal</h3>
                    <p className="text-sm text-gray-500">Accept PayPal payments</p>
                  </div>
                  <Switch 
                    checked={paymentSettings.paypalEnabled}
                    onCheckedChange={(checked) => setPaymentSettings({
                      ...paymentSettings,
                      paypalEnabled: checked
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Cash on Delivery</h3>
                    <p className="text-sm text-gray-500">Allow cash payments on delivery</p>
                  </div>
                  <Switch 
                    checked={paymentSettings.cod}
                    onCheckedChange={(checked) => setPaymentSettings({
                      ...paymentSettings,
                      cod: checked
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Shipping Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Default Shipping Zone</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Domestic</option>
                    <option>International</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Shipping Calculation</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Fixed Rate</option>
                    <option>Weight Based</option>
                    <option>Order Total Based</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Free Shipping</h3>
                    <p className="text-sm text-gray-500">Enable free shipping for orders above threshold</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Free Shipping Threshold</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter amount"
                    defaultValue="100"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;