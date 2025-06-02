"use client";
import React from 'react';
import Flowers from '@/DB/data';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useDispatch } from "react-redux";
import { setCart } from "@/app/redux/features/cartslice";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/nextjs";



const FlowerDetailPage = () => {
  const { user } = useUser();
const userId = user?.id;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id.join('/') : params.id;
  
  

const handleAddToCart = (product) => {
  // Ensure all fields are present
  const fullProduct = {
    id: product.id,
    name: product.title,
    price: product.price,
    imageUrl: product.imgSrc,
    quantity: 1,
  };

  const existing = cartItems.find(item => item.id === fullProduct.id);
  let updatedCart;
  if (existing) {
    updatedCart = cartItems.map(item =>
      item.id === fullProduct.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    updatedCart = [...cartItems, fullProduct];
  }

  // Update Redux with the full cart
  dispatch(setCart(updatedCart));

  // Save the full updated cart to MongoDB
  fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, items: updatedCart }),
  });
};
  const flower = Flowers.find(f => f.id.toString() === id);

  if (!flower) {
    return <div>Flower not found</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center max-w-full mx-auto">
      <Image src={flower.imgSrc} alt={flower.title} className="max-w-full h-auto" width={500} height={400} />
      <div className="text-center p-4">
        <h2 className="text-2xl font-bold">{flower.title}</h2>
        <p className="text-lg"><strong>Price:</strong> ${flower.price}</p>
        <p className="text-md"><strong>Description:</strong> {flower.description}</p>
        <p className="text-md"><strong>Offers:</strong> Check available offers!</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => handleAddToCart(flower)}
        >
          Add to Cart
        </button>
        <div className="mt-5">
          <label htmlFor="pinCode" className="mr-2">Check Pin Code Availability: </label>
          <input type="text" id="pinCode" className="border-2 border-gray-300 rounded py-2 px-4 mr-2" />
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Check</button>
        </div>
      </div>
    </div>
  );
};

export default FlowerDetailPage;