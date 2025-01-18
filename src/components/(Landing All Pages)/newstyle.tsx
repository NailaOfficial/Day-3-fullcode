import Image from 'next/image';
import React from 'react';

export default function Newstyle() {
  return (
    <div className='px-4 sm:px-8 md:px-32 py-8 max-w-screen-2xl m-auto'>
      {/* Explore Styles Section */}
      <section className="container mx-auto px-8 sm:px-12 md:px-16 lg:px-20 py-16 max-w-screen-xl m-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {/* Left Section: Image with vertical text */}
          <div className="relative flex items-center justify-center">
            <p className="mt-80 mr-6 absolute transform  -rotate-90 pt-16 origin-bottom-left text-2xl hidden md:block text-gray-900 font-semibold tracking-wide md:left-0">
              Explore New and Popular Styles
            </p>
            <div className="w-full lg:w-[585px] flex justify-center items-center">
              <Image
                src="/main.png"
                alt="Main Chair"
                width={644}
                height={644}
                className="object-contain"
              />
            </div>
          </div>
          {/* Right Section: Smaller Grid */}
          <div className="grid grid-cols-2 gap-4">
            {["01", "02", "20", "20"].map((chair, index) => (
              <div key={index} className="relative hover:shadow-lg overflow-hidden">
                <Image
                  src={`/${chair}.png`}
                  alt={`Chair ${index + 1}`}
                  width={284}
                  height={284}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
