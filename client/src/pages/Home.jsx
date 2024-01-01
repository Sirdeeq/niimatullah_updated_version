import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import { FaWhatsapp } from "react-icons/fa";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/imgs/logo.png";

export default function Home() {
  const dispatch = useDispatch();
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isWhatsAppFixed, setIsWhatsAppFixed] = useState(false);
  const user = useSelector((state) => state.user);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  const openWhatsAppModal = () => {
    setShowWhatsAppModal(true);
  };

  const handleWhatsAppClick = (number) => {
    const cleanedNumber = number.replace(/\D/g, "");
    window.open(`https://api.whatsapp.com/send?phone=${cleanedNumber}`);
    setShowWhatsAppModal(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsWhatsAppFixed(scrollPosition > 200); 
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3  mx-auto md:flex-row md:items-center bg-sky-900">
        <div className="md:w-5/12">
          <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
            <span className="text-slate-200">Effortless Elegance</span>
          </h1>
          <br />
          <div className="text-gray-400 text-xs sm:text-sm">
            Discover your ideal home with diverse property options at
            NIIMATULLAH REALESTATE.
          </div>
          <Link
            to={"/search"}
            className="text-xs sm:text-sm text-blue-900 font-bold hover:underline"
          >
            Let's get started...
          </Link>
        </div>
        <div className="md:w-7/12">
          {/* swiper */}
          <Swiper navigation>
            {offerListings &&
              offerListings.length > 0 &&
              offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <div
                    style={{
                      background: `url(${listing.imageUrls[0]}) center no-repeat`,
                      backgroundSize: "cover",
                      position: "relative"
                    }}
                    className="h-[500px]"
                  >
                    <img
                      src={logo}
                      alt="Niimatullah Real estate"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        width: "100px",
                        height: "auto"
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>

      {/* listing results for offer */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        className={`fixed bottom-8 right-8 flex flex-col gap-4 z-50 ${
          isWhatsAppFixed ? "hidden" : ""
        }`}
      >
        <button onClick={openWhatsAppModal}>
          <FaWhatsapp size={45} color="#25D366" />
        </button>
        {showWhatsAppModal && (
          <Modal
            title="Live Chat"
            closeModal={() => setShowWhatsAppModal(false)}
          >
            <h2>Choose a number:</h2>
            <button onClick={() => handleWhatsAppClick("+2347010006368")}>
              Number 1
            </button>
            <button onClick={() => handleWhatsAppClick("+234802799992")}>
              Number 2
            </button>
            <button onClick={() => handleWhatsAppClick("+2349068420891")}>
              Number 3
            </button>
          </Modal>
        )}
      </div>
    </div>
  );
}
