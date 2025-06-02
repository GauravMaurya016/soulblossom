"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BounceCards from "@/components/BounceCards/BounceCards"; // Adjust the import path as necessary
const Hero = () => {
  const images = ["/rose1.webp", "/rose2.webp", "/rose3.webp"];
  const [currentIndex, setCurrentIndex] = useState(0); // Use state for the current index

  const nextImage = React.useCallback(() => {
    const newIndex = (currentIndex + 1) % images.length; // Calculate the next index
    setCurrentIndex(newIndex); // Update the state
  }, [currentIndex, images.length]);

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length; // Calculate the previous index
    setCurrentIndex(newIndex); // Update the state
  };

  // Automatically change images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000); // Change to 1000 for 1 second
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex, nextImage]);

  return (
    <>
      <main className="">
        <section className="flex flex-col items-center mt-4  h-fit">
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
              onClick={prevImage}
            >
              &#10094;
            </button>
            <Image
              src={images[currentIndex]} // Use the current index to display the image
              alt={`rose${currentIndex + 1}`}
              width={980}
              height={980}
              className="h-fit w-fit transition-transform duration-500 ease-in-out"
            />
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
              onClick={nextImage}
            >
              &#10095;
            </button>
          </div>
        </section>
        <section className="flex  justify-center md:items-center bg-gray-100">
          <BounceCards />
        </section>
      </main>
    </>
  );
};

export default Hero;
