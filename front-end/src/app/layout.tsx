"use client";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="winter" lang="en">
      <head>
        <title>Lending club predict</title>
        <meta name='description' content='Description' />
        <link rel="apple-touch-icon.png" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="x-icon" sizes="16x16" href="/favicon.ico" />
      </head>
  
      <body className={inter.className}>
        <div className="body">
          {children}
        </div>
      </body>
    
    </html>
  );
}
