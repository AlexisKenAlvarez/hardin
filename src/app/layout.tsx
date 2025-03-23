import "@/styles/globals.css";
import { Albert_Sans, Montserrat, STIX_Two_Text } from "next/font/google";
import localFont from "next/font/local";

import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/providers/SupabaseSessionProvider";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://hardincafe.com",
  ),
  title: {  
    default: "Hardin Cafe | Premium Coffee Shop in Taal, Batangas",
    template: "%s | Hardin Cafe",
  },
  description:
    "Experience premium coffee and outdoor dining at Hardin Cafe in Taal, Batangas. Enjoy our signature recipes, peaceful ambiance, and mobile coffee cart rental services.",
  keywords: [
    "Hardin Cafe",
    "coffee shop Taal",
    "Batangas coffee shop",
    "outdoor dining Batangas",
    "mobile coffee cart rental",
    "premium coffee Taal",
    "cafe Batangas",
  ],
  authors: [{ name: "Hardin Cafe" }],
  creator: "Hardin Cafe",
  publisher: "Hardin Cafe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Hardin Cafe",
    title: "Hardin Cafe | Premium Coffee Shop in Taal, Batangas",
    description:
      "Experience premium coffee and outdoor dining at Hardin Cafe in Taal, Batangas. Enjoy our signature recipes, peaceful ambiance, and mobile coffee cart rental services.",
    images: [
      {
        url: "/og-image.jpg", // Make sure to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Hardin Cafe - Premium Coffee Shop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hardin Cafe | Premium Coffee Shop in Taal, Batangas",
    description:
      "Experience premium coffee and outdoor dining at Hardin Cafe in Taal, Batangas",
    images: ["/og-image.jpg"],
    creator: "@hardincafe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
};

const fontSpring = localFont({
  src: [
    {
      path: "../../fonts/Fontspring-DEMO-theseasons-bd.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--fontSpring",
});

const Albert = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-title",
});

const Mont = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const Stix = STIX_Two_Text({
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${Albert.variable} ${Mont.variable} ${Stix.variable} ${fontSpring.variable}`}
      >
        <SessionProvider>
          <ReactQueryProvider>
            <Toaster closeButton position="top-center" />
            <div className="font-sans">{children}</div>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
