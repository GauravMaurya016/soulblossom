import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const about = () => {
  return (
    <div className="bg-white text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <Image className="object-cover object-center rounded" alt="hero" src="/aboutflower.jpg" width={720} height={600}/>
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">About Our Flower Shop</h1>
          <p className="mb-8 leading-relaxed">
            Our flower shop offers a wide variety of fresh and vibrant flowers, perfect for any occasion.
            From romantic roses to stunning sunflowers, our expert florists handpick each flower to ensure
            the highest quality and freshness. We are committed to bringing joy and beauty to your life with our floral arrangements.
          </p>
          <div className="flex justify-center">
            <Link href="/">
            <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg mr-4">Shop Now</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-10">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-5">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 shadow-lg rounded-lg bg-white">
            <Image src="/team1.jpg" alt="Florist 1" className="rounded-full w-32 h-32 mx-auto" width={128} height={128}/>
            <h3 className="text-lg text-center mt-4 font-medium text-gray-900">Zoe Ramirez</h3>
            <p className="text-center text-gray-600">Senior Florist</p>
          </div>
          <div className="p-6 shadow-lg rounded-lg bg-white">
            <Image src="/team2.jpg" alt="Florist 2" className="rounded-full w-32 h-32 mx-auto" width={128} height={128}/>
            <h3 className="text-lg text-center mt-4 font-medium text-gray-900">Harper Bennett

</h3>
            <p className="text-center text-gray-600">Creative Director</p>
          </div>
          <div className="p-6 shadow-lg rounded-lg bg-white">
            <Image src="/team3.jpg" alt="Florist 3" className="rounded-full w-32 h-32 mx-auto" width={128} height={128}/>
            <h3 className="text-lg text-center mt-4 font-medium text-gray-900">Elizabeth Carter</h3>
            <p className="text-center text-gray-600">Florist Assistant</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default about;