
// Users do GitHub
export interface RepoOwner {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
}

// Repo do GitHub
export interface GitHubRepo {
  id: number;
  name: string;
  owner: RepoOwner;
  full_name: string;
  html_url: string;
  languages: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
}

// Commits do repo
export interface WeeklyCommit {
  week: number;
  total: number;
  days: number[];
}

// Linguagens repos
export interface RepoLanguages {
  [language: string]: number;
}

// Dados para o dashboard
export interface RepoDashboard {
  owner: RepoOwner;
  repo: GitHubRepo;
  languages: RepoLanguages; 
  metrics: {
    totalStars: number;
    totalForks: number;
    totalWatchers: number;
    lastCommits?: number;
  };
  commitStats?: Array<{
    week: string;
    commits: number;
    timestamp: number;
  }>;
}
