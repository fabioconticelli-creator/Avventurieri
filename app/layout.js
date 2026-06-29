import './globals.css'

export const metadata = {
  title: 'Terre Perdute',
  description: 'Gestione campagna D&D',
  manifest: '/manifest.json',
  themeColor: '#0e0b14',
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@400;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="apple-mobile-web-app-title" content="House Valerius"/>
      </head>
      <body>{children}</body>
    </html>
  )
}
