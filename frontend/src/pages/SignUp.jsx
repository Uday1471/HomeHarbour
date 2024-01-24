import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { publicApi } from "../utils";
import { useAuthStore } from "../store/masterStore";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  let { setUser } = useAuthStore(store => store);

  async function onSubmit(e) {
    e.preventDefault();
    publicApi.post("/signup", {
      name,
      email,
      password
    }).then((res) => {
      if (res.data) {
        setUser(res.data);
        toast.success("Sign up was successful");
        navigate("/");
      }
    }).catch((err) => {
      toast.error("Something went wrong with the registration");
    });
  }
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home Harbour | Sign-Up</title>
      </Helmet>
      <section>
        <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
        <div className="flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto gap-8">
          <div className="md:w-[67%] lg:w-[50%] flex justify-center items-center p-1">
            <img
              className="rounded-2xl w-full"
              src={require("../assets/lock.png")}
              alt="key"
            />
          </div>
          <div className="w-full md:w-[67%] lg:w-[40%]">
            <form onSubmit={onSubmit} className="flex w-full flex-col items-center justify-center gap-6">
              <input
                className="w-full px-4 py-2 text-lg text-gray-700 bg-white border-gray-300 rounded-sm transition ease-in-out"
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={onChange}
                required
              />
              <input
                className="w-full px-4 py-2 text-lg text-gray-700 bg-white border-gray-300 rounded-sm transition ease-in-out"
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={onChange}
                required
              />
              <div className="relative w-full">
                <input
                  className="w-full px-4 py-2 text-lg text-gray-700 bg-white border-gray-300 rounded-sm transition ease-in-out"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={onChange}
                  required
                />
                {showPassword ? (<AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)} />) : (<AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword(prevState => !prevState)} />)}
              </div>
              <div className="flex w-full flex-col sm:flex-row items-center justify-between text-center sm:text-start sm:justify-between p-1 whitespace-nowrap text-sm sm:text-lg gap-2">
                <p className="">Have a account?
                  <Link to="/sign-in" className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1">Sign In</Link>
                </p>
                <p>
                  <Link to="/forget-password" className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">Forgot Password!</Link>
                </p>
              </div>
              <button type="submit" className="w-full text-sm sm:text-lg bg-blue-600 text-white px-7 py-3  font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800">Sign Up</button>

            </form>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
}
