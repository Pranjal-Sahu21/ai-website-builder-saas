import { useSession } from "@/lib/auth-client";
import {
  AccountSettingsCards,
  ChangePasswordCard,
  DeleteAccountCard,
} from "@daveyplate/better-auth-ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion, type Variants } from "framer-motion";
import AnimatedHeadline from "../components/AnimatedHeadline";

const Settings = () => {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isPending && !session?.user) {
      navigate("/auth/sign-in");
      toast("Please login to change account settings.");
    }
  }, [session?.user, isPending]);

  // Stagger container and entry animations matching GeneratePage & NotFound
  const container : Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 1.1, // Delay cards until Account Settings title blurs in
      },
    },
  };

  const item : Variants = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center space-y-3 w-full"
      >
        <AnimatedHeadline
          as="h1"
          className="text-4xl md:text-5xl pt-32 text-white tracking-tight font-light"
          triggerOnView={false}
        >
          Account <span className="italic text-[#a6ff5d]">Settings</span>
        </AnimatedHeadline>
      </motion.div>

      {/* CHANGING CARDS */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full mt-12 p-4 flex flex-col gap-6 justify-center items-center"
      >
        <motion.div variants={item} className="w-full max-w-xl">
          <AccountSettingsCards
            classNames={{
              card: {
                base: "bg-neutral-950 ring ring-[#a6ff5d]/20 max-w-xl mx-auto",
                footer: "bg-neutral-950 ring ring-[#a6ff5d]/10",
              },
            }}
          />
        </motion.div>
        <motion.div variants={item} className="w-full max-w-xl">
          <ChangePasswordCard
            classNames={{
              base: "bg-neutral-950 ring ring-[#a6ff5d]/20 max-w-xl mx-auto",
              footer: "bg-neutral-950 ring ring-[#a6ff5d]/10",
            }}
          />
        </motion.div>
        <motion.div variants={item} className="w-full max-w-xl">
          <DeleteAccountCard
            classNames={{
              base: "bg-neutral-950 max-w-xl mx-auto",
              footer: "bg-neutral-950",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Settings;
