'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@ui/field';
import { Input } from '@ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Utensils, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().min(5, 'Enter your email.'),
  password: z.string().min(8, 'Enter your password.'),
  image_url: z.string().optional(),
});

const SignUpForm = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      image_url: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_DEV_URL}/auth/signup`,
        {
          ...data,
          image_url: data.image_url || undefined,
        },
      );
      if (result.data.accessToken) {
        login(result.data.accessToken);
        setIsSuccess(true);
      }
    } catch (error) {
      // setIsError(true);
      console.error(error);
    }
  };

  return (
    <div className="relative flex h-screen items-center justify-center">
      <div className="w-full sm:max-w-md">
        <div className="mb-6 flex flex-col items-center justify-center text-center">
          <Link href="/" className="group flex flex-col items-center gap-2">
            <span className="bg-primary text-primary-foreground shadow-primary/20 grid h-11 w-11 place-items-center rounded-xl shadow-md transition-transform group-hover:scale-105">
              <Utensils size={22} />
            </span>
          </Link>
          <p className="text-muted-foreground mt-2 flex flex-col text-sm">
            <span className="mt-1 text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Welcome to WiGarn
            </span>
            Restaurant review platform.
          </p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <FieldLabel
                    htmlFor="name"
                    className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Name
                  </FieldLabel>
                </div>

                <div className="relative">
                  <Input
                    {...field}
                    id="name"
                    required
                    placeholder="John Doe"
                    className="focus-visible:ring-primary/20 h-10 w-full rounded-lg border-neutral-200 focus-visible:ring-2 dark:border-zinc-800"
                    aria-invalid={fieldState.invalid}
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError
                    className="text-destructive animate-in fade-in-50 mt-1 text-xs font-medium duration-200"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
          {/* Email */}
          <FieldGroup className="gap-2">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col gap-1.5"
                >
                  <FieldLabel
                    htmlFor="email"
                    className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Email address
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      required
                      placeholder="name@example.com"
                      className="focus-visible:ring-primary/20 h-10 w-full rounded-lg border-neutral-200 focus-visible:ring-2 dark:border-zinc-800"
                      aria-invalid={fieldState.invalid}
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError
                      className="text-destructive animate-in fade-in-50 mt-1 text-xs font-medium duration-200"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      htmlFor="password"
                      className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Password
                    </FieldLabel>
                  </div>

                  <div className="relative">
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      required
                      placeholder="••••••••"
                      className="focus-visible:ring-primary/20 h-10 w-full rounded-lg border-neutral-200 focus-visible:ring-2 dark:border-zinc-800"
                      aria-invalid={fieldState.invalid}
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError
                      className="text-destructive animate-in fade-in-50 mt-1 text-xs font-medium duration-200"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
            {/* Image Url */}
            <Controller
              name="image_url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      htmlFor="image_url"
                      className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Image
                    </FieldLabel>
                  </div>

                  <div className="relative">
                    <Input
                      {...field}
                      id="image_url"
                      type="url"
                      placeholder="https://example.com/avatar.jpg"
                      className="focus-visible:ring-primary/20 h-10 w-full rounded-lg border-neutral-200 focus-visible:ring-2 dark:border-zinc-800"
                      aria-invalid={fieldState.invalid}
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError
                      className="text-destructive animate-in fade-in-50 mt-1 text-xs font-medium duration-200"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button
            type="submit"
            className="bg-primary text-primary-foreground shadow-primary/10 mt-6 h-10 w-full cursor-pointer rounded-lg font-medium shadow-md transition-all hover:opacity-90 active:scale-[0.99]"
          >
            Sign Up
          </Button>
        </form>
        <div className="mt-3 flex items-center justify-center">
          <Link
            href={'/auth/signin'}
            className="text-primary/80 text-sm underline"
          >
            Already has an account? Click to Sign In.
          </Link>
        </div>
      </div>
      {/* router.push('/'); */}
      {isSuccess && (
        <div className="absolute flex h-screen w-screen items-center justify-center backdrop-blur-sm">
          <Card className="animate-in fade-in zoom-in-95 w-full max-w-md rounded-2xl border-neutral-200/60 bg-white/95 p-2 shadow-2xl duration-200 dark:border-zinc-800 dark:bg-zinc-900/95">
            <CardHeader className="flex flex-col items-center justify-center pt-6 pb-2 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-400">
                <CheckCircle className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                SignUp Successfully
              </CardTitle>
            </CardHeader>

            <CardContent className="pb-6 text-center">
              <p className="text-muted-foreground text-sm">
                Congratulation 🎉! You have an account.
              </p>
            </CardContent>

            <CardFooter className="flex flex-col gap-2 pt-0">
              <Button
                className="h-10 w-full cursor-pointer rounded-xl bg-emerald-600 text-sm font-medium text-white shadow-md shadow-emerald-600/10 transition-all hover:bg-emerald-500 active:scale-[0.98] dark:bg-emerald-500 dark:hover:bg-emerald-400"
                onClick={() => router.push('/')}
              >
                Go to Homepage.
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
