import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa"; // Import icons for WhatsApp, email, and phone

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
        const res = await fetch(
          `http://localhost:3000http://localhost:3000http://localhost:3000/api/user/${listing.userRef}`
        );
        const data = await res.json();
        console.log(data);
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const handleWhatsAppClick = () => {
    // Prompt the user to enter the country code
    const countryCode = prompt("Please enter the country code:");

    // Validate that the country code is entered
    if (!countryCode) {
      alert("Country code is required.");
      return;
    }

    const whatsappMessage = encodeURIComponent(
      `Regarding ${listing.name}: ${message}`
    );

    // Include the country code in the WhatsApp link
    const whatsappLink = `https://wa.me/${countryCode}${landlord.phone_number}?text=${whatsappMessage}`;

    // Open the WhatsApp link in a new tab
    const whatsappWindow = window.open(whatsappLink, "_blank");

    // Check if the new tab is opened successfully
    if (whatsappWindow) {
      // Handle the case when the message is sent successfully
      const checkInterval = setInterval(() => {
        if (whatsappWindow.closed) {
          // WhatsApp window is closed, assume the message was sent successfully
          clearInterval(checkInterval);
          alert("Message sent successfully!");
          // Clear the input
          setMessage("");
        }
      }, 1000);
    } else {
      // Handle the case when the new tab could not be opened
      alert("Failed to open WhatsApp. Please try again.");
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
