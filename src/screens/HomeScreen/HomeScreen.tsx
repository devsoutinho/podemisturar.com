import { useRouter } from 'next/router';
import { useForm } from '@src/components/forms/useForm/useForm';
import { pageHOC } from '@src/components/pageHOC/pageHOC';
import Button from '@src/components/commons/Button/Button';

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
    <main>
      <h1>Pode misturar?</h1>
      <form onSubmit={(event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { coisa1, coisa2 } = form.values;
        const combinationUrl = '/combina/' + coisa1.toLowerCase() + '-com-' + coisa2.toLowerCase();
        router.push(combinationUrl);
      }}>
        <input
          placeholder='Primeira Coisa'
          name="coisa1"
          onChange={form.setValue}
          value={form.values.coisa1}
        />
        <p>Com</p>
        <input
          placeholder='Segunda Coisa'
          name="coisa2"
          onChange={form.setValue}
          value={form.values.coisa2}
        />
        <div>
          <Button type="submit" label="Checar 👀" />
        </div>
      </form>
    </main>
  )
}
