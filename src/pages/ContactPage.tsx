import { useState, useEffect } from "react";
import { Mail, MapPin, MessageSquare, Send, Sparkles } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { toast } from "sonner";
import AnimatedHeadline from "../components/AnimatedHeadline";
import SEO from "../components/SEO";

const CONTACT_PLACEHOLDERS = [
  "I need help integrating a payment gateway...",
  "I want to report a bug with the editor...",
  "Can you add support for custom domains?",
  "I have a question about my subscription plan...",
  "I'd love to collaborate on a partnership...",
];

function useTypingPlaceholder(placeholders: string[], typingSpeed = 50, deletingSpeed = 30, pauseDuration = 2000) {
  const [placeholder, setPlaceholder] = useState("");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentFullText = placeholders[currentIdx];

    if (!isDeleting) {
      if (placeholder.length < currentFullText.length) {
        timer = setTimeout(() => {
          setPlaceholder(currentFullText.slice(0, placeholder.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (placeholder.length > 0) {
        timer = setTimeout(() => {
          setPlaceholder(currentFullText.slice(0, placeholder.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentIdx((prevIdx) => (prevIdx + 1) % placeholders.length);
      }
    }

    return () => clearTimeout(timer);
  }, [placeholder, isDeleting, currentIdx, placeholders, typingSpeed, deletingSpeed, pauseDuration]);

  return placeholder;
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const messagePlaceholder = useTypingPlaceholder(CONTACT_PLACEHOLDERS);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      return toast.error("Please fill in all fields.");
    }

    try {
      setSending(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSending(false);
      toast.success("Thank you! Your message has been sent successfully.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setSending(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.8,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start px-6 bg-black text-white overflow-hidden pb-24">
      <SEO
        title="Contact Our Team"
        description="Have questions about Genixor? Get in touch with our team for support, feature requests, partnership queries, or custom plan inquiries."
        keywords="contact Genixor, support email, developer feedback, custom website builder help"
      />
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center w-full mt-32 mb-8"
      >
        <AnimatedHeadline
          as="h1"
          className="text-4xl md:text-5xl text-white tracking-tight font-light"
          triggerOnView={false}
        >
          Contact <span className="italic text-[#A6FF5D]">Us</span>
        </AnimatedHeadline>
      </motion.div>

      {/* CONTENT GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
      >
        {/* LEFT COLUMN: CONTACT DETAILS STACK */}
        <motion.div variants={item} className="lg:col-span-5 flex flex-col gap-6 justify-between order-2 lg:order-1">
          {/* Card 1: Direct Channels */}
          <div className="bg-neutral-900/80 border border-neutral-800 hover:border-[#A6FF5D]/40 transition duration-300 rounded-3xl p-6 backdrop-blur flex flex-col gap-6">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <Mail size={18} className="text-[#A6FF5D]" /> Channels
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-neutral-950/80 border border-neutral-800 rounded-xl text-neutral-400">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">Email</p>
                  <a href="mailto:support@genixor.ai" className="text-white hover:text-[#A6FF5D] text-sm transition">
                    support@genixor.ai
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-neutral-950/80 border border-neutral-800 rounded-xl text-neutral-400">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">HQ</p>
                  <p className="text-white text-sm">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Developer Community */}
          <div className="bg-neutral-900/80 border border-neutral-800 hover:border-[#A6FF5D]/40 transition duration-300 rounded-3xl p-6 backdrop-blur flex flex-col gap-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <MessageSquare size={18} className="text-[#A6FF5D]" /> Community
            </h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Need quick help? Join our discord community to chat directly with our team and fellow creators.
            </p>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white text-xs font-medium py-3 px-4 rounded-xl transition w-full text-center"
            >
              Join Discord Server
            </a>
          </div>

          {/* Card 3: Response time */}
          <div className="bg-neutral-900/80 border border-neutral-800 hover:border-[#A6FF5D]/40 transition duration-300 rounded-3xl p-6 backdrop-blur flex items-center gap-5">
            <div className="p-3 bg-[#A6FF5D]/10 border border-[#A6FF5D]/20 rounded-2xl shrink-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A6FF5D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <p className="text-white text-sm font-medium">We reply within 24 hours</p>
              <p className="text-neutral-500 text-xs mt-0.5">Mon – Fri, 9am – 6pm PST</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: CONTACT FORM */}
        <motion.div variants={item} className="lg:col-span-7 order-1 lg:order-2">
          <form
            onSubmit={handleSubmit}
            className="bg-neutral-900/80 border border-neutral-800 hover:border-[#A6FF5D]/20 transition duration-300 rounded-3xl p-8 backdrop-blur flex flex-col gap-6 h-full"
          >
            <h2 className="text-xl font-medium tracking-tight text-white">
              Send a Message
            </h2>

            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs text-neutral-400 font-medium">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#A6FF5D]/40 transition"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs text-neutral-400 font-medium">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#A6FF5D]/40 transition"
              />
            </div>

            {/* Message */}
            <div className="space-y-2 flex-grow flex flex-col">
              <label htmlFor="message" className="text-xs text-neutral-400 font-medium mb-2 block">
                How can we help?
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={messagePlaceholder}
                rows={5}
                className="w-full flex-grow bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#A6FF5D]/40 transition resize-none min-h-[120px]"
              />
            </div>

            {/* Submit */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center gap-2 bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-black font-medium text-sm py-3.5 rounded-xl disabled:cursor-not-allowed transition disabled:opacity-50 mt-4"
            >
              {sending ? (
                <>
                  <Sparkles size={16} className="animate-pulse" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
