'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useSession } from '@/app/context/session';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { lusitana, inter } from '../fonts';

export default function SideNav() {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const [authToken, setAuthToken] = useState<string | null>(null);
  
  const getAuthToken = () => {
    return localStorage.getItem('accessToken');
  }

  const fetchUserProfile = async () => {
    await axios.get(`/api/profiles`, session?.state?.apiConfig)
      .then(({ data }) => {
        session?.dispatch({type: 'UPDATE_SESSION', payload: data.data});
      }).catch(({ response: { data } }) => {
        console.log(data);
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  }

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      router.push(`/login?redirect=${pathname}`);
    }
    setAuthToken(token);
  }, [])

  useEffect(() => {
      if (authToken) {
        session?.dispatch({type: 'UPDATE_CONFIG', payload: {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: 'application/json, text/plain, */*',
          },
        }});
      }
  }, [authToken]);

  useEffect(() => {
    if (session?.state?.apiConfig) {
      fetchUserProfile();
    }
  }, [session?.state?.apiConfig]);

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-teal-600 p-4 md:h-40"
        href="/"
      >
        <div className='flex flex-col items-start'>
          <div className="w-32 text-white md:w-40">
            <AcmeLogo />
          </div>
          <div className='flex flex-row items-center justify-start'>
            <UserCircleIcon className='h-6 w-6 text-white' />
            <p className={`${lusitana.className} ml-2 font-semibold text-lg text-white`}>{session?.state?.session?.name}</p>
          </div>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <button onClick={handleLogout} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
    </div>
  );
}
