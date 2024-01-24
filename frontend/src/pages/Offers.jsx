import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { useAuthStore } from "../store/masterStore";
import { publicApi } from "../utils";

export default function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchListing, setLastFetchListing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredListings = listings
  ? listings.filter((listing) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      return (
        listing.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        listing.type.toLowerCase().includes(lowerCaseSearchTerm) ||
        (listing.discount && listing.discount.toString().includes(searchTerm)) ||
        (listing.pricing && listing.pricing.toString().includes(searchTerm))
      );
    })
  : [];

  let { user } = useAuthStore(store => store);

  useEffect(() => {
    async function fetchListings() {
      publicApi.get("/property?type=offer").then((res) => {
        setListings(res.data.data);
        setLoading(false);
      }).catch((err) => {
        toast.error("Could not fetch listing");
      })
    }
    fetchListings();
  }, []);

  async function onFetchMoreListing() {
    try {

      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listing");
    }
  }


  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home Harbour | Offers</title>
      </Helmet>
      <div className="max-w-6xl mx-auto px-3 gap-3 flex items-center flex-col justify-center">
        <h1 className="text-3xl text-center mt-6 font-semibold">Offers</h1>
        <div className="my-4 w-full flex items-center justify-end">
          <input
            type="text"
            placeholder="Search by name, type, discount, pricing, or location"
            className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {loading ? (
          <Spinner />
        ) : filteredListings && filteredListings.length > 0 ? (
          <>
            <div className="w-full mt-4 flex items-start flex-col justify-center gap-2">
              <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5 my-2 p-1">
                {filteredListings.map((listing) => (
                  <ListingItem
                    key={listing._id}
                    listing={listing}
                    id={listing._id}
                  />
                ))}
              </ul>
            </div>
            {lastFetchListing && (
              <div className="flex justify-center items-center flex-row mt-3 mb-3">
                <button onClick={onFetchMoreListing} className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 hover:border-slate-600 rounded transition duration-150 ease-in-out">
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-xl text-center mt-6 p-1 font-normal text-blue-700">
            There are no current offers
          </p>
        )}
      </div>
    </HelmetProvider>
  );
}
