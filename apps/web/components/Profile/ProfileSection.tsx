'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import {
  CalendarDays,
  Camera,
  Heart,
  MapPin,
  Pencil,
  // Settings,
  ThumbsUp,
  X,
} from 'lucide-react';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { StarRating } from '@/components/restaurant/components/StarRating';
import type { UserReviewType, UserType } from '@/lib/types';

type ProfileTab = 'reviews' | 'saved' | 'photos';

interface ProfileSectionProps {
  uuid: string;
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('') || 'WG';

const getHandle = (user: UserType) =>
  user.handle ? `@${user.handle}` : `@${user.email.split('@')[0]}`;

const formatJoinedDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));

const formatRelativeDate = (value: string) => {
  const diffMs = Date.now() - new Date(value).getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / 86_400_000));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 14) return `${diffDays} days ago`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 8) return `${diffWeeks} weeks ago`;

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
};

const getRestaurantLocation = (review: UserReviewType) =>
  [review.restaurant?.city, review.restaurant?.state]
    .filter(Boolean)
    .join(', ');

export function ProfileSection({ uuid }: ProfileSectionProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [reviews, setReviews] = useState<UserReviewType[]>([]);
  const [activeTab, setActiveTab] = useState<ProfileTab>('reviews');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    handle: '',
    location: '',
    bio: '',
    image_url: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const loadProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [userResponse, reviewsResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_DEV_URL}/users/${uuid}`),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_DEV_URL}/reviews/user/${uuid}`,
          ),
        ]);

        if (!ignore) {
          setUser(userResponse.data);
          setForm({
            name: userResponse.data.name ?? '',
            handle: userResponse.data.handle ?? '',
            location: userResponse.data.location ?? '',
            bio: userResponse.data.bio ?? '',
            image_url: userResponse.data.image_url ?? '',
          });
          setReviews(reviewsResponse.data);
        }
      } catch {
        if (!ignore) {
          setError('Could not load this profile.');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      ignore = true;
    };
  }, [uuid]);

  const stats = useMemo(
    () => [
      { label: 'Reviews', value: reviews.length },
      { label: 'Photos', value: 0 },
      { label: 'Helpful votes', value: 0 },
      { label: 'Saved', value: 0 },
    ],
    [reviews.length],
  );

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const openEditProfile = () => {
    if (!user) return;

    setForm({
      name: user.name,
      handle: user.handle ?? '',
      location: user.location ?? '',
      bio: user.bio ?? '',
      image_url: user.image_url ?? '',
    });
    setEditError(null);
    setIsEditOpen(true);
  };

  const saveProfile = async () => {
    setIsSaving(true);
    setEditError(null);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_DEV_URL}/users/${uuid}`,
        {
          name: form.name.trim(),
          handle: form.handle.trim() || undefined,
          location: form.location.trim(),
          bio: form.bio.trim(),
          image_url: form.image_url.trim(),
        },
      );

      setUser(response.data);
      setForm({
        name: response.data.name ?? '',
        handle: response.data.handle ?? '',
        location: response.data.location ?? '',
        bio: response.data.bio ?? '',
        image_url: response.data.image_url ?? '',
      });
      setIsEditOpen(false);
    } catch {
      setEditError('Could not save your profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="bg-background min-h-screen px-6 pt-28">
        <div className="text-muted-foreground border-border mx-auto max-w-7xl rounded-lg border bg-white p-8">
          Loading profile...
        </div>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="bg-background min-h-screen px-6 pt-28">
        <div className="border-border mx-auto max-w-7xl rounded-lg border bg-white p-8">
          <p className="text-destructive">{error || 'Profile not found.'}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background min-h-screen pt-20">
      <section className="border-border border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-6 sm:flex-row">
              <Avatar className="bg-secondary text-primary flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36">
                {user.image_url && (
                  <AvatarImage src={user.image_url} alt={user.name} />
                )}
                <AvatarFallback className="text-center text-4xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>

              <div className="max-w-3xl">
                <h1 className="text-foreground text-4xl font-semibold tracking-normal sm:text-5xl">
                  {user.name}
                </h1>
                <p className="text-muted-foreground mt-3 text-lg">
                  {getHandle(user)}
                </p>
                <p className="text-muted-foreground mt-6 text-lg">
                  {user.bio ||
                    'Always hunting the next great local table. Reviews are shared from real visits on WiGarn.'}
                </p>
                <div className="text-muted-foreground mt-8 flex flex-wrap gap-x-8 gap-y-3 text-lg">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {user.location || 'Thailand'}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" />
                    Joined {formatJoinedDate(user.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-border h-12 rounded-full bg-white px-6 text-base"
                onClick={openEditProfile}
              >
                <Pencil className="h-5 w-5" />
                Edit profile
              </Button>
              {/* <Button
                variant="outline"
                size="icon"
                aria-label="Profile settings"
                className="border-border h-12 w-12 rounded-full bg-white"
              >
                <Settings className="h-5 w-5" />
              </Button> */}
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-border rounded-xl border bg-white p-6"
              >
                <p className="text-foreground text-4xl">{stat.value}</p>
                <p className="text-muted-foreground mt-4 text-sm font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="border-border border-b">
          <nav className="flex gap-8" aria-label="Profile sections">
            {(['reviews', 'saved', 'photos'] as ProfileTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 px-0 pb-4 text-lg capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-primary text-foreground'
                    : 'text-muted-foreground hover:text-foreground border-transparent'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'reviews' && (
          <div className="mt-10 space-y-5">
            {reviews.length === 0 ? (
              <div className="border-border text-muted-foreground rounded-xl border bg-white p-8">
                No reviews yet.
              </div>
            ) : (
              reviews.map((review) => (
                <article
                  key={review.id}
                  className="border-border rounded-xl border bg-white p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="bg-secondary h-16 w-16 overflow-hidden rounded-lg">
                        {review.restaurant?.image_url ? (
                          <Image
                            src={review.restaurant.image_url}
                            alt={review.restaurant.name}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="text-primary grid h-full w-full place-items-center">
                            <Camera className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h2 className="text-foreground text-xl font-medium">
                          {review.restaurant?.name || 'Restaurant'}
                        </h2>
                        <p className="text-muted-foreground mt-1">
                          {[
                            review.restaurant?.category,
                            getRestaurantLocation(review),
                          ]
                            .filter(Boolean)
                            .join(' · ') || 'Restaurant'}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground whitespace-nowrap">
                      {formatRelativeDate(review.createdAt)}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-5">
                    <StarRating value={review.rating} size={24} />
                    <span className="bg-accent text-accent-foreground rounded-full px-4 py-1 text-sm">
                      Cozy
                    </span>
                    <span className="bg-accent text-accent-foreground rounded-full px-4 py-1 text-sm">
                      Casual
                    </span>
                  </div>

                  <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
                    {review.review_des}
                  </p>

                  <div className="text-muted-foreground mt-8 flex flex-wrap items-center gap-6">
                    <span className="inline-flex items-center gap-2">
                      <ThumbsUp className="h-5 w-5" />0 found helpful
                    </span>
                    <button type="button" className="hover:text-foreground">
                      Edit
                    </button>
                    <button type="button" className="hover:text-destructive">
                      Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="border-border text-muted-foreground mt-10 rounded-xl border bg-white p-8">
            <Heart className="text-primary mb-3 h-6 w-6" />
            Saved restaurants will appear here.
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="border-border text-muted-foreground mt-10 rounded-xl border bg-white p-8">
            <Camera className="text-primary mb-3 h-6 w-6" />
            Photo uploads are coming soon.
          </div>
        )}
      </section>

      {isEditOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/25 px-4 backdrop-blur-sm">
          <div className="border-border w-full max-w-2xl rounded-xl border bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-foreground text-2xl font-semibold">
                Edit profile
              </h2>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                aria-label="Close edit profile"
                className="text-muted-foreground hover:text-foreground rounded-full p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Avatar className="bg-secondary text-primary h-24 w-24">
                {form.image_url && (
                  <AvatarImage src={form.image_url} alt={form.name} />
                )}
                <AvatarFallback className="text-3xl">
                  {getInitials(form.name)}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() =>
                  document.getElementById('profile-image-url')?.focus()
                }
                className="border-border hover:bg-accent inline-flex h-12 items-center gap-3 rounded-full border bg-white px-5 text-base"
              >
                <Camera className="h-5 w-5" />
                Change photo
              </button>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="text-muted-foreground text-sm">
                Name
                <Input
                  value={form.name}
                  onChange={(event) => updateForm('name', event.target.value)}
                  className="border-border mt-2 h-12 rounded-lg bg-white text-base"
                />
              </label>
              <label className="text-muted-foreground text-sm">
                Handle
                <Input
                  value={form.handle}
                  onChange={(event) =>
                    updateForm(
                      'handle',
                      event.target.value.replace(/^@/, '').slice(0, 64),
                    )
                  }
                  className="border-border mt-2 h-12 rounded-lg bg-white text-base"
                  placeholder="@handle"
                />
              </label>
            </div>

            <label className="text-muted-foreground mt-5 block text-sm">
              Photo URL
              <Input
                id="profile-image-url"
                value={form.image_url}
                onChange={(event) =>
                  updateForm('image_url', event.target.value)
                }
                className="border-border mt-2 h-12 rounded-lg bg-white text-base"
                placeholder="https://example.com/avatar.jpg"
              />
            </label>

            <label className="text-muted-foreground mt-5 block text-sm">
              Location
              <Input
                value={form.location}
                onChange={(event) => updateForm('location', event.target.value)}
                className="border-border mt-2 h-12 rounded-lg bg-white text-base"
                placeholder="Bangkok, Thailand"
              />
            </label>

            <label className="text-muted-foreground mt-5 block text-sm">
              <span className="flex items-center justify-between">
                Bio
                <span>{form.bio.length}/200</span>
              </span>
              <textarea
                value={form.bio}
                onChange={(event) =>
                  updateForm('bio', event.target.value.slice(0, 200))
                }
                className="border-border focus:border-primary focus:ring-primary/20 text-foreground mt-2 min-h-32 w-full resize-none rounded-lg border bg-white px-4 py-3 text-base outline-none focus:ring-4"
              />
            </label>

            {editError && (
              <p className="text-destructive mt-4 text-sm">{editError}</p>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Button
                variant="outline"
                className="border-border h-12 rounded-full bg-white text-base"
                onClick={() => setIsEditOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary hover:bg-primary-dark h-12 rounded-full text-base text-white"
                disabled={isSaving || form.name.trim().length === 0}
                onClick={saveProfile}
              >
                {isSaving ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
