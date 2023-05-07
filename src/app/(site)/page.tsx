import { Logo } from '@/assets';
import Image from 'next/image';
import { FC } from 'react';
import AuthForm from './components/AuthForm';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <div className="flex min-h-full justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          width={'48'}
          height={'48'}
          src={Logo}
          className="mx-auto w-auto"
          priority
        />
        <h2
          className="
          mt-6
          text-center
          text-3xl
          font-bold
          tracking-tight
          text-gray-900
        "
        >
          Connectez vous
        </h2>
        <AuthForm />
      </div>
    </div>
  );
};

export default Home;
