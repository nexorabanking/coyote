import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Coyote Logistics',
  description: 'Coyote Logistics',
  generator: 'Coyote Logistics',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
