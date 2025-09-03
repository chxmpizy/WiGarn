import Navbar from '@src/shared/components/Navbar';

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
