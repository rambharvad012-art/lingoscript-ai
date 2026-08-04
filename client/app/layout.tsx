import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LingoScript AI",
  description: "AI Video Transcription and Analysis Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
