import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "your degen pov",
  description: "We're all degens here...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="footer">
          <p>Degen POV is a <a href="https://degenstudios.media/" target="_blank"><u>Degen Studios</u></a> project.</p>
        </footer>
      </body>
    </html>
  );
}
