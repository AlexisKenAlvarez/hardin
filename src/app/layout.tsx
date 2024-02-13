import "@/styles/globals.css";

import { Poppins } from "next/font/google";
import localFont from "next/font/local";

import { TRPCReactProvider } from "@/trpc/react";
import { headers } from "next/headers";
import { cache } from "react";
import { Toaster } from "@/components/ui/sonner";

const fontspring = localFont({
  src: [
    {
      path: "../../fonts/Fontspring-DEMO-theseasons-reg.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/Fontspring-DEMO-theseasons-lt.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/Fontspring-DEMO-theseasons-bd.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-fontspring",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "HardinCafe",
  description: "Welcome to HardinCafe",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getHeaders = cache(async () => headers());
  return (
    <html lang="en">
      <body className={`font-sans ${poppins.variable} ${fontspring.variable}`}>
        <TRPCReactProvider headersPromise={getHeaders()}>
          <>
            {children}
            <Toaster closeButton position="bottom-center" />
          </>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
