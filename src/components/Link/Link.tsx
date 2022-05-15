import NextLink from 'next/link';
import { Text } from '@src/components/commons/Text/Text';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  styleSheet?: Record<string,any>;
}
export function Link({ href, children, ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <Text tag="a" {...props}>
        {children}
      </Text>
    </NextLink>
  );
}
