import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Menu from "@/components/Menu/Index";
import { useState } from "react";
import { Inconsolata } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
    >
      <UserProvider>
        <main className={`bg-[#eee7de] h-screen ${inconsolata.className}`}>
          <div
            className={`flex flex-row  ${
              !isOpen
                ? "-translate-x-56 transition-transform duration-500"
                : "translate-x-12 transition-transform duration-500"
            }`}
          >
            <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
            <Component {...pageProps} />
          </div>
        </main>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}
