'use client';

import { useEffect, useState } from 'react';
import { Input } from '@ui/input';
import { Button } from '@ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '../app/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { CreditCard, LogOut, Search, User, Utensils } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@ui/dropdown-menu';
import type { RestaurantType } from '@/lib/types';

interface UserProfile {
  uuid: string;
  name: string;
  image_url: string;
}

const Navbar = () => {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    let ignore = false;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_DEV_URL}/restaurants`)
      .then((response) => {
        if (!ignore) {
          setRestaurants(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching restaurants:', error);
      });

    return () => {
      ignore = true;
    };
  }, [isLoggedIn]);

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const searchResults =
    isLoggedIn && normalizedSearchTerm
      ? restaurants
          .filter((restaurant) =>
            [
              restaurant.name,
              restaurant.category,
              restaurant.description,
              restaurant.city,
              restaurant.address,
            ]
              .filter(Boolean)
              .some((value) =>
                value!.toLowerCase().includes(normalizedSearchTerm),
              ),
          )
          .slice(0, 6)
      : [];

  const openRestaurant = (id: number) => {
    setSearchTerm('');
    setIsSearchFocused(false);
    router.push(`/${id}`);
  };

  return (
    <div className="border-accent-foreground/20 fixed z-99 w-full border-b bg-white/90 backdrop-blur-md">
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
          <div className="relative w-full max-w-2xl">
            <div className="border-primary/80 bg-accent/80 focus-within:ring-primary/20 flex h-12 w-full items-center gap-3 rounded-full border px-4 transition-shadow focus-within:ring-4">
              <Search className="text-muted-foreground h-6 w-6 shrink-0" />

              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && searchResults[0]) {
                    openRestaurant(searchResults[0].id);
                  }
                  if (event.key === 'Escape') {
                    setIsSearchFocused(false);
                  }
                }}
                className="placeholder:text-muted-foreground h-full w-full border-none bg-transparent px-0 text-base shadow-none outline-none focus-visible:ring-0"
                placeholder="Search restaurants, cuisines..."
              />
            </div>

            {isSearchFocused && normalizedSearchTerm && (
              <div className="border-border absolute top-14 right-0 left-0 z-100 overflow-hidden rounded-lg border bg-white shadow-lg">
                {searchResults.length > 0 ? (
                  searchResults.map((restaurant) => (
                    <button
                      key={restaurant.id}
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => openRestaurant(restaurant.id)}
                      className="hover:bg-accent flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors"
                    >
                      <span>
                        <span className="text-foreground block font-medium">
                          {restaurant.name}
                        </span>
                        <span className="text-muted-foreground block text-sm">
                          {[restaurant.category, restaurant.city]
                            .filter(Boolean)
                            .join(' · ') || 'Restaurant'}
                        </span>
                      </span>
                      <Utensils className="text-primary h-4 w-4 shrink-0" />
                    </button>
                  ))
                ) : (
                  <div className="text-muted-foreground px-4 py-3 text-sm">
                    No restaurants found.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        <div>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="bg-secondary text-muted-foreground cursor-pointer px-4 py-2 font-medium">
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
              <DropdownMenuContent
                align="end"
                className="border-border z-99 w-52 rounded-lg bg-white p-2 shadow-lg"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-muted-foreground px-3 py-2 text-xs font-medium tracking-wide uppercase">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    className="hover:bg-accent focus:bg-accent flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-base"
                    onClick={() => {
                      if (userProfile?.uuid) {
                        router.push(`/user/${userProfile.uuid}`);
                      }
                    }}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem className="hover:bg-accent focus:bg-accent flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-base">
                    <CreditCard className="h-4 w-4" />
                    Billing
                  </DropdownMenuItem> */}
                </DropdownMenuGroup>
                <DropdownMenuItem
                  className="focus:bg-destructive/10 mt-2 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-base text-red-500 hover:bg-red-50"
                  onClick={() => logout()}
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-4">
              <Button
                className="ring-primary cursor-pointer rounded-2xl ring-1"
                onClick={() => router.push('/auth/signin')}
              >
                Sign In
              </Button>
              <Button
                className="text-primary ring-primary cursor-pointer rounded-2xl bg-transparent ring-1"
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
