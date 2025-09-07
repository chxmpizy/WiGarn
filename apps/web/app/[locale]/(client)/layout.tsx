import Navbar from '@src/shared/components/Navbar';
import Footer from '@src/shared/components/Footer';

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
