import { FC } from 'react';
import { IconProps } from '../types';

export const ThemeIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 19.2 19.2" {...props}>
    <title>Theme</title>
    <path
      d="M9.6.6v2.57M.6 9.6h2.57M16.03 9.6h2.57M9.6 16.03v2.57"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.2"
    />
    <path
      d="M3.63 2.72a.64.64 0 0 0-.91.9l2.3 2.32.06.05A5.82 5.82 0 0 1 6 5.08l-.05-.05Zm10.5 10.5a5.83 5.83 0 0 1-.92.9l2.36 2.36a.64.64 0 0 0 .91-.9Z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      d="M9.6 7.03A2.57 2.57 0 1 1 7.03 9.6 2.57 2.57 0 0 1 9.6 7.03Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M2.72 15.57a.64.64 0 0 0 .9.91l2.32-2.3.05-.06a5.82 5.82 0 0 1-.91-.9l-.05.04Zm10.5-10.49a5.82 5.82 0 0 1 .9.9l2.36-2.35a.64.64 0 0 0-.9-.91Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
