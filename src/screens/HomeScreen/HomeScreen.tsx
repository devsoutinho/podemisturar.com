import { useRouter } from 'next/router';
import { useForm } from '@src/components/forms/useForm/useForm';
import { pageHOC } from '@src/components/pageHOC/pageHOC';
import { Button } from '@src/components/commons/Button/Button';
import { TextField } from '@src/components/commons/TextField/TextField';
import { Text } from '@src/components/commons/Text/Text';
import { Box } from '@src/components/commons/Box/Box';

export async function getStaticProps() {
  const GRAPH_CMS_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NTE2ODM5NzcsImF1ZCI6WyJodHRwczovL2FwaS1zYS1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2NsMnFweml5cTBvcHYwMXoyNnEzazk0YjYvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiOTJkOTYyOTYtYmIxOS00NzM2LThjMDktMTFjNjlhYThjMjAxIiwianRpIjoiY2wycnR6dHE4MjBlMDAxejgwOWk0MHYzYSJ9.Y9pnBS_PPkL9dbSmvIwcdy2mUCE-CcBQpQBz4k7rq9ZBVZaKTP-Urco8Xj3LU1-M6sAfbVHIjfw9PLdwaOH5NZa8pv7tlVb6K8p5QgzgdRTO7SjaDpLNXYy4uVvtBZ_zJ24LUt-JOXbKUBdulDDHO5vHI10pTYJ9GzSNEdsxrdkcUAOhP2s_yK7E3m3DDNqkyooEIpE5QqZo4M1IvJ6h9CnwxE8dman_SQHRjNtRCMqB_m8b8Sc-653rM8Gr9MkDHT1bGLXInzTXvkRaCWIcpZuuOLQ8lNUbp0UGQWgCP3bFOxY8dj7xsNoiuHSvmZP6-e9qP1Dels9ym3gHJTcVxX7J7EKTglrtjAWqyb727i_ZKJSBDcpkRDqDxQz7oI4yxFQy7QHrHbUj2y7a_zu5neV4i01UzDaqLsHUqhp0qihQbYO77hfyShCoPRs2N2wkAXoBXUekbrAnyyxmWK8DezBvftbpbkSHqHOI_IB3ZxQT-IUJb1ptxv5xXwn6vbCjo4a7ML2EY6-mB8j0CBaNJQ3oAtwclWHepUfxjHzYemfiBI6CLw7wZ1Rn_k8QbtW3hVy7rfblT1dFo9zU_3BoHic770XE8SkftU8a5HTj1x2Pio2bkMjVYfuzr8OzaZqQ8cCJc-Ho7GUfDVO0-vP1fTodikcwjRO3Of59lH02lJY';
  const optionsData = await fetch('https://api-sa-east-1.graphcms.com/v2/cl2qpziyq0opv01z26q3k94b6/master', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GRAPH_CMS_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        query {
          items {
            id 
            name
          }
        }
      `,
    }),
  })
  .then(async (res) => {
    const data = await res.json();
    return data;
  })

  console.log(optionsData.data);

  return {
    props: {
      options: optionsData.data.items.map((item) => {
        return {
          id: item.id,
          value: item.name.toLowerCase(),
          label: item.name,
        }
      }),
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
          options={options}
          disabled={!form.values.coisa1}
        />
        <div>
          <Button type="submit" label="Checar 👀" styleSheet={{ marginTop: { xs: '10px' } }} disabled={form.isInvalid} />
        </div>
      </form>
    </Box>
  )
}
