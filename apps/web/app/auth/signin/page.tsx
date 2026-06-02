'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@ui/field';
import { Input } from '@ui/input';
import { InputGroup } from '@ui/input-group';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z
    .email()
    .min(5, 'Email must be at least 5 characters.')
    .max(32, 'Email must be at most 32 characters.'),
  password: z.string(),
});

const SignInForm = () => {
  const { login } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_DEV_URL}/auth/signin`,
        data,
      );
      if (result.data.accessToken) {
        login(result.data.accessToken);
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full sm:max-w-md">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Email"
                  // autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputGroup>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button type="submit" className="bg-primary mt-4 w-40 px-4 py-3">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
