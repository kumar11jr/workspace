import { Toaster } from 'sonner'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/Providers/theme-provider'
import { ConvexClientProvider } from '@/components/Providers/convex-provider'
import { EdgeStoreProvider } from '../lib/edgestore';

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
        <EdgeStoreProvider>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange storageKey='my-theme'>
          <Toaster position='bottom-right' />
          {children}
        </ThemeProvider>
        </EdgeStoreProvider>
        </ConvexClientProvider>
        </body>
    </html>
  )
}
