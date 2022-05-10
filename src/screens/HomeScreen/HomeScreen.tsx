import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from '@src/components/forms/useForm/useForm';
import { pageHOC } from '@src/components/pageHOC/pageHOC';
import { Button } from '@src/components/commons/Button/Button';
import { TextField } from '@src/components/commons/TextField/TextField';
import { Text } from '@src/components/commons/Text/Text';
import { Box } from '@src/components/commons/Box/Box';
import { combinationsService } from '@src/services/combinationsService/combinationsService';
import { slugify } from '@src/utils/string/slugify/slugify';

export async function getStaticProps() {
  return {
    props: {
      initialItems: await combinationsService().getAllItems(),
    }
  }
}

export default pageHOC(HomePage, {
  title: 'Home',
  description: 'Página Inicial',
});

function HomePage({ initialItems }) {
  const router = useRouter();
  const [combinations, setCombinations] = React.useState([]);
  const form = useForm({ initialValues: { item: '', itemCombination: '', } });
  const combinationOptions = combinationsService()
    .reduceCombinationsToSelection(combinations, form.values.item);

  React.useEffect(() => {
    const item = initialItems.find((item) => item.title === form.values.item);
    if(item) {
      combinationsService()
        .getCombinationsOf(item.id)
        .then((combinationsFromServer) => {
          setCombinations(combinationsFromServer);
        });
    }
  }, [form.values.item]);

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
      <Box
        tag="form"
        styleSheet={{
          minWidth: '300px',
        }}
        onSubmit={(event: React.ChangeEvent<HTMLFormElement>) => {
          event.preventDefault();
          const item = initialItems.find((i) => i.title === form.values.item).slug;
          const itemCombination = initialItems.find((i) => i.title === form.values.itemCombination).slug;
          const combinationUrl = '/combina/' + item + '-com-' + itemCombination;
          router.push(combinationUrl);
        }}
      >
        <TextField
          label='Primeira Coisa'
          name="item"
          onChange={(event) => {
            form.setValue({ target: { name: 'itemCombination', value: '' } });
            form.setValue(event);
          }}
          value={form.values.item}
          autocomplete
          options={initialItems?.map((item) => item.title)}
        />
        <p>Com</p>
        <TextField
          label='Segunda Coisa'
          name="itemCombination"
          onChange={form.setValue}
          value={form.values.itemCombination}
          autocomplete
          options={combinationOptions}
          disabled={!form.values.item}
        />
        <div>
          <Button type="submit" label="Checar 👀" styleSheet={{ marginTop: { xs: '10px' } }} disabled={form.isInvalid} />
        </div>
      </Box>
    </Box>
  )
}
