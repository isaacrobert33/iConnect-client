import { clsx } from 'clsx';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <div className={`${lusitana.className} flex flex-row gap-1 flex-wrap items-center text-md md:text-lg`}>
        {
          breadcrumbs.map((breadcrumb, index) => (
            <div
              key={breadcrumb.href}
              aria-current={breadcrumb.active}
              className={clsx(
                breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
              )}
            >
              <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
              {index < breadcrumbs.length - 1 ? (
                <span className="mx-1.5 inline-block">/</span>
              ) : null}
            </div>
          ))
        }
      </div>
    </nav>
  );
}
