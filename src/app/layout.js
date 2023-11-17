import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/nav.js'
import Footer from '@/components/footer.js'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Incented Protocol',
  description: 'A web 2 version of Incented Protocol, a web 3 application.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
