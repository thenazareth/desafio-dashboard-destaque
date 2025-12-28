
const GITHUB_TOKEN = `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`;

// Headers padrão para todas as requisições
export const githubHeaders = {
  'Authorization': GITHUB_TOKEN,
  'Accept': 'application/vnd.github.v3+json',
  //'User-Agent': 'GitHub-Dashboard-App'
};

// fetch
export async function fetchGitHub<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, { headers: githubHeaders});

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    //rate limit
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const limit = response.headers.get('X-RateLimit-Limit');
    
    if (remaining && Number(remaining) < 10) {
      console.warn(`Rate limit baixo: ${remaining}/${limit} requisições restantes`);
    }

    return await response.json();
  } 
  
    catch (error) {
    console.error('Erro ao buscar dados do GitHub:', error);
    throw error;
  }
}
