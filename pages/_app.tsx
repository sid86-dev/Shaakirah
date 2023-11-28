import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Menu from "@/components/Menu";
import { useState } from "react";
import { Inconsolata } from "next/font/google";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { UserProvider } from "@/context/userStore";

// use Inconsolata font
const inconsolata = Inconsolata({
  preload: true,
  subsets: ["latin-ext"],
  weight: ["400", "700", "500"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <UserProvider>
      <main className={`bg-[#eee7de] h-screen ${inconsolata.className}`}>
        <div
          className={`flex flex-row  ${
            !isOpen
              ? "-translate-x-72 transition-transform duration-500"
              : "translate-x-0 transition-transform duration-500"
          }`}
        >
          <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
          <Component {...pageProps} />
        </div>
      </main>
    </UserProvider>
  );
}
