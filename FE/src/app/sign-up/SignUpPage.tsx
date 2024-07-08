'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import { signupFormSchema, signupFormType } from './types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { API_ROUTES, BE_BASE_URL, PAGE_ROUTES } from '@/constants/API_ROUTES';
import { useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/components/context/AuthContext';
import { useRouter } from 'next/navigation';

const defaultValues: signupFormType = {
  email: '',
  name: '',
  password: '',
  confirm_password: '',
};
export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { login } = useAuthContext();
  const router = useRouter();

  const methods = useForm<signupFormType>({
    defaultValues,
    resolver: zodResolver(signupFormSchema),
    delayError: 500,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (values: signupFormType) => {
    setIsLoading(true);
    fetch(BE_BASE_URL + API_ROUTES.SIGN_UP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => {
      console.log(res.status, 'res signup');
      setIsLoading(false);
      if (res.status === 200 || res.status === 201) {
        login({ email: values.email, password: values.password }).then((res) => {
          res && router.replace(PAGE_ROUTES.TODOS_LIST);
          !res && setIsError(true);
        });
      } else setIsError(true);
    });
  };

  return (
    <section className="flex flex-col justify-center items-center h-screen gap-8">
      <h1 className="text-3xl font-extrabold"></h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account. <br />
              {isError && <span className="text-red-500 text-sm">{'User Already registered'}</span>}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input {...register('name')} id="name" type="name" placeholder="my name" />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input {...register('email')} id="email" type="email" placeholder="m@example.com" />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input {...register('password')} id="password" type="password" />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="confirm_password" type="password" {...register('confirm_password')} />
              {errors.confirm_password && (
                <span className="text-red-500 text-sm">{errors.confirm_password.message}</span>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <div className="w-full">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <LoaderCircle className="animate-spin" />}

                <span className="ml-2">Sign up</span>
              </Button>

              <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link href={PAGE_ROUTES.SIGN_IN} className="underline">
                  Sign in
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}
