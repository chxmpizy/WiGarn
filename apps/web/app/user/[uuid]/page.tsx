import Navbar from '@/components/Navbar';
import { ProfileSection } from '@/components/Profile/ProfileSection';

interface PageProps {
  params: Promise<{ uuid: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { uuid } = await params;

  return (
    <>
      <Navbar />
      <ProfileSection uuid={uuid} />
    </>
  );
};

export default Page;
