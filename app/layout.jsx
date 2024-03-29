import { Inter } from "next/font/google";
import "./globals.css";
import "styles/styles.css";
import App from "./app";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Neighbors Hub",
  description: "Description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}><App>{children}</App></body>
    </html>
  );
}
