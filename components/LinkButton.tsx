import Link from 'next/link';
import { FC } from 'react';
import { ArrowLeftIcon } from '../icons';

interface LinkButtonProps {
  className?: string;
  children: string;
  href: string;
}

export const LinkButton: FC<LinkButtonProps> = ({
  className,
  children,
  href,
}) => (
  <div className={className}>
    <Link
      href={href}
      className="inline-flex items-center p-3 -m-3 space-x-3 prevent-default group"
    >
      <span className="text-base font-bold lg:text-lg text-sky-600 dark:text-sky-400 whitespace-nowrap">
        {children}
      </span>
      <ArrowLeftIcon className="h-3 text-gray-300 transition-all group-hover:text-gray-400 dark:text-gray-700 dark:group-hover:text-gray-600 group-hover:translate-x-2" />
    </Link>
  </div>
);
