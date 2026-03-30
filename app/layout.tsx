import type { Metadata } from 'next'
import { Playfair_Display, Lora } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/app/_components/theme-provider'
import { Toaster } from 'sonner'
import ToastListener from '@/app/_components/ui/toast-listener'
import { Suspense } from 'react'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
})

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Book Review App',
  description:
    'Discover, review, and share your favorite books with the community.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200 font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster position="top-center" richColors theme="system" />
          <Suspense fallback={null}>
            <ToastListener />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
