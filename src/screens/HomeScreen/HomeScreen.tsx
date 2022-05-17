import React from 'react';
import theme from '@src/theme/defaultTheme';
import { useRouter } from 'next/router';
import { useForm } from '@src/components/forms/useForm/useForm';
import { pageHOC } from '@src/components/pageHOC/pageHOC';
import { Button } from '@src/components/commons/Button/Button';
import { TextField } from '@src/components/commons/TextField/TextField';
import { Text } from '@src/components/commons/Text/Text';
import { Box } from '@src/components/commons/Box/Box';
import { combinationsService } from '@src/services/combinationsService/combinationsService';
import { Footer } from '@src/components/patterns/Footer/Footer';
import { Logo } from '@src/components/Logo/Logo';
import CircularProgress from '@mui/material/CircularProgress';


export async function getStaticProps() {
  return {
    props: {
      initialItems: await combinationsService().getAllItems(),
    }
  }
}

export default pageHOC(HomePage, {
  title: 'PodeMisturar? - Home',
  description: 'Na hora de comer ou limpar, o app que vai ajudar você a não fazer misturas perigosas para sua saúde!',
});

function HomePage({ initialItems }) {
  const router = useRouter();
  const [formSubmited, setFormSubmited] = React.useState(false);
  const [combinations, setCombinations] = React.useState([]);
  const form = useForm({ initialValues: { item: '', itemCombination: '', } });
  const combinationOptions = combinationsService()
    .reduceCombinationsToSelection(combinations, form.values.item);

  React.useEffect(() => {
    const item = initialItems.find((item) => {
      const mainItem = item.title === form.values.item;
      if (mainItem) return mainItem;

      const mainAlternateItem = item.alternateTitle?.find((alternateTitle) => {
        return alternateTitle.title === form.values.item;
      });
      if (mainAlternateItem) return mainAlternateItem;

      return false;
    });
    if (item) {
      combinationsService()
        .getCombinationsOf(item.id)
        .then((combinationsFromServer) => {
          setCombinations(combinationsFromServer);
        });
    } else {
      setCombinations([]);
    }
  }, [form.values.item]);

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    const item = initialItems.find((i) => {
      const mainItem = i.title === form.values.item;
      if (mainItem) return mainItem;

      const alternateTitleEqualSelection = i.alternateTitle.find(it => it.title === form.values.item);
      if (alternateTitleEqualSelection) return alternateTitleEqualSelection;

      return false;
    }).slug;
    setFormSubmited(true);
    const itemCombination = initialItems.find((i) => i.title === form.values.itemCombination).slug;
    const valuesPure = Object.entries(form.values).reduce((acc,[key, value]) => `${acc}${key}=${value}&`, '').slice(0, -1);
    const combinationUrl = '/combina/' + item + '--com--' + itemCombination + '?' + valuesPure;
    router.push(combinationUrl);
  }

  return (
    <Box
      tag="main"
      styleSheet={{
        display: 'grid',
        flex: 1,
        backgroundColor: theme.colors.neutral.x050,
      }}
    >
      <Box
        styleSheet={{
          width: { sm: '400px' },
          alignSelf: 'center',
          justifySelf: { sm: 'center' },
          boxShadow: theme.shadow.md,
          borderRadius: theme.borderRadius.md,
          margin: theme.space.x4,
          padding: theme.space.x6,
          backgroundColor: theme.colors.neutral.x000,
        }}
      >
        <Box>
          <Logo />
        </Box>
        <Text tag="p" variant='body2' styleSheet={{ color: theme.colors.neutral.x500, marginBottom: '20px' }}>
          Na hora de comer ou limpar, o app que vai ajudar você a não fazer misturas perigosas para sua saúde!
        </Text>
        <Box
          tag="form"
          onSubmit={handleSubmit}
          styleSheet={{
            margin: 'auto',
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
          <Box>
            <Button
              type="submit"
              label="Checar 👀"
              styleSheet={{ marginTop: '30px' }}
              disabled={form.isInvalid}
              fullWidth
              size='large'
            />
          </Box>
          {formSubmited && (<Box styleSheet={{ marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>)}
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}
