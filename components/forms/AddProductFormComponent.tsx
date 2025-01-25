import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import ImageUpload from "../ui-tools/ImageUpload";

const variantSchema = z.object({
  size: z.enum(["XS", "S", "M", "L", "XL", "XXL"]),
  color: z.string().optional(),
  stockQuantity: z.number().min(0),
  priceAdjustment: z.number().optional(),
  sku: z.string().min(1, "SKU is required"),
});

const productFormSchema = z.object({
  productName: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  price: z.coerce.number().min(0, {
    message: "Price must be a positive number.",
  }),
  sku: z.string().min(1, "SKU is required"),
  stock: z.coerce.number().min(0),
  brandId: z.string().optional(),
  categoryId: z.string().optional(),
  variants: z.array(variantSchema).optional(),
});

interface VariantIds {
  [key: number]: string;
}

interface VariantImageFiles {
  [key: number]: File[];
}

type ProductFormValues = z.infer<typeof productFormSchema>;

const AddProductFormComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [productId, setProductId] = useState<string | null>(null);
  const [variantIds, setVariantIds] = useState<VariantIds>({});
  const [variantImageFiles, setVariantImageFiles] = useState<VariantImageFiles>(
    {}
  );

  const handleFileSelection = (files: File[], index: number) => {
    setVariantImageFiles((prev) => ({
      ...prev,
      [index]: files,
    }));
  };

  const handleImageUploads = async (
    newProductId: string,
    newVariantIds: VariantIds
  ) => {
    if (!newProductId || Object.keys(newVariantIds).length === 0) {
      console.error("Product or variant IDs not available");
      return;
    }

    try {
      const uploadPromises = Object.entries(variantImageFiles).map(
        async ([index, files]) => {
          const variantId = newVariantIds[Number(index)];
          if (!variantId || !files.length) return;

          const formData = new FormData();
          files.forEach((file: string | Blob) => {
            formData.append("files", file);
          });

          formData.append("productId", newProductId);
          formData.append("variantId", variantId);

          // Remove the Content-Type header - let the browser set it automatically
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
            // Don't set Content-Type header here - it will be set automatically
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Upload failed");
          }

          return response.json();
        }
      );

      const results = await Promise.all(uploadPromises);
      console.log("All uploads completed:", results);
      return results;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error; // Re-throw to handle in the calling function
    }
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productName: "",
      description: "",
      price: 0,
      sku: "",
      stock: 0,
      variants: [],
    },
  });

  // Setup field array for variants
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  // Fetch brands and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsResponse, categoriesResponse] = await Promise.all([
          fetch("/api/brands"),
          fetch("/api/categories"),
        ]);

        const brandsData = await brandsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setBrands(brandsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  async function onSubmit(values: ProductFormValues) {
    try {
      setIsSubmitting(true);

      const validatedData = productFormSchema.parse(values);
      console.log("Validated data:", validatedData);

      // First, create the product and variants
      const response = await fetch("/api/dashboard/products", {
        method: "POST",
        body: JSON.stringify(validatedData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error: ", errorData);
        throw new Error(errorData.error || "Failed to create product");
      }

      const data = await response.json();

      // Instead of setting state and immediately using it,
      // pass the IDs directly to the upload function
      try {
        // Handle image uploads
        await handleImageUploads(data.productId, data.variantIds);

        // Success - clear form and state
        form.reset();
        setVariantImageFiles({});
        // You might want to show a success message here
      } catch (uploadError) {
        // Handle upload error - you might want to delete the product or show an error message
        console.error("Failed to upload images:", uploadError);
        // Show error message to user
      }
    } catch (error) {
      console.error("Error in form submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Product Information */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter SKU" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="brandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Product Variants Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Product Variants</h3>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    size: "M",
                    color: "",
                    stockQuantity: 0,
                    priceAdjustment: 0,
                    sku: "",
                  })
                }
              >
                Add Variant
              </Button>
            </div>

            <div className="max-h-[250px] overflow-auto rounded-none">
              {fields.map((field, index) => (
                <Card key={field.id} className="rounded-none mx-2">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`variants.${index}.size`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size</FormLabel>
                            <FormControl>
                              <Input placeholder="Size" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`variants.${index}.color`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color</FormLabel>
                            <FormControl>
                              <Input placeholder="Color" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`variants.${index}.stockQuantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stock Quantity</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`variants.${index}.priceAdjustment`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price Adjustment</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0.00"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`variants.${index}.sku`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Variant SKU</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter variant SKU"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <ImageUpload
                      onUpload={(files) => handleFileSelection(files, index)}
                      maxFiles={2}
                      acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
                      className="mt-2"
                    />
                    <div className="flex justify-end items-end my-2">
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                      >
                        Remove Variant
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddProductFormComponent;
