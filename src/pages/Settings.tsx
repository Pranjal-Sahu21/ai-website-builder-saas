import {
  AccountSettingsCards,
  ChangePasswordCard,
  DeleteAccountCard
} from "@daveyplate/better-auth-ui";
import { useEffect } from "react";

const Settings = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="bg-[radial-gradient(rgba(166,255,93,0.15)_1.5px,transparent_0)] 
      bg-size-[20px_20px] 
      bg-position-[-1px_-1px]"
    >
      {/* HEADER */}
      <div className="text-center space-y-3 mt-32">
        <h1 className="text-3xl md:text-4xl">
          Account <span className="italic text-[#a6ff5d]">Settings</span>
        </h1>
        <p className="text-white/50 text-sm max-w-md mx-auto mt-4">
          Manage your profile information
        </p>
      </div>

      {/* CHANGING CARDS */}
      <div className="w-full mt-12 p-4 flex flex-col gap-6 justify-center items-center">
        <AccountSettingsCards
          classNames={{
            card: {
              base: "bg-neutral-950 ring ring-[#a6ff5d]/20 max-w-xl mx-auto",
              footer: "bg-neutral-950 ring ring-[#a6ff5d]/10",
            },
          }}
        />
        <div className="w-full">
          <ChangePasswordCard
            classNames={{
              base: "bg-neutral-950 ring ring-[#a6ff5d]/20 max-w-xl mx-auto",
              footer: "bg-neutral-950 ring ring-[#a6ff5d]/10",
            }}
          />
        </div>
        <div className="w-full">
          <DeleteAccountCard
            classNames={{
              base: "bg-neutral-950 max-w-xl mx-auto",
              footer: "bg-neutral-950",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
