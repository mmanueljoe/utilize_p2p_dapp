import './globals.css';
import type { Metadata } from 'next';
// import { Plus_Jakarta_Sans } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Web3Provider } from '../components/Web3Provider';

// const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Utilize - Where Crypto Powers Real Life',
  description: 'Pay utility bills with crypto directly. No middlemen. Choose from trusted vendors or P2P offers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* className={`${jakarta.className} bg-[#0F0F0F]`} */}
      <body>
        <Web3Provider>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </Web3Provider>
      </body>
    </html>
  );
}