import { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaInstagram
} from "react-icons/fa";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        console.log(data);
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const openLink = (link) => {
    try {
      window.open(link, "_blank");
    } catch (error) {
      console.log(error);
      alert(`Failed to open link. Please try again.`);
    }
  };

  const handleWhatsAppClick = async () => {
    const whatsappMessage = encodeURIComponent(
      `Regarding ${listing.name}: ${message}`
    );

    const whatsappLink = `https://wa.me/${landlord.phone_number}?text=${whatsappMessage}`;

    try {
      window.open(whatsappLink, "_blank");
    } catch (error) {
      console.log(error);
      alert("Failed to open WhatsApp. Please try again.");
    }
  };

  const handleEmailClick = () => {
    const emailSubject = encodeURIComponent(`Regarding ${listing.name}`);
    const emailLink = `mailto:${landlord.email}?subject=${emailSubject}&body=${message}`;
    openLink(emailLink);
  };

  const handlePhoneCallClick = () => {
    window.location.href = `tel:${landlord.phone_number}`;
  };

  // const handleFacebookClick = () => {
  //   if (landlord.facebookUsername) {
  //     const facebookLink = `https://www.facebook.com/${landlord.facebookUsername}`;
  //     openLink(facebookLink);
  //   } else {
  //     alert("Landlord's Facebook username is not available.");
  //   }
  // };

  // const handleInstagramClick = () => {
  //   if (landlord.instagramUsername) {
  //     const instagramLink = `https://www.instagram.com/${landlord.instagramUsername}`;
  //     openLink(instagramLink);
  //   } else {
  //     alert("Landlord's Instagram username is not available.");
  //   }
  // };

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <div className="flex gap-2">
            <span className="font-semibold">Phone Number:</span>
            <span>{landlord.phone_number}</span>
          </div>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>
          <div className="flex gap-2">
            <button
              onClick={handleEmailClick}
              className="bg-blue-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
            >
              <FaEnvelope className="inline-block" size={30} />
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-400 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
            >
              <FaWhatsapp className="inline-block" size={30} />
            </button>
            <button
              onClick={handlePhoneCallClick}
              className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
            >
              <FaPhone className="inline-block" size={30} />
            </button>
            {/* <button
              onClick={handleFacebookClick}
              className="bg-blue-800 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
            >
              <FaFacebook className="inline-block" size={30} />
            </button>
            <button
              onClick={handleInstagramClick}
              className="bg-pink-500 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
            >
              <FaInstagram className="inline-block" size={30} />
            </button> */}
          </div>
        </div>
      )}
    </>
  );
}
