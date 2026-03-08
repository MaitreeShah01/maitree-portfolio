import type { Metadata } from 'next'
import './globals.css'
import AnimatedBackground from '@/components/AnimatedBackground'

export const metadata: Metadata = {
  title: 'Maitree Shah | Data Analyst',
  description: 'Portfolio of Maitree Shah, Data Analyst with 3+ years experience in SQL, Python, Tableau, and Power BI.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="antialiased font-sans selection:bg-blue-500/30">
        <AnimatedBackground />
        {children}
      </body>
    </html>
  )
}