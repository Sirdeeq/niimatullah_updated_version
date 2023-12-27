import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone_number: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <br />
      <div className=" items-center justify-center min-h-screen">
        <div className="p-3 max-w-md mx-auto bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              className="border p-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              id="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              id="email"
              onChange={handleChange}
            />
            <PhoneInput
            type="tel"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handlePhoneChange}
              className="border p-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              id="password"
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-slate-800 disabled:opacity-80 transition"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
            <OAuth />
          </form>
          <div className="flex items-center justify-between mt-5">
            <p className="text-gray-500">Already have an account?</p>
            <Link to="/sign-in" className="text-blue-700 hover:underline">
              Sign in
            </Link>
          </div>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
    </>
  );
}
