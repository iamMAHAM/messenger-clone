/* eslint-disable no-unused-vars */
'use client';

import Button from '@/components/Button';
import Input from '@/components/inputs/Input';
import { FC, useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import AuthSocialButton from './AuthSocial';
import { BsGithub, BsGoogle } from 'react-icons/bs';

interface AuthFormProps {}

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm: FC<AuthFormProps> = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsloading] = useState<boolean>(false);

  const toggleVariant = useCallback(() => {
    setVariant(variant === 'LOGIN' ? 'REGISTER' : 'LOGIN');
    console.log('clicked : ', variant);
  }, [variant]);

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
    }

    if (variant === 'LOGIN') {
      // login user
    }
  };

  const socialAction = (action: string) => {
    setIsloading(true);
    // Next-auth social login
  };

  return (
    <div className="mt-8 sm:w-full sm:max-w-md sm:mx-auto">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (
            <Input
              id="name"
              label="Name"
              type="text"
              register={register}
              errors={errors}
            />
          )}
          <Input
            id="email"
            label="Email Address"
            type="email"
            register={register}
            errors={errors}
          />
          <Input
            id="password"
            label="Password"
            type="email"
            register={register}
            errors={errors}
          />
          <div className="w-full">
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
            >
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white text-gray-500">Or continue with</span>
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
            <div className="flex justify-center text-sm mt-6 px-2 text-gray-500 gap-2">
              <div>
                {variant === 'LOGIN'
                  ? 'new to messenger?  '
                  : 'Already have an account? '}
              </div>
              <div
                onClick={toggleVariant}
                className="underline cursor-pointer z-50"
              >
                {variant === 'LOGIN' ? 'Create an Account' : 'Login'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
