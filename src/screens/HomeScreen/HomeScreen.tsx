import { useRouter } from 'next/router';
import { useForm } from '@src/components/forms/useForm/useForm';
import { pageHOC } from '@src/components/pageHOC/pageHOC';
import { Button } from '@src/components/commons/Button/Button';
import { TextField } from '@src/components/commons/TextField/TextField';
import { Text } from '@src/components/commons/Text/Text';
import { Box } from '@src/components/commons/Box/Box';

export default pageHOC(HomePage, {
  title: 'Home',
  description: 'Página Inicial',
});

function HomePage() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      coisa1: 'Manga',
      coisa2: 'Leite',
    }
  });

  return (
    <Box
      tag="main"
      styleSheet={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Text tag="h1" variant="heading2" styleSheet={{ marginBottom: { xs: '10px', sm: '30px' } }}>
        Pode misturar?
      </Text>
      <form onSubmit={(event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { coisa1, coisa2 } = form.values;
        const combinationUrl = '/combina/' + coisa1.toLowerCase() + '-com-' + coisa2.toLowerCase();
        router.push(combinationUrl);
      }}>
        <TextField
          label='Primeira Coisa'
          name="coisa1"
          onChange={form.setValue}
          value={form.values.coisa1}
        />
        <p>Com</p>
        <TextField
          label='Segunda Coisa'
          name="coisa2"
          onChange={form.setValue}
          value={form.values.coisa2}
        />
        <div>
          <Button type="submit" label="Checar 👀" styleSheet={{ marginTop: { xs: '10px' } }} />
        </div>
      </form>
    </Box>
  )
}
