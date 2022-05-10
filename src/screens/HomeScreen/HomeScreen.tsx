import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from '@src/components/forms/useForm/useForm';
import { pageHOC } from '@src/components/pageHOC/pageHOC';
import { Button } from '@src/components/commons/Button/Button';
import { TextField } from '@src/components/commons/TextField/TextField';
import { Text } from '@src/components/commons/Text/Text';
import { Box } from '@src/components/commons/Box/Box';
import { combinationsService } from '@src/services/combinationsService/combinationsService';

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
    const item = initialItems.find((item) => {
      const mainItem = item.title === form.values.item;
      if(mainItem) return mainItem;

      const mainAlternateItem = item.alternateTitle?.find((alternateTitle) => {
        return alternateTitle.title === form.values.item;
      });
      if(mainAlternateItem) return mainAlternateItem;

      return false;
    });
    if(item) {
      combinationsService()
        .getCombinationsOf(item.id)
        .then((combinationsFromServer) => {
          setCombinations(combinationsFromServer);
        });
    } else {
      setCombinations([]);
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
          const item = initialItems.find((i) => {
            const mainItem = i.title === form.values.item;
            if(mainItem) return mainItem;

            const alternateTitleEqualSelection = i.alternateTitle.find(it => it.title === form.values.item);    
            if(alternateTitleEqualSelection) return alternateTitleEqualSelection;

            return false;
          }).slug;
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
          options={initialItems
            ?.reduce((acc, item) => {
              return [
                ...acc,
                item,
                ...item.alternateTitle,
              ];
            }, [])
            .map((item) => item.title)}
        />
        <p>Com</p>
        <TextField
          label='Segunda Coisa'
          name="itemCombination"
          onChange={form.setValue}
          value={form.values.itemCombination}
          autocomplete
          options={combinationOptions}
          disabled={!form.values.item || !combinationOptions.length}
        />
        {form.values.item && !combinationOptions.length && <p>Nenhuma combinação encontrada :(</p>}
        <div>
          <Button type="submit" label="Checar 👀" styleSheet={{ marginTop: { xs: '10px' } }} disabled={form.isInvalid} />
        </div>
      </Box>
    </Box>
  )
}
