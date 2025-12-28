import { useState, useEffect } from 'react';
import { useRepoSearch } from './hooks/useRepoSearch.ts';
import gitpic from './assets/github.png';
import Card from './components/ui/card';
import Button from './components/ui/button';
import CommitChart from './components/charts/commit';
import LanguageChart from './components/charts/language';
import { MetricConfig } from './types/cardtype.ts';
import { buildMetrics } from './helpers/buildMetrics.ts';
import { buildLanguageChart } from './helpers/buildLanguageChart.ts';
import './App.css';



function App() {
  
  const { data, loading, search } = useRepoSearch(); // se usar os debugs logs, adicionar 'error' aqui
  const [term, setTerm] = useState('');
  const metrics = data ? buildMetrics(data) : [];
  const langData = data ? buildLanguageChart(data.languages, 4) : [];
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  // Função que puxa o repo mais estrelado
  useEffect(() => {
    search('stars:>=10000');
  }, []);

  // DEBUG LOGS
  // console.log('DATA DO HOOK:', data);
  // console.log('LOADING:', loading);
  // console.log('ERROR:', error);
  // console.log('COMMIT DATA:', data?.commitStats);
  // console.log('TYPE:', typeof data?.commitStats);


  // handle de busca de repos
  const handleSearch = (term: string) => {

  if (!term.trim()) {
    alert('Digite o nome de um repositório!');
    return;
  }

  search(term);

};

const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setTerm(value);

  if (value.length > 1) { // busca sugestões só se o termo tiver mais de 1 caractere
    try {
      const res = await fetch(`https://api.github.com/search/repositories?q=${value}&sort=stars&order=desc&per_page=5`);
      const data = await res.json();

      if (data.items) {
        setSuggestions(data.items.map((repo: any) => repo.name));
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    }
  } else {
    setSuggestions([]);
  }
};

  return (
    <>
          <div className='overlay'>
        <div className='repo-search'>
          <div className='input-suggestions'>
            <input type="text"
            value={term}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder='Digite o nome do repositório'/>
            {isFocused && suggestions.length > 0 && (
            <ul className='suggestions'>
              {suggestions.map((s) => (
              <li 
                key={s} 
                onMouseDown={() => setTerm(s)} 
                style={{ padding: '8px', cursor: 'pointer' }}
              >
                {s}
              </li>
              ))}
            </ul>
            )}
          </div>
          <Button 
            onClick={() => handleSearch(term)}
          />
        </div>
        <div className={`dashboard ${loading ? 'loading' : ''}`}> 
          <div className='sidebar'>
            <img className='sidebar-icon' 
            src={data?.repo?.owner?.avatar_url || gitpic}
            alt="GitHub Logo" />
            <div className='sidebar-header'>
              <p>Repositório: {data?.repo?.name}</p>
              <p>Dono: {data?.repo?.owner.login}</p>
            </div>
            {metrics.map((metric) => {
              const config = MetricConfig[metric.type];
              
              return (
                <Card
                  key={metric.type}
                  metric={metric}
                  icon={config.icon}
                />
              );
            })}
          </div>
          <div className='graphs'>
            <div className='commit-chart'>
              <h3 className='chart-title'>Commits nas últimas semanas</h3>
              <CommitChart data={data?.commitStats} />
            </div>
            <div className='language-chart'>
              <h3 className='chart-title'>Linguagens mais usadas</h3>
                <LanguageChart data={langData} />
            </div>
          </div>
        </div>  
      </div>
    </>

  )
}
export default App;

