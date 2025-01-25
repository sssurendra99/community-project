import { Product } from "@/app/types/product";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

import ModelImage from "../../public/temp/IMG_9925.jpg";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProductCard = ({ product }: { product: Product }) => {
  const pathname = usePathname();
    console.log(pathname)
  return (
    <Card className="relative p-0 border-none rounded-none shadow-none w-full">
      <CardHeader className="relative">
        <div className="relative overflow-clip">
          <p className="absolute bg-white text-black text-sm px-3 py-1">New</p>
          <Link href={`${pathname}/${product.id}`}>
            <Image
              src={ModelImage}
              alt={"Image"}
              width={800}
              height={500}
              className="hover:scale-110"
            />
          </Link>
          <p className="absolute bottom-0 w-full bg-white text-center border-black border-[1px] text-sm py-2 hover:bg-black hover:text-white font-semibold">
            QUICK ADD
          </p>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-gray-400">
          {product.brand?.name.toUpperCase()}
        </p>
        <span className="text-sm text-gray-800">
          Boho Breeze Linen Dress - Cream
        </span>
        <p className="text-gray-800 font-semibold py-3">Rs {product.price}</p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row items-center justify-center w-full">
          <div className="border-2 border-red-900 flex items-center  rounded-full justify-center m-1">
            <Badge
              variant={"outline"}
              className="relative p-0 w-8 h-8 rounded-full"
            >
              <Image
                src={ModelImage}
                alt={"Image"}
                layout="fill"
                objectFit="cover"
                className="absolute w-full h-full p-0 rounded-full overflow-hidden"
              />
            </Badge>
          </div>
          <div className="border-2 border-red-900 flex items-center  rounded-full justify-center m-1">
            <Badge
              variant={"outline"}
              className="relative p-0 w-8 h-8 rounded-full"
            >
              <Image
                src={ModelImage}
                alt={"Image"}
                layout="fill"
                objectFit="cover"
                className="absolute w-full h-full p-0 rounded-full overflow-hidden"
              />
            </Badge>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
