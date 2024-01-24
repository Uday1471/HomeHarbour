import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


export default function ForgetPassword() {
  const [formData, setFormData] = React.useState({
    email: "",
  });
  const {email} = formData;
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e){
    e.preventDefault();
    try {
     
      toast.success("Email was sent successfully.");
      
    } catch (error) {
      toast.error("Could not send reset password")
    }
  }
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home Harbour | Forgot-Password</title>
      </Helmet>
      <section>
        <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
        <div className="flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto gap-8">
          <div className="md:w-[67%] lg:w-[50%]  flex justify-center items-center p-1">
            <img
              className="rounded-2xl w-full"
              src="https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9naW58ZW58MHx8MHx8fDA%3D"
              alt="key"
            />
          </div>
          <div className="w-full md:w-[67%] lg:w-[40%]">
            <form onSubmit={onSubmit} className="flex w-full flex-col items-center justify-center gap-6">
              <div className="flex items-center justify-start w-full flex-col gap-4"><label className="flex items-start justify-start w-full">
                <span className="text-gray-700 text-lg font-medium">Enter Email</span>
              </label>
              <input
                className="w-full px-4 py-2 text-lg text-gray-700 bg-white border-gray-300 rounded-sm transition ease-in-out"
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={onChange}
                required
              /></div>
              <div className="flex w-full flex-col sm:flex-row items-center justify-center text-center sm:text-start sm:justify-between p-1 whitespace-nowrap text-sm sm:text-lg gap-2">
                <p className="">Don't have a account?
                <Link to="/sign-up" className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1">Register</Link>
                </p>
                <p>
                <Link to="/sign-in" className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">Sign in!</Link>
                </p>
              </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-7 py-3 text-sm sm:text-lg font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800">Send reset password</button>

            </form>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
}
