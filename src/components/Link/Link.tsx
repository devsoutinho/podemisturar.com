import NextLink from 'next/link';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}
export default function Link({ href, children }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <a>
        {children}
      </a>
    </NextLink>
  );
}
