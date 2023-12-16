import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onPhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const handleWhatsAppClick = async () => {
    const countryCode = prompt("Please enter the country code:");

    if (!countryCode) {
      alert("Country code is required.");
      return;
    }

    const whatsappMessage = encodeURIComponent(
      `Regarding ${listing.name}: ${message}`
    );

    const whatsappLink = `https://wa.me/${countryCode}${landlord.phone_number}?text=${whatsappMessage}`;

    try {
      // Use window.open to open a new tab
      const whatsappWindow = window.open(whatsappLink, "_blank");

      if (whatsappWindow) {
        // Poll the window until it's closed
        const checkInterval = setInterval(() => {
          if (whatsappWindow.closed) {
            clearInterval(checkInterval);
            alert("Message sent successfully!");
            setMessage("");
          }
        }, 1000);
      } else {
        alert("Failed to open WhatsApp. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleEmailClick = () => {
    const emailSubject = encodeURIComponent(`Regarding ${listing.name}`);
    const emailLink = `mailto:${landlord.email}?subject=${emailSubject}&body=${message}`;
    window.location.href = emailLink;
  };

  const handlePhoneCallClick = () => {
    window.location.href = `tel:${landlord.phone_number}`;
  };

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
              className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
            >
              <FaEnvelope className="inline-block mr-2" />
              Email
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
            >
              <FaWhatsapp className="inline-block mr-2" />
              WhatsApp
            </button>
            <button
              onClick={handlePhoneCallClick}
              className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
            >
              <FaPhone className="inline-block mr-2" />
              Phone Call
            </button>
          </div>
        </div>
      )}
    </>
  );
}
