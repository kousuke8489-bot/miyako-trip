import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '宮古島旅行 2026🌊',
  description: '家族4人で宮古島へ！',
}

export const viewport: Viewport = {
  themeColor: '#00aad4',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-ocean-50">{children}</body>
    </html>
  )
}
