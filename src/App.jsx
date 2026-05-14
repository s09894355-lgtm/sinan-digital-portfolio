import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import emailjs from "emailjs-com";

function usePageTracking() {
  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: window.location.pathname,
      });
    }
  }, []);
}

export default function App() {
  usePageTracking();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(saved);
  }, []);

  const login = (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    setUser(name);
    localStorage.setItem("user", name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        e.target,
        "YOUR_PUBLIC_KEY"
      )
      .then(
        () => alert("Message sent 🚀"),
        () => alert("Failed ❌")
      );

    e.target.reset();
  };

  // 🔐 LOGIN PAGE
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#050b1f] to-[#020817]">
        <motion.form
          onSubmit={login}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-md w-[90%] max-w-md"
        >
          <h1 className="text-3xl mb-6 text-center">Login</h1>

          <input
            name="name"
            placeholder="Enter your name"
            className="w-full p-3 mb-4 rounded bg-black/40 border border-white/10"
          />

          <button className="w-full py-3 bg-blue-600 rounded-full">
            Login
          </button>
        </motion.form>
      </div>
    );
  }

  // 🌌 MAIN SITE
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050b1f] via-[#071a3a] to-[#020817] text-white">

      {/* NAV */}
      <nav className="flex justify-between px-8 py-5 bg-white/5 border-b border-white/10 backdrop-blur-md">
        <h1 className="font-bold">Sinan Portfolio</h1>

        <div className="flex gap-4 items-center">
          <span className="text-blue-400">Hi {user}</span>
          <button onClick={logout} className="text-red-400">
            Logout
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Wedding Invitation Developer
        </motion.h1>

        <p className="mt-4 text-gray-300">
          I build modern animated wedding invitation websites.
        </p>
      </section>

      {/* PROJECT */}
      <section className="px-10 py-10">
        <h2 className="text-2xl mb-6">My Project</h2>

        <motion.a
          href="https://s09894355-lgtm.github.io/shiamasheri-junaid/"
          target="_blank"
          whileHover={{ scale: 1.05 }}
          className="block p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          Wedding Invitation Website
        </motion.a>
      </section>

      {/* CONTACT */}
      <section className="px-10 py-20">
        <h2 className="text-2xl mb-6 text-center">Contact Me</h2>

        <form
          onSubmit={sendEmail}
          className="max-w-xl mx-auto bg-white/5 p-8 rounded-2xl border border-white/10"
        >
          <input name="name" placeholder="Name" className="w-full p-3 mb-4 bg-black/40 rounded" />
          <input name="email" placeholder="Email" className="w-full p-3 mb-4 bg-black/40 rounded" />
          <textarea name="message" placeholder="Message" className="w-full p-3 mb-4 bg-black/40 rounded" />

          <button className="w-full py-3 bg-blue-600 rounded-full">
            Send
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-500">
        © 2026 Sinan Portfolio
      </footer>
    </div>
  );
}
