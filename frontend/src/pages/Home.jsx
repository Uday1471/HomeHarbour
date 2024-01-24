import React, { useState } from 'react'
import { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link } from 'react-router-dom';
import Slider from '../components/Slider'
import ListingItem from '../components/ListingItem'
import { publicApi } from '../utils';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

export default function Home() {

  const [offerListings, setOfferListings] = useState(null);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    async function fetchListings() {
      setLoader(true);
      publicApi.get("/property?type=offer").then((res) => {
        setOfferListings(res.data.data);
        setLoader(false);
      }).catch((err) => {
        toast.error("Could not fetch listing " + err.message);
      })
    }
    fetchListings()
  }, [])
  const [rentListings, setRentListings] = useState(null);
  const [loader2, setLoader2] = useState(true);
  useEffect(() => {
    async function fetchListings() {
      setLoader2(true);
      publicApi.get("/property?type=rent").then((res) => {
        setRentListings(res.data.data);
        setLoader2(false);
      }).catch((err) => {
        toast.error("Could not fetch listing " + err.message);
      })
    }
    fetchListings()
  }, [])
  const [saleListings, setSaleListings] = useState(null);
  const [loader3, setLoader3] = useState(true);
  useEffect(() => {
    async function fetchListings() {
      setLoader3(true);
      publicApi.get("/property?type=sale").then((res) => {
        setSaleListings(res.data.data);
        setLoader3(false);
      }).catch((err) => {
        toast.error("Could not fetch listing " + err.message);
      })
    }
    fetchListings()
  }, []);
  const [listings, setListings] = useState(null);
  const [loader4, setLoader4] = useState(true);
  useEffect(() => {
    async function fetchListings() {
      setLoader4(true);
      publicApi.get("/property").then((res) => {
        setListings(res.data.data);
        setLoader4(false);
      }).catch((err) => {
        toast.error("Could not fetch listing " + err.message);
      })
    }
    fetchListings();
  }, []);

  if(loader || loader2 || loader3 || loader4) return <div className="w-full h-full flex items-center justify-center"><Spinner /></div>;

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home Harbour | Home</title>
      </Helmet>
      <div>
        <Slider listings={listings}/>
        <div className='max-w-6xl mx-auto p-1 gap-3 flex items-start flex-col justify-center'>
          {offerListings && offerListings.length > 0 && (
            <div className="w-full mt-4 flex items-start flex-col justify-center gap-2">
              <h2 className="px-2 ml-1 mt-1 text-xl font-semibold">Recent offers</h2>
              <Link to="/offers">
                <p className="px-2 ml-1  text-xs text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more Offers</p>
              </Link>
              <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5 my-2 p-1">
                {offerListings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} id={listing._id} />
                ))}
              </ul>
            </div>
          )}
          {rentListings && rentListings.length > 0 && (
            <div className="w-full mt-4 flex items-start flex-col justify-center gap-2">
              <h2 className="px-2 ml-1 mt-1 text-xl font-semibold">Places for rent</h2>
              <Link to="/category/rent">
                <p className="px-2 ml-1  text-xs text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more places for rent</p>
              </Link>
              <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5 my-2 p-1">
                {rentListings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} id={listing._id} />
                ))}
              </ul>
            </div>
          )}
          {saleListings && saleListings.length > 0 && (
            <div className="w-full mt-4 flex items-start flex-col justify-center gap-2">
              <h2 className="px-2 ml-1 mt-1 text-xl font-semibold">Places for sale</h2>
              <Link to="/category/sale">
                <p className="px-2 ml-1  text-xs text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more places for sale</p>
              </Link>
              <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5 my-2 p-1">
                {saleListings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} id={listing._id} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </HelmetProvider>
  )
}
