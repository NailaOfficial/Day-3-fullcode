
"use client";

import { useCart } from "@/app/context/cardContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Product {
  slug: string;
  title: string;
  price: number;
  imageUrl: string;
  stock: number;
}

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { dispatch } = useCart();
  const [stock, setStock] = useState(product.stock);  // Local state to track stock
  const [quantity, setQuantity] = useState(1); // Track the quantity of items to add

  // Handle increment of quantity
  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity((prevQuantity) => prevQuantity + 1); // Increase quantity
    }
  };

  // Handle decrement of quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1); // Decrease quantity
    }
  };

  // Handle add to cart functionality
  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= stock) {
      // Dispatch action to add the product to the cart as per the selected quantity
      dispatchProductToCart(quantity);
      // Decrease stock locally
      setStock((prevStock) => prevStock - quantity);
    } else {
      // Display a message to the user (replace alert for better UX)
      alert("Invalid quantity or out of stock!");
    }
  };

  const dispatchProductToCart = (quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          slug: product.slug,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1, // Add 1 item per click in the loop
        },
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:px-32 lg:px-48 px-6 sm:px-12 md:py-4 space-y-6 md:space-y-0 md:space-x-6 items-center md:items-start max-w-screen-xl m-auto">
      {/* Product Image */}
      <div className="w-full md:w-1/2 rounded-lg overflow-hidden flex-shrink-0 mb-6 md:mb-0">
        <div className="relative w-full h-64 md:h-96">
          <Image
            className="object-cover object-center rounded-lg h-full transform transition-transform duration-500 hover:scale-105"
            src={product.imageUrl}
            alt={product.title}
            width={1000}
            height={1000}
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2 bg-white p-6 md:p-0 rounded-lg text-gray-800 flex flex-col justify-between items-center md:items-start transform transition-transform duration-300 space-y-2">
        <h1 className="text-2xl md:text-4xl font-medium md:font-semibold mb-4 text-center md:text-left">
          {product.title}
        </h1>
        <button className="px-6 py-2 bg-emerald-500 text-white font-semibold rounded hover:bg-emerald-600 transition duration-300 mb-4">
          {product.price} $ USD
        </button>
        <p className="text-center md:text-left leading-relaxed mb-6">
          Pour-over craft beer pug drinking vinegar live-edge gastropub, keytar neutra sustainable fingerstache kickstarter.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas voluptatum a veritatis pariatur.
        </p>

        {/* Quantity Selection */}
        <div className="flex items-center space-x-2 mb-4">
          <button
            className={`font-bold text-xl rounded-full ${quantity <= 1 ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={decrementQuantity} // Decrease quantity
            disabled={quantity <= 1} // Disable when quantity is 1
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            min="1"
            max={stock}
            onChange={(e) => setQuantity(Math.max(1, Math.min(stock, Number(e.target.value))))} // Limit range between 1 and stock
            className="w-16 text-center border border-gray-300 rounded-md"
          />
          <button
            className={`font-bold text-xl rounded-full ${quantity >= stock ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={incrementQuantity} // Increase quantity
            disabled={quantity >= stock} // Disable when quantity reaches stock
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          className="px-6 py-2 bg-cyan-500 text-white font-semibold rounded hover:bg-cyan-600 transition duration-300"
          onClick={handleAddToCart} // Add selected quantity to cart
        >
          Add to Cart
        </button>

        {/* Display Available Stock */}
        <p>Total Stock: {stock}</p>
        <Link href="/summary" className="mt-4 text-cyan-600 underline">Go to Cart</Link>
      </div>
    </div>
  );
}
