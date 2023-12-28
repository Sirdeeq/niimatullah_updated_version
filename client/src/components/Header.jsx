import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import logo from "../assets/imgs/logo.png";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap items-center">
            <img src={logo} width={200} alt="logo" />
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className={`${
            isNavOpen ? "hidden" : "flex"
          } sm:flex bg-slate-100 p-3 rounded-lg items-center ml-3 flex-grow mt-4 sm:mt-0`}
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none flex-grow pr-4 pl-2 rounded-l-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="bg-slate-100 rounded-r-md p-2">
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <button className="sm:hidden " onClick={toggleNav}>
          {isNavOpen ? (
            <FaTimes className="text-slate-600 " size={30} />
          ) : (
            <FaBars className="text-slate-600 mt-3 ml-2" size={30} />
          )}
        </button>
        <ul
          className={`${
            isNavOpen ? "flex flex-col mt-4" : "hidden"
          } sm:flex gap-4 items-center`}
        >
          <Link to="/">
            <li className="text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="text-slate-700 hover:underline">About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-slate-700 hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
