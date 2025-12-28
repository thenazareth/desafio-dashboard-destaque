import { fetchGitHub } from './githubApi';
import type { GitHubRepo} from '../types/github.ts';

interface SearchResponse {
  items: GitHubRepo[];
}

// GET Repo com mais Estrelas
export async function getRepo(
  query: string
) {
  const response = await fetchGitHub<SearchResponse>(
    `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=1`
  );

  if (!response.items.length) {
    throw new Error('Nenhum repositório encontrado');
  }

  const repo = response.items[0];

  return {
    repo,
    owner: repo.owner,
    metrics: {
    totalStars: repo.stargazers_count,
    totalForks: repo.forks_count,
    totalWatchers: repo.watchers_count,
    }
  };
}
