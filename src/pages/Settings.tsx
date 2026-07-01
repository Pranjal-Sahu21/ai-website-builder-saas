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
      transition: { staggerChildren: 0.12 },
    },
  };

  const item : Variants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div
      className="bg-[radial-gradient(rgba(166,255,93,0.15)_1.5px,transparent_0)] 
      bg-size-[20px_20px] 
      bg-position-[-1px_-1px] bg-fixed min-h-screen pb-24"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col items-center justify-center"
      >
        {/* HEADER */}
        <div className="text-center space-y-3 w-full">
          <motion.div variants={item}>
            <AnimatedHeadline
              as="h1"
              className="text-3xl md:text-4xl pt-32 text-white"
              triggerOnView={false}
            >
              Account <span className="italic text-[#a6ff5d]">Settings</span>
            </AnimatedHeadline>
          </motion.div>
          <motion.p
            variants={item}
            className="text-white/50 text-sm max-w-md mx-auto mt-4"
          >
            Manage your profile information
          </motion.p>
        </div>

        {/* CHANGING CARDS */}
        <div className="w-full mt-12 p-4 flex flex-col gap-6 justify-center items-center">
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
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
