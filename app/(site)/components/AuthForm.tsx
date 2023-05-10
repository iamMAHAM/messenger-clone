/* eslint-disable no-unused-vars */
'use client';

import axios, { AxiosError } from 'axios';
import Button from '../../components/Button';
import Input from '../../components/inputs/Input';
import { FC, useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, set, useForm } from 'react-hook-form';
import AuthSocialButton from './AuthSocial';
import { signIn, useSession } from 'next-auth/react';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { BuiltInProviderType } from 'next-auth/providers';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface AuthFormProps {}

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm: FC<AuthFormProps> = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsloading] = useState<boolean>(false);

  const toggleVariant = useCallback(() => {
    setVariant(variant === 'LOGIN' ? 'REGISTER' : 'LOGIN');
    console.log('clicked : ', variant);
  }, [variant]);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      console.log('user is authenticated');
      router.replace('/users');
    }
  }, [session?.status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);

    if (variant === 'REGISTER') {
      // register user
      axios
        .post('/api/register', data)
        .then((res) => {
          if (res.status === 201) {
            toast.success('Registered successfully');
            signIn('credentials', { ...data, redirect: false });
            // setVariant('LOGIN');
          }
        })

        .catch((e: AxiosError) => {
          if (
            typeof e.response?.data === 'string' &&
            e.response?.data.includes('already exists')
          ) {
            toast.error('User already exists');
          } else {
            toast.error('Something went wrong');
          }
        })

        .finally(() => setIsloading(false));
    }

    if (variant === 'LOGIN') {
      // login user
      signIn('credentials', { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error(callback.error);
          }

          if (callback?.ok && !callback.error) {
            toast.success('Logged in successfully');
          }
        })
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setIsloading(false));
    }
  };

  const socialAction = (action: BuiltInProviderType) => {
    setIsloading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials');
        }

        if (callback?.ok && !callback.error) {
          toast.success('Logged in successfully');
        }
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsloading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
      >
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (
            <Input
              type="text"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label="Name"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label="Email address"
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="Password"
            type="password"
          />
          <div>
            <Button
              disabled={isLoading}
              fullWidth
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
        </div>
        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
            {variant === 'LOGIN'
              ? 'New to Messenger?'
              : 'Already have an account?'}
          </div>
          <div
            onClick={toggleVariant}
            className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
