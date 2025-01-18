"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaCartShopping } from "react-icons/fa6";
import { fetchPopularProducts1 } from "../fetch3"; // Import your fetch function
import Link from "next/link";

// Define the interface for the product
interface Product {
  title: string;
  price: number;
  slug: {
    current: string;
  };
  imageUrl: string;
  badge:string
}

export default function AllProductData() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const desiredOrder = [
        "0",
        "1",
        "2",
        "3",
        "9",
        "5",
        "6",
        "7",
        "8",
        "4",
        "10",
        "11",
      ]; // Desired slug order
      try {
        const data: Product[] = await fetchPopularProducts1();
        const sortedProducts = data.sort((a, b) => {
          const indexA = desiredOrder.indexOf(a.slug.current);
          const indexB = desiredOrder.indexOf(b.slug.current);
          return indexA - indexB;
        });
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-4 sm:px-8 md:px-52 pt-2 mt-14 max-w-screen-2xl m-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4 pl-4">
          All Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {products.map((product) => (
            <div
              key={product.slug.current}
              className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-95 hover:shadow-2xl group"
            >
              <Link href={`/products/${product.slug.current}`}>
                {/* Image Section */}
                <div className="w-full h-64 overflow-hidden relative">
                  <Image
                    src={product.imageUrl || "/placeholder.png"}
                    alt={product.title || "Product"}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
             
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500"></div>
                </div>
                {/* Product Details */}
                <div className="w-full px-4 py-3 flex justify-between items-center">
                  <div>  
                    <h2 className="font-medium text-lg text-emerald-500 transition-colors duration-300">
                      {product.title || "No Title"}
                    </h2>
                    <span className="text-black text-lg font-semibold transition-colors duration-300">
                      ${product.price || "N/A"}
                    </span>
                  </div>
                  {/* Cart Icon */}
                  <div
                    aria-label="Add to cart"
                    className="p-2 bg-teal-500 rounded-md text-white shadow-md transition-all duration-300 hover:bg-teal-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  >
                    <FaCartShopping className="w-6 h-6 transition-transform duration-300 group-hover:scale-125" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
