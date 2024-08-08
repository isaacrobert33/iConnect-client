'use client';

import {
  HomeIcon,
  FolderOpenIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Notes',
    href: '/dashboard/notes',
    icon: ClipboardDocumentIcon,
  },
  { name: 'Files', href: '/dashboard/files', icon: FolderOpenIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center dark:text-white gap-2 rounded-md bg-gray-100 dark:bg-gray-800 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 dark:bg-gray-700 dark:text-blue-600 text-blue-600': pathname === link.href || pathname.includes(link.href) && link.href != "/dashboard",
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
