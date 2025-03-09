import "@/styles/globals.css";
import { Albert_Sans, Montserrat, STIX_Two_Text } from "next/font/google";
import localFont from "next/font/local";

import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/providers/SupabaseSessionProvider";

export const metadata = {
  title: "HardinCafe",
  description: "Welcome to HardinCafe",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
