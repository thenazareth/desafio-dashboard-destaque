import { fetchGitHub } from './githubApi';
import type { 
  GitHubRepo, 
  RepoLanguages,
  RepoDashboard,
} from '../types/github';
import { githubHeaders } from './githubApi';


export async function getRepoDashboard(fullName: string): Promise<RepoDashboard> {
  console.log(`Buscando: ${fullName}`);
  
  // Busca dados do repositório
  const repo = await fetchGitHub<GitHubRepo>(
    `https://api.github.com/repos/${fullName}`
  );

  // Busca linguagens
  const languages = await fetchGitHub<RepoLanguages>(
    `https://api.github.com/repos/${fullName}/languages`
  );

  // Busca commits
  const commitActivity = await fetchCommitActivity(fullName);

  // Pega últimas 4 semanas
  const last4Weeks = commitActivity.slice(-4).map((week, index) => ({
    week: `Semana ${index + 1}`,
    commits: week.total,
    timestamp: week.week || Date.now() / 1000
  }));

  // Calcula métricas
 const metrics = {
  totalStars: repo.stargazers_count,
  totalForks: repo.forks_count,
  totalWatchers: repo.watchers_count,
};
  return {
    repo,
    owner: repo.owner,
    languages,
    metrics,
    commitStats: last4Weeks,
  };
}

  // Função para buscar commit com retry
async function fetchCommitActivity(fullName: string): Promise<any[]> {
  for (let i = 0; i < 5; i++) {
    const response = await fetch(
      `https://api.github.com/repos/${fullName}/stats/commit_activity`,
      { headers: githubHeaders }
    );

    if (response.status === 202) {
      await new Promise(r => setTimeout(r, 1000)); // espera 1s e tenta de novo
    } else if (response.ok) {
      const data = await response.json();
      if (data.length > 0) return data; // só retorna se houver commits
      await new Promise(r => setTimeout(r, 1000)); // array vazio → tenta de novo
    } else {
      console.error(`Erro na API de commits: ${response.status} ${response.statusText}`);
      return []; 
    }
  }
  return []; 
}