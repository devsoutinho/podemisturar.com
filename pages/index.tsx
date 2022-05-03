import { useRouter } from 'next/router';
import React, { useState } from 'react';

function useForm({
  initialValues,
}) {
  const [values, setValues] = useState(initialValues);

  function setValue(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.name;
    setValues((currentValues) => {
      return {
        ...currentValues,
        [name]: value,
      };
    })
  }

  return {
    values,
    setValue
  };
}

export default function HomePage() {
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
          <button>
            Checar 👀
          </button>
        </div>
      </form>
    </main>
  )
}
