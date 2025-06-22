import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { ShipmentProvider } from "@/contexts/shipment-context"
import { Toaster } from "@/components/ui/toaster"
import AuthGuard from "@/components/auth-guard"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ShipmentProvider>
            <AuthGuard>{children}</AuthGuard>
            <Toaster />
          </ShipmentProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
