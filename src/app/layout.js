import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "BM Motors | Premium Multibrand Car Workshop & Detailing | Indore",
  description: "Indore's premier multibrand car workshop. Specializing in Paint Protection Film (PPF), Ceramic Coating, Paint Restoration, Vinyl Wraps, and complete mechanical services.",
  keywords: "BM Motors, Car Workshop Indore, Car Detailing Indore, PPF Indore, Ceramic Coating, Car Servicing Vijay Nagar, Indore Car Repair",
  openGraph: {
    title: "BM Motors | Multibrand Workshop & Detailing",
    description: "Give your car a fresh new look. Visit BM Motors in Vijay Nagar, Indore for professional detailing and car repairs.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
