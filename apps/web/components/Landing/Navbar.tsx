'use client';

import { useEffect, useState } from 'react';
import { Input } from '@ui/input';
import Image from 'next/image';
import { Button } from '@ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../app/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { Search } from 'lucide-react';

interface UserProfile {
  name: string;
  image_url: string;
}

const Navbar = () => {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get('accessToken');
      if (!isLoggedIn || !token) {
        setUserProfile(null);
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_DEV_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setUserProfile(null);
      }
    };
    fetchUserProfile();
  }, [isLoggedIn]);
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/Wi_Garn.jpg" alt="Logo" width={40} height={40} />
          <span className="font-semibold">WiGarn</span>
        </Link>
      </div>

      <div className="flex w-full max-w-xl items-center gap-2 rounded-xl border">
        {/* <Search className="text-muted-foreground ml-2" width={20} height={20} /> */}
        <Input
          icon={
            <Search
              className="text-muted-foreground mx-2"
              width={20}
              height={20}
            />
          }
          className="w-full rounded-full border-none outline-none focus:ring-0"
          placeholder="Search restaurants, cuisines..."
        />
      </div>
      <div>
        {isLoggedIn ? (
          <Avatar>
            {userProfile?.image_url && (
              <AvatarImage src={userProfile?.image_url} alt="User Avatar" />
            )}
            <AvatarFallback>
              {userProfile?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div>
            <Button
              className="cursor-pointer"
              onClick={() => router.push('/auth/signin')}
            >
              Login
            </Button>
            <Button
              className="cursor-pointer"
              onClick={() => router.push('/auth/signup')}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
