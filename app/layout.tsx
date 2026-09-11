import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Bitmap display font — used only for OS branding, headings, and big
// system moments (boot, achievements, virus event). Everyday UI text
// stays in the mono/sans faces so it remains readable at small sizes.
const pixelDisplay = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "THENGA OS | The Coconut Operating System",
  description: "A browser-based interactive operating system simulation for a coconut. No kernel, just fiber.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${pixelDisplay.variable} h-full antialiased`}
    >
      <body className="h-screen w-screen overflow-hidden select-none bg-[#8fd6e8] text-[#22160b]">
        {children}
      </body>
    </html>
  );
}
