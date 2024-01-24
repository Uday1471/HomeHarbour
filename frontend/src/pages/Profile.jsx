import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { useAuthStore } from "../store/masterStore";
import { publicApi } from "../utils";

export default function Profile() {
  let { clearUser, user, setUser } = useAuthStore(store => store);
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = React.useState(false);
  const [listings, setListings] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [formData, setFormData] = React.useState({
    name: user ? user?.name : "",
    email: user ? user?.email : "",
  });

  const { name, email } = formData;
  function onLogout() {
    clearUser();
    navigate("/");
  }
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit() {
    try {
      let res = await publicApi.put(`/signup/${user._id}`, formData, {
        headers: {
          authorization: user.token
        }
      });
      setUser(res.data);
      toast.success("Profile Details Updated");
    } catch (error) {
      console.log(error);
      toast.error("Could not update the profile details");
    }
  }
  async function fetchUserListings() {
    if (user) {
      publicApi.get("/property/user", {
        headers: {
          authorization: user.token
        }
      }).then((res) => {
        setListings(res.data.data);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
        toast.error("Could not fetch listing");
      })
    }
  }
  React.useEffect(() => {
    fetchUserListings();
  }, [user]);

  async function onDelete(listingID) {
    if (window.confirm('Are you sure you want to delete?')) {
      publicApi.delete(`/property/${listingID}`, {
        headers: {
          authorization: user.token
        }
      }).then((res) => {
        console.log(res);
        toast.success("Successfully deleted the listing");
        fetchUserListings();
      }).catch((err) => {
        console.log(err);
        toast.error("Could not delete listing");
      })
    }
  }

  function onEdit(listingID) {
    navigate(`/edit-listing/${listingID}`)
  }



  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home Harbour | Profile</title>
      </Helmet>
      <>
        <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
          <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center mt-6 px-2 gap-4">
            <form className="w-full flex flex-col items-center justify-center mt-6 px-2 gap-4">
              <input
                type="text"
                id="name"
                value={name}
                disabled={!changeDetail}
                onChange={onChange}
                className={
                  "w-full px-4 py-2 text-xl text-gray-700 rounded transition ease-in-out" +
                  (changeDetail
                    ? "bg-red-200 focus:bg-red-200"
                    : " bg-white border border-gray-300")
                }
              />

              <input
                type="email"
                id="email"
                value={email}
                disabled
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
              />

              <div className="w-full flex px-1 items-center justify-between flex-row whitespace-nowrap text-sm">
                <p className="flex items-center justify-center flex-row gap-1 text-xs xs:text-sm">
                  Want to change your name?
                  <span
                    onClick={() => {
                      changeDetail && onSubmit();
                      setChangeDetail((prevState) => !prevState);
                    }}
                    className="text-red-600 text-xs xs:text-sm hover:text-red-700 transition ease-in-out duration-150 ml-1 cursor-pointer"
                  >
                    {changeDetail ? "Apply Change" : "Edit"}
                  </span>
                </p>
                <p
                  onClick={onLogout}
                  className="text-blue-600 text-xs xs:text-sm hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
                >
                  Sign Out!
                </p>
              </div>
            </form>
            <div className="px-2 w-full">
              <button
                type="submit"
                className="w-full  bg-blue-600 text-white uppercase px-7 py-3 text-xs xxs:text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out flex items-center justify-center flex-row gap-3 active:bg-blue-800"
              >
                <Link
                  to="/create-listing"
                  className="flex items-center justify-center gap-3 flex-row whitespace-nowrap"
                >
                  <FcHome className="text-3xl bg-red-200 rounded-full border-2 p-1" />
                  Sell or rent your home
                </Link>
              </button>
            </div>
          </div>
        </section>
        <div className="p-2 sm:p-4 max-w-6xl mx-auto">
          {!loading && listings && listings.length !== 0 && (
            <>
              <h2 className="text-xl text-center font-semibold mt-4 mb-4">
                My Listings
              </h2>
              <ul className="grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5 my-6 p-1">
                {listings.map((listing) => (
                  <ListingItem
                    key={listing._id}
                    id={listing._id}
                    listing={listing}
                    onDelete={() => onDelete(listing._id)}
                  // onEdit={() => onEdit(listing._id)}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </>
    </HelmetProvider>
  );
}
