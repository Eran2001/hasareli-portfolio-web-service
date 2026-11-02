import { useQuery } from '@tanstack/react-query'

import { fetchPortfolio } from '@/services/portfolio-service'

export function usePortfolioQuery() {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: fetchPortfolio,
    staleTime: Infinity,
  })
}
