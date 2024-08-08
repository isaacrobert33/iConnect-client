'use client';

import SideNav from '@/app/ui/dashboard/sidenav';
import { SunIcon } from '@heroicons/react/20/solid';
import { useSession } from '../context/session';
import { MoonIcon } from '@heroicons/react/24/outline';

export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession();

  const handleToggleTheme = () => {
    session?.dispatch({type: 'UPDATE_THEME', payload: session?.state?.theme === 'light' ? 'dark': 'light'});
  }

  return (
    <>
      <div className="flex h-screen dark:bg-gray-900 flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    
      <button
          onClick={handleToggleTheme}
          className="hidden md:block top-2 right-4 absolute rounded-md border border-teal-700 p-2 hover:bg-gray-100">
          {
            session?.state?.theme === 'light' ? (
              <SunIcon className="w-5 text-teal-700" />
            ) : (
              <MoonIcon className="w-5 text-teal-700" />
            )
          }
      </button>
    </>
  );
}