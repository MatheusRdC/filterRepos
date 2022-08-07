import { useEffect, useState } from "react";

interface Repos {
  id: number;
  name: string;
}

export function App() {
  const [repos, setRepos] = useState<Repos[]>([]);
  const [search, setSearch] = useState('');

  console.log('Renderizou');

  useEffect(() => {
    fetch('https://api.github.com/users/matheusrdc/repos')
      .then(response => response.json())
      .then(data => setRepos(data));
  }, [])

  const filterrepos = repos.filter(repo => repo.name.includes(search))

  return (
    <>
      <input
        type="text"
        placeholder="Buscar..."
        onChange={e => setSearch(e.target.value)}
      />

      {search.length > 0 ?
        <ul>
          {filterrepos.map((repositories) => (
            <li key={repositories.id}>{repositories.name}</li>
          ))}
        </ul>
        :
        <ul>
          {repos.map((repositories) => (
            <li key={repositories.id}>{repositories.name}</li>
          ))}
        </ul>}
    </>
  )
}