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
import { Search, Utensils } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@ui/dropdown-menu';

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
    <div className="border-accent-foreground/20 fixed z-99 w-full border-b backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-10 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-primary text-primary-foreground grid h-8 w-8 place-items-center rounded-lg">
              <Utensils size={18} />
            </span>
            <span className="font-semibold">WiGarn</span>
          </Link>
        </div>
        {isLoggedIn && (
          <div className="border-accent-foreground bg-accent flex w-full max-w-2xl items-center gap-1 rounded-full border">
            <Search
              className="text-muted-foreground ml-2"
              width={20}
              height={20}
            />

            <Input
              className="h-10 w-full border-none outline-none focus:ring-0"
              placeholder="Search restaurants, cuisines..."
            />
          </div>
        )}
        <div>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar
                  className="bg-secondary text-muted-foreground cursor-pointer px-4 py-2 font-medium"
                  onClick={() => router.push('/profile')}
                >
                  {userProfile?.image_url && (
                    <AvatarImage
                      src={userProfile?.image_url}
                      alt="User Avatar"
                    />
                  )}
                  <AvatarFallback className="text-lg">
                    {userProfile?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                </DropdownMenuGroup>
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuLabel>
                  <Button
                    className="cursor-pointer bg-transparent text-red-500"
                    onClick={() => logout()}
                  >
                    Log out
                  </Button>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-4">
              <Button
                className="ring-primary cursor-pointer ring-1"
                onClick={() => router.push('/auth/signin')}
              >
                Sign In
              </Button>
              <Button
                className="text-primary ring-primary cursor-pointer bg-transparent ring-1"
                onClick={() => router.push('/auth/signup')}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
