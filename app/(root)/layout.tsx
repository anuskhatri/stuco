import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google"

//font
const inter = Inter({ subsets: ["latin"] })

//internal imports
import "../globals.css";
import TopBar from "@/components/shared/TopBar";
import LeftSideBar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import BottomBar from "@/components/shared/BottomBar";
import { dark } from "@clerk/themes";

export const metadata = {
  title: 'STUCO',
  describtion: 'Student Connect'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            variables: {
              colorText: 'white',
            },
          }}
        >
          <TopBar />

          <main className="flex flex-row">
            <LeftSideBar />

            <section className="main-container">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>

            <RightSidebar />
          </main>

          <BottomBar />
        </ClerkProvider>

      </body>
    </html>
  );
}
