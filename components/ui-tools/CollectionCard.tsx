import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Collection } from "@/types/collection";
import Link from "next/link";

export default function CollectionCard({
  collection,
}: {
  collection: Collection;
}) {
  return (
    <div className="w-full group outline">
      {/* Image taking full card width */}
      <div className="w-full overflow-hidden">
        <Image
          src={`/collections/collection-${collection.slug}.png`}
          alt={collection.name}
          width={500}
          height={500}
          className="w-[400px] aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="text-center space-y-4 py-6">
        <h3 className="text-xl font-bold tracking-wider text-black">
          {collection.name}
        </h3>
        <p className="text-gray-500 text-sm font-medium">
          {collection.productCount} PRODUCTS
        </p>
        <Link href={`/collections/${collection.slug}`}>
          <Button
            className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-8 mt-16 rounded-none transition-colors duration-200"
            size="lg"
          >
            SHOP NOW
          </Button>
        </Link>
      </div>
    </div>
  );
}