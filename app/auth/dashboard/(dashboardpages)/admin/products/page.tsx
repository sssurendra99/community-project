"use client";

import AddBrandFormComponent from "@/components/forms/AddBrandFormComponent";
import AddProductFormComponent from "@/components/forms/AddProductFormComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStatusColor } from "@/utils/getStatusColor";
import { AlertTriangle, Edit2, Package, PlusIcon, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ProductResponseInterface {
  id: string;
  productName: string;
  category: string;
  stock: number;
  price: number;
  status: string;
}

const ProductPage = () => {
  const [lowStockItems, setLowStockItems] = React.useState(0);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [activeProducts, setActiveProducts] = React.useState(0);

  const [products, setProducts] = useState<ProductResponseInterface[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/dashboard/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setTotalProducts(data.length);
        setLowStockItems(data.length);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="w-full flex justify-end gap-4">
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-black text-white font-semibold hover:bg-blue-900">
                <PlusIcon strokeWidth={4} />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Product</DialogTitle>
              </DialogHeader>
              <AddProductFormComponent />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-black text-white font-semibold hover:bg-blue-900">
                <PlusIcon strokeWidth={4} />
                Add Brand
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Brand</DialogTitle>
              </DialogHeader>
              <AddBrandFormComponent />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Product Management</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Products
                </CardTitle>
                <Package className="text-gray-400" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProducts}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Products
                </CardTitle>
                <Package className="text-green-500" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeProducts}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Low Stock Alert
                </CardTitle>
                <AlertTriangle className="text-orange-500" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lowStockItems}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Products List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b">
                      <TableHead className="text-left p-4 text-black">
                        Product Name
                      </TableHead>
                      <TableHead className="text-left p-4 text-black">
                        Category
                      </TableHead>
                      <TableHead className="text-left p-4 text-black">
                        Stock
                      </TableHead>
                      <TableHead className="text-left p-4 text-black">
                        Price
                      </TableHead>
                      <TableHead className="text-left p-4 text-black">
                        Status
                      </TableHead>
                      <TableHead className="text-left p-4 text-black">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="text-left p-4">
                          {product.productName}
                        </TableCell>
                        <TableCell className="text-left p-4">
                          {product.category}
                        </TableCell>
                        <TableCell className="text-left p-4">
                          {product.stock}
                        </TableCell>
                        <TableCell className="text-left p-4">
                          {product.price}
                        </TableCell>
                        <TableCell className="text-left p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                              product.status
                            )}`}
                          >
                            {product.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-left p-4">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#5E81AC] hover:text-[#81A1C1]"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
