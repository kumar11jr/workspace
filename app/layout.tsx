import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Workspace',
  description: 'A connected workspace for Professional and private work',
  icons:{
    icon:[
      {
        media:"(prefers-color-scheme: dark)",
        url:"/logo-dark.svg",
        href:"/logo-dark.svg"
      },
      {
        media:"(prefers-color-scheme: light)",
        url:"/logo.svg",
        href:"/logo.svg"
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
