import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Resume & Certificate Manager',
  description: 'AI-powered resume builder and certificate management platform',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#ffffff',
          colorBackground: '#000000',
          colorInputBackground: '#1a1a1a',
          colorInputText: '#ffffff',
        },
      }}
    >
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-black text-white min-h-screen`}>
          <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
