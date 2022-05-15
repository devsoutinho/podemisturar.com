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

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
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
        <Text tag="h1" variant="heading2" styleSheet={{ textAlign: 'center' }}>
          <svg style={{ width: '100%' }} height="101.73627156776517" viewBox="0 0 370.5 99.98219792004508"><g fill="#5555d6"><g xmlns="http://www.w3.org/2000/svg"><g><path fill="#5555d6" d="M70.425,52.399c1.197-5.026-1.401-10.103-6.179-12.07l-9.748-4.015c-2.805-1.156-5.968-1.036-8.677,0.332    c-2.709,1.366-4.687,3.838-5.424,6.781c-0.01,0.037-0.019,0.075-0.025,0.113l-0.847,4.454l-1.783-0.459    c-1.722-0.445-3.516-0.067-4.915,1.036s-2.184,2.759-2.153,4.541l0.188,10.812c0.104,5.922,2.213,11.718,5.94,16.322l0.679,0.838    l-2.013,9.605c-0.227,1.081,0.466,2.141,1.547,2.368c1.085,0.226,2.142-0.466,2.367-1.547l2.208-10.536    c0.124-0.588-0.024-1.201-0.402-1.668l-1.276-1.577c-3.169-3.913-4.963-8.84-5.05-13.874l-0.188-10.812    c-0.01-0.522,0.221-1.007,0.631-1.331s0.937-0.433,1.439-0.304l2.098,0.541L37.6,60.09c-0.166,1.092,0.584,2.112,1.676,2.279    c0.103,0.016,0.204,0.023,0.305,0.023c0.971,0,1.823-0.709,1.975-1.699l1.511-9.904l1.225-6.443    c0.466-1.792,1.678-3.295,3.333-4.13c1.67-0.842,3.62-0.918,5.352-0.205l9.748,4.015c2.947,1.214,4.55,4.345,3.804,7.479    L61.25,75.497c-0.011,0.049-0.02,0.098-0.026,0.147c-0.467,3.269-2.305,6.202-5.043,8.047c-0.492,0.332-0.812,0.864-0.872,1.454    l-0.735,7.149c-0.113,1.099,0.686,2.081,1.784,2.194c0.07,0.007,0.139,0.01,0.207,0.01c1.013,0,1.882-0.766,1.987-1.795    l0.644-6.257c3.223-2.472,5.38-6.123,5.977-10.162L70.425,52.399z"></path><path fill="#5555d6" d="M85.883,41.887c-0.349-0.827-0.691-1.639-1.001-2.434c-0.489-1.252-0.881-2.664-1.297-4.158    c-0.948-3.416-1.93-6.947-4.302-9.467c-3.294-3.499-8.497-6.054-12.661-7.889c-2.897-1.278-6.145-1.101-9.221-0.809l-0.984,0.096    c-1.488,0.148-2.894,0.288-4.238,0.288c-4.426,0-8.003,1.616-11.463,3.179c-0.487,0.22-0.978,0.442-1.475,0.661    c-0.645,0.284-1.286,0.555-1.922,0.824c-3.417,1.445-6.949,2.94-9.791,5.958c-2.366,2.514-3.205,5.57-4.017,8.526    c-0.355,1.293-0.723,2.63-1.215,3.891c-0.237,0.609-0.518,1.254-0.907,2.091c-0.467,1.001-0.033,2.191,0.968,2.658    c1.001,0.464,2.191,0.034,2.657-0.968c0.428-0.917,0.738-1.634,1.009-2.325c0.568-1.456,0.963-2.895,1.346-4.288    c0.744-2.711,1.387-5.053,3.071-6.842c2.264-2.405,5.125-3.615,8.438-5.017c0.653-0.277,1.313-0.556,1.977-0.848    c0.508-0.224,1.01-0.451,1.508-0.676c3.354-1.515,6.252-2.824,9.816-2.824c1.543,0,3.114-0.156,4.634-0.307l0.966-0.094    c2.657-0.252,5.21-0.404,7.23,0.486c3.818,1.683,8.562,3.996,11.362,6.971c1.694,1.8,2.541,4.848,3.36,7.795    c0.424,1.524,0.861,3.101,1.424,4.542c0.323,0.827,0.679,1.672,1.042,2.533c1.35,3.204,2.746,6.517,2.746,9.773    c0,2.594-1.337,5.104-2.753,7.761c-0.72,1.351-1.464,2.747-2.016,4.162c-0.98,2.512-2.842,4.19-4.998,6.134    c-0.953,0.859-1.938,1.748-2.882,2.75c-1.373,1.458-2.341,3.246-3.277,4.975c-1.242,2.293-2.415,4.459-4.257,5.271    c-1.011,0.445-1.469,1.626-1.023,2.637c0.33,0.749,1.063,1.194,1.831,1.194c0.27,0,0.543-0.055,0.806-0.17    c3.094-1.363,4.724-4.372,6.161-7.026c0.852-1.573,1.656-3.058,2.672-4.137c0.831-0.883,1.755-1.716,2.648-2.521    c2.32-2.093,4.721-4.256,6.046-7.65c0.467-1.196,1.124-2.429,1.819-3.735c1.511-2.835,3.223-6.048,3.223-9.642    C88.943,49.149,87.317,45.291,85.883,41.887z"></path><path fill="#5555d6" d="M22.13,53.214c0-1.104-0.896-2-2-2s-2,0.896-2,2c0,1.521-0.259,3.14-0.534,4.854    c-0.514,3.214-1.046,6.538,0.143,9.584c1.369,3.507,4.261,6.255,6.812,8.68c0.886,0.842,1.723,1.637,2.472,2.434    c0.831,0.882,1.648,1.896,2.514,2.969c0.438,0.544,0.881,1.093,1.332,1.633c0.396,0.474,0.964,0.718,1.536,0.718    c0.452,0,0.907-0.152,1.281-0.465c0.848-0.708,0.961-1.97,0.253-2.817c-0.437-0.522-0.864-1.053-1.289-1.58    c-0.874-1.084-1.779-2.206-2.715-3.2c-0.825-0.877-1.741-1.749-2.628-2.591c-2.358-2.241-4.796-4.559-5.841-7.235    c-0.794-2.033-0.369-4.687,0.081-7.497C21.833,56.907,22.13,55.053,22.13,53.214z"></path><path fill="#5555d6" d="M31.693,16.642c0.036,0,0.073-0.001,0.109-0.003c1.104-0.06,1.949-1.002,1.89-2.105l-0.386-7.142    c-0.06-1.103-1.016-1.945-2.104-1.889c-1.104,0.06-1.949,1.002-1.89,2.105l0.386,7.142C29.756,15.816,30.639,16.642,31.693,16.642    z"></path><path fill="#5555d6" d="M15.233,10.668c-0.613,0.918-0.366,2.161,0.553,2.774l8.815,5.888c0.341,0.228,0.727,0.337,1.108,0.337    c0.646,0,1.279-0.312,1.665-0.889c0.613-0.918,0.366-2.161-0.553-2.774l-8.815-5.888C17.091,9.502,15.847,9.749,15.233,10.668z"></path><path fill="#5555d6" d="M11.086,25.15c0.169,0.973,1.014,1.659,1.969,1.659c0.113,0,0.228-0.01,0.344-0.03l8.666-1.501    c1.088-0.188,1.817-1.224,1.629-2.312c-0.188-1.089-1.217-1.817-2.313-1.629l-8.666,1.501    C11.627,23.027,10.897,24.062,11.086,25.15z"></path></g></g></g><g fill="#000000" transform="matrix(2.5846792637828866,0,0,2.5846792637828866,105.9322567122208,16.90547640253053)"><path d="M4.04 6 c2.2 0 3.28 1.22 3.28 3.46 l0 1.82 c0 2.24 -1.08 3.46 -3.28 3.46 l-1.04 0 l0 5.26 l-2.2 0 l0 -14 l3.24 0 z M4.04 8 l-1.04 0 l0 4.74 l1.04 0 c0.7 0 1.08 -0.32 1.08 -1.32 l0 -2.1 c0 -1 -0.38 -1.32 -1.08 -1.32 z M10.36 9.22 l0 7.56 c0 1 0.44 1.38 1.14 1.38 s1.14 -0.38 1.14 -1.38 l0 -7.56 c0 -1 -0.44 -1.38 -1.14 -1.38 s-1.14 0.38 -1.14 1.38 z M8.16 16.64 l0 -7.28 c0 -2.24 1.18 -3.52 3.34 -3.52 s3.34 1.28 3.34 3.52 l0 7.28 c0 2.24 -1.18 3.52 -3.34 3.52 s-3.34 -1.28 -3.34 -3.52 z M16.26 20 l0 -14 l3.48 0 c2.2 0 3.28 1.22 3.28 3.46 l0 7.08 c0 2.24 -1.08 3.46 -3.28 3.46 l-3.48 0 z M19.700000000000003 8 l-1.24 0 l0 10 l1.24 0 c0.7 0 1.12 -0.36 1.12 -1.36 l0 -7.28 c0 -1 -0.42 -1.36 -1.12 -1.36 z M26.62 8 l0 3.9 l3.02 0 l0 2 l-3.02 0 l0 4.1 l3.8 0 l0 2 l-6 0 l0 -14 l6 0 l0 2 l-3.8 0 z M37.92 6 l1.6 9.94 l0.04 0 l1.48 -9.94 l3.06 0 l0 14 l-2.08 0 l0 -10.04 l-0.04 0 l-1.48 10.04 l-2.08 0 l-1.6 -9.9 l-0.04 0 l0 9.9 l-1.92 0 l0 -14 l3.06 0 z M45.699999999999996 20 l0 -14 l2.2 0 l0 14 l-2.2 0 z M49.22 9.36 c0 -2.24 1.1 -3.52 3.24 -3.52 s3.24 1.28 3.24 3.52 l0 0.44 l-2.08 0 l0 -0.58 c0 -1 -0.4 -1.38 -1.1 -1.38 s-1.1 0.38 -1.1 1.38 c0 1.02 0.44 1.78 1.88 3.04 c1.84 1.62 2.42 2.78 2.42 4.38 c0 2.24 -1.12 3.52 -3.28 3.52 s-3.28 -1.28 -3.28 -3.52 l0 -0.86 l2.08 0 l0 1 c0 1 0.44 1.36 1.14 1.36 s1.14 -0.36 1.14 -1.36 c0 -1.02 -0.44 -1.78 -1.88 -3.04 c-1.84 -1.62 -2.42 -2.78 -2.42 -4.38 z M56.33999999999999 8 l0 -2 l6.8 0 l0 2 l-2.3 0 l0 12 l-2.2 0 l0 -12 l-2.3 0 z M63.99999999999999 6 l2.2 0 l0 10.8 c0 1 0.44 1.36 1.14 1.36 s1.14 -0.36 1.14 -1.36 l0 -10.8 l2.08 0 l0 10.66 c0 2.24 -1.12 3.52 -3.28 3.52 s-3.28 -1.28 -3.28 -3.52 l0 -10.66 z M78.89999999999999 20 l-2.24 0 c-0.12 -0.36 -0.2 -0.58 -0.2 -1.72 l0 -2.2 c0 -1.3 -0.44 -1.78 -1.44 -1.78 l-0.76 0 l0 5.7 l-2.2 0 l0 -14 l3.32 0 c2.28 0 3.26 1.06 3.26 3.22 l0 1.1 c0 1.44 -0.46 2.36 -1.44 2.82 l0 0.04 c1.1 0.46 1.46 1.5 1.46 2.96 l0 2.16 c0 0.68 0.02 1.18 0.24 1.7 z M75.32 8 l-1.06 0 l0 4.3 l0.86 0 c0.82 0 1.32 -0.36 1.32 -1.48 l0 -1.38 c0 -1 -0.34 -1.44 -1.12 -1.44 z M84.97999999999999 6 l2.24 14 l-2.22 0 l-0.38 -2.54 l-2.7 0 l-0.38 2.54 l-2.02 0 l2.24 -14 l3.22 0 z M83.24 8.48 l-1.04 7.08 l2.12 0 l-1.04 -7.08 l-0.04 0 z M95.08 20 l-2.24 0 c-0.12 -0.36 -0.2 -0.58 -0.2 -1.72 l0 -2.2 c0 -1.3 -0.44 -1.78 -1.44 -1.78 l-0.76 0 l0 5.7 l-2.2 0 l0 -14 l3.32 0 c2.28 0 3.26 1.06 3.26 3.22 l0 1.1 c0 1.44 -0.46 2.36 -1.44 2.82 l0 0.04 c1.1 0.46 1.46 1.5 1.46 2.96 l0 2.16 c0 0.68 0.02 1.18 0.24 1.7 z M91.5 8 l-1.06 0 l0 4.3 l0.86 0 c0.82 0 1.32 -0.36 1.32 -1.48 l0 -1.38 c0 -1 -0.34 -1.44 -1.12 -1.44 z M99.84 16.9 l-1.96 0 c-0.08 -0.24 -0.12 -0.5 -0.12 -0.86 c0 -1.12 0.28 -1.94 1.14 -3.16 c0.98 -1.4 1.26 -2.32 1.26 -3.66 c0 -1 -0.4 -1.38 -1.1 -1.38 s-1.1 0.38 -1.1 1.38 l0 1.52 l-2.08 0 l0 -1.38 c0 -2.24 1.1 -3.52 3.24 -3.52 s3.24 1.28 3.24 3.52 c0 1.5 -0.4 2.58 -1.48 4.02 c-0.86 1.16 -1.12 1.84 -1.12 2.74 c0 0.26 0.02 0.52 0.08 0.78 z M97.78 17.88 l2.12 0 l0 2.12 l-2.12 0 l0 -2.12 z"></path></g></svg>
        </Text>
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
          <div>
            <Button
              type="submit"
              label="Checar 👀"
              styleSheet={{ marginTop: { xs: '30px' } }}
              disabled={form.isInvalid}
              fullWidth
              size='large'
            />
          </div>
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}
