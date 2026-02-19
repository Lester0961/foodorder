import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! (placeholder)');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-10">

      <div className="max-w-[900px] mx-auto">

        <section className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-2 text-gray-800">Get in Touch</h1>
          <p className="text-lg text-gray-600">
            Have questions? We're here to help. Reach out to our team or check out our frequently asked questions.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10">

          {/* Left - Form */}
          <form onSubmit={handleSubmit} className="bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Contact Form</h2>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            />

            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              rows={5}
              className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:border-gray-500 resize-y"
            />

            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-4 text-lg font-bold rounded hover:bg-gray-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Right - Sidebar info */}
          <aside className="space-y-6">

            <div className="bg-gray-100 p-6">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <p className="mb-2">📞 (123) 456-7890</p>
              <p className="mb-2">📧 info@lutongpinoy.ph</p>
              <p>📍 123 Mabini St. Manila, Philippines</p>
            </div>

            <div className="bg-gray-100 p-6">
              <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
              <p>Mon - Sat: 10:00 AM - 10:00 PM</p>
              <p>Sunday: 10:00 AM - 8:00 PM</p>
            </div>

          </aside>

        </div>

      </div>

    </div>
  );
}