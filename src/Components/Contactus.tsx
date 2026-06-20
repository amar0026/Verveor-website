import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const contactInfo = [
  {
    icon: <Phone className="w-5 h-5 text-orange-500" />,
    label: "Phone",
    value: "+1234567890",
  },
  {
    icon: <Mail className="w-5 h-5 text-orange-500" />,
    label: "Email",
    value: "hello@gmail.com",
  },
  {
    icon: <MapPin className="w-5 h-5 text-orange-500" />,
    label: "Address",
    value: "Xabmjbvbjdb Ysaas Za, USaagbbsjsgb",
  },
  {
    icon: <Clock className="w-5 h-5 text-orange-500" />,
    label: "Working Hours",
    value: "Mon-Fri 10:00 AM – 7:00 PM\nSat-Sun 10:00 AM – 4:00 PM",
  },
];

export default function Contact() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12">
      <div ref={ref} className="max-w-4xl mx-auto">

        {/* Top badge */}
        <div
          className={`flex justify-center mt-5  mb-6 transition-all duration-500 ease-out
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          <span className="border border-orange-400 text-orange-500 text-xs font-semibold px-4 py-1.5 rounded-full">
            Contact Us
          </span>
        </div>

        {/* Header */}
        <div
          className={`text-center mb-10 transition-all duration-600 ease-out delay-100
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
            We're Here to Help You
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Have question or need support?<br />Reach out to us anytime
          </p>
        </div>

        {/* Form + Info cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 transition-all duration-700 ease-out delay-200
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {/* Get in Touch Form */}
          <div className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-base font-bold text-gray-900">Get in Touch</h3>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">Your Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">Your Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Write your message..."
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200 transition-all resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200 cursor-pointer mt-1"
            >
              Send Message
            </button>
          </div>

          {/* Contact Information */}
          <div className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-5">
            <h3 className="text-base font-bold text-gray-900">Contact Information</h3>

            {contactInfo.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900 mb-0.5">{item.label}</p>
                  <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-line">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Google Map embed */}
        <div
          className={`w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm transition-all duration-700 ease-out delay-400
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <iframe
            title="Vervoer Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.9!2d-79.3832!3d43.6532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDM5JzExLjUiTiA3OcKwMjInNTkuNSJX!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            width="100%"
            height="280"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  );
}