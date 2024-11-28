import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import geetaImage from '../assets/geeta.jpg';
import azadImage from '../assets/azad.jpg';
import shastriImage from '../assets/shastri.png';
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

export const Home = () => {
  // Array of hostels with name and image for dynamic rendering
  const hostels = [
    { name: 'Azad Hostel', image: azadImage, alt: 'Azad Hostel building' },
    { name: 'Parmar Hostel', image: shastriImage, alt: 'Parmar Hostel building' },
    { name: 'Shashtri Hostel', image: shastriImage, alt: 'Shastri Hostel building' },
    { name: 'Geeta Bhawan', image: geetaImage, alt: 'Geeta Bhawan building' },
  ];

  return (
    <div className=" flex flex-col  items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">

      <HeroHighlight containerClassName='flex flex-col  items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100' >
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white leading-relaxed px-11 lg:leading-snug text-center mx-auto "
        >
          <div className='m-10 '>
            <Highlight className="text-black font-mono py-2 dark:text-white px-8">
              Choose your hostel!
            </Highlight>
            <div className='w-full   flex justify-center'>
              <TextGenerateEffect
                className="font-medium max-w-3xl text-center "
                words="Simplifying the process of requesting outpasses for hostel students. Ensure proper verification through your warden and parents before confirming your outpasses."
              />
            </div>
          </div>
          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hostels.map((hostel) => (
              <Link
                to={`dashboard/${hostel.name.toLowerCase().replace(/\s+/g, '-')}`} // Dynamic routing
                key={hostel.name}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 flex flex-col"
              >
                <img
                  src={hostel.image}
                  alt={hostel.alt}  // More descriptive alt text for accessibility
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-grow flex flex-col justify-center items-center">
                  <h3 className="text-xl font-semibold text-gray-800 text-center">{hostel.name}</h3>
                </div>
              </Link>
            ))}
          </div>
          {/* Help Link */}
          <div className="mt-8">
            <Link
              to="/help"
              className="text-blue-500 hover:text-blue-700 text-sm font-medium hover:underline"
            >
              Need help? Learn how the system works
            </Link>
          </div>


        </motion.h1>
      </HeroHighlight>


    </div>
  );
};