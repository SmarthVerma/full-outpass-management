import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HostelCard = ({ name, image }: any) => {
  const formattedName = name.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link
      to={`/${formattedName}`}
      className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      <img
        src={image}
        alt={`${name}`}
        className="w-full h-48 object-cover transition-opacity duration-200 hover:opacity-90"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-blue-800 text-center">{name}</h3>
      </div>
    </Link>
  );
};

export default HostelCard;
