import React, { useState } from "react";

const SearchBar = ({ listings }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredListings = listings.filter((listing) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      listing.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      listing.type.toLowerCase().includes(lowerCaseSearchTerm) ||
      listing.discount.toString().includes(searchTerm) ||
      listing.pricing.toString().includes(searchTerm) ||
      listing.location.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="Search by name, type, discount, pricing, or location"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
