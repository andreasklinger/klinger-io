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
    <Link href={href}>
      <a className="prevent-default group p-3 -m-3 inline-flex items-center space-x-3">
        <span className="text-base lg:text-lg text-sky-600 dark:text-sky-400 font-bold whitespace-nowrap">
          {children}
        </span>
        <ArrowLeftIcon className="h-3 text-gray-300 group-hover:text-gray-400 dark:text-gray-700 dark:group-hover:text-gray-600 group-hover:translate-x-2 transition-all" />
      </a>
    </Link>
  </div>
);
