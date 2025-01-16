import "@/styles/globals.css";
import { Albert_Sans, Montserrat } from "next/font/google";


import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "HardinCafe",
  description: "Welcome to HardinCafe",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const Albert = Albert_Sans({ 
  subsets: ['latin'], 
  variable: '--font-title'
 })

 const Mont = Montserrat({
  subsets: ['latin'], 
  variable: '--font-sans'
 })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${Albert.variable} ${Mont.variable}`}>
        <>
          {children}
          <Toaster closeButton position="top-center" />
        </>
      </body>
    </html>
  );
}
