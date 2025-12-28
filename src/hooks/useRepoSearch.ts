import { useState } from 'react';
import { getRepo } from '../services/repoService';
import { getRepoDashboard } from '../services/dashService';
import type { RepoDashboard } from '../types/github';

export function useRepoSearch() {
  const [data, setData] = useState<RepoDashboard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function search(term: string) {
    if (!term.trim()) return;

    try {
      setLoading(true);
      setError(null);

      // Busca o repositório mais estrelado pelo termo
      const repo = await getRepo(term);

      if (!repo) {
        setError('Nenhum repositório encontrado');
        setData(null);
        return;
      }

      const dashboard = await getRepoDashboard(repo.repo.full_name);

      setData(dashboard);

    } catch (err) {
      console.error(err);
      setError('Erro ao buscar repositório');
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    loading,
    error,
    search
  };
}

