import { useRouter } from 'next/router';
import { useForm } from '@src/components/forms/useForm/useForm';
import { pageHOC } from '@src/components/pageHOC/pageHOC';
import { Button } from '@src/components/commons/Button/Button';
import { TextField } from '@src/components/commons/TextField/TextField';
import { Text } from '@src/components/commons/Text/Text';
import { Box } from '@src/components/commons/Box/Box';
import { combinationsService } from '@src/services/combinationsService/combinationsService';
import React from 'react';

// slugify
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    // .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export async function getStaticProps() {
  return {
    props: {
      options: await combinationsService().getAllItems(),
    }
  }
}

export default pageHOC(HomePage, {
  title: 'Home',
  description: 'Página Inicial',
});

function HomePage({ options }) {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      coisa1: '',
      coisa2: '',
    }
  });
  const [combinationOptions, setCombinationOptions] = React.useState([]);

  React.useEffect(() => {
    combinationsService()
      .getCombinationsOf(form.values.coisa1)
      .then((result) => {
        const partialCombinations = result
          .cantCombines
          .map((combinations) => combinations.items)
          .flatMap((items) => items)
          .map((item) => item.name)
          .filter((item) => item.toLowerCase() !== form.values.coisa1.toLowerCase());
        
        if(partialCombinations.length) {
          setCombinationOptions(Array.from(new Set([...partialCombinations, ''])));
        } else {
          setCombinationOptions([]);
        }
      });
  }, [form.values.coisa1]);

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
        const combinationUrl = '/combina/' + slugify(coisa1) + '-com-' + slugify(coisa2);
        router.push(combinationUrl);
      }}>
        <TextField
          label='Primeira Coisa'
          name="coisa1"
          onChange={(event) => {
            form.setValue({ target: { name: 'coisa2', value: '' } });
            form.setValue(event);
          }}
          value={form.values.coisa1}
          autocomplete
          options={options}
        />
        <p>Com</p>
        <TextField
          label='Segunda Coisa'
          name="coisa2"
          onChange={form.setValue}
          value={form.values.coisa2}
          autocomplete
          options={combinationOptions}
          disabled={!form.values.coisa1}
        />
        <div>
          <Button type="submit" label="Checar 👀" styleSheet={{ marginTop: { xs: '10px' } }} disabled={form.isInvalid} />
        </div>
      </form>
    </Box>
  )
}
