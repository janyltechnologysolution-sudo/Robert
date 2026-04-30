import type { Metadata } from "next";
import { Rajdhani, Bebas_Neue } from "next/font/google";
import "./globals.css";
import SideNav from "./components/SideNav";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Kuya_Robert // YouTube Channel",
  description:
    "Gaming, vlogging, entertainment and a whole lot of other stuffs. Welcome to Kuya Robert's channel!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ paddingLeft: "56px" }}  
        /* 56px = collapsed sidebar width — keeps content from hiding behind it */
      >
        <SideNav />
        {children}
      </body>
    </html>
  );
}