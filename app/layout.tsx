import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OLEE Ecommerce Dashboard",
  description:
    "Manage and monitor your eCommerce store with the powerful admin dashboard.",
  keywords:
    "eCommerce, admin dashboard, management, monitoring, orders, products, customers",
  author: "OLEE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <ThemeProvider attribute='class' defaultTheme='system'>
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
