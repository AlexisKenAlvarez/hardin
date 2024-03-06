import "@/styles/globals.css";

import localFont from "next/font/local";

import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";
import { headers } from "next/headers";
import { cache } from "react";

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

const sfpro = localFont({
  src: [
    {
      path: "../../fonts/SFPRODISPLAYREGULAR.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/SFPRODISPLAYMEDIUM.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/SFPRODISPLAYBOLD.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
})

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
      <body className={`font-sans ${sfpro.variable} ${fontspring.variable}`}>
        <TRPCReactProvider headersPromise={getHeaders()}>
          <>
            {children}
            <Toaster closeButton position="top-center" />
          </>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
