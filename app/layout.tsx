import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmplexserif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight:["400","700"],
  variable: "--font-ibm-plex-sarif"
})

export const metadata: Metadata = {
  title: "Banking",
  description: "Create the next banking app",
  icons:{
    icon:"../public/icons/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${ibmplexserif.variable} ${geistSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
