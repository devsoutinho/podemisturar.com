import theme from '@src/theme/defaultTheme';
import { Box } from '@src/components/commons/Box/Box';
import { Link } from '@src/components/Link/Link';
import { Text } from '@src/components/commons/Text/Text';

export function Footer() {
  return (
    <Box
      styleSheet={{
        backgroundColor: theme.colors.primary.x500,
        color: theme.colors.neutral.x000,
        width: theme.space['x1/1'],
        padding: theme.space.x5,
        alignSelf: 'flex-end',
        display: 'flex',
        alignItems: { sm: 'center' },
        justifyContent: { sm: 'center' },
        flexDirection: 'column',
      }}
    >
      <Text tag="p" variant='body2' styleSheet={{ fontSize: '14px', marginBottom: '10px' }}>
        Todos os direitos reservados © {new Date().getFullYear()}
      </Text>
      <Text tag="p" variant='body2' styleSheet={{ fontSize: '14px' }}>
        Uma parceria entre 
        {' '}
        <Link href="https://www.youtube.com/channel/UCdKJlY5eAoSumIlcOcYxIGg" styleSheet={{ color: theme.colors.accent.x200 }}>
          Laura Marise (Nunca vi 1 cientista)
        </Link>
        {' '}
        e
        {' '}
        <Link href="https://www.youtube.com/DevSoutinho" styleSheet={{ color: theme.colors.accent.x200 }}>
          Mario Souto (DevSoutinho)
        </Link>
      </Text>
    </Box>
  );
}
