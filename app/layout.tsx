import './globals.css'

export const metadata = {
  title: 'OLLIVER',
  description: 'Creative Intelligence System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}