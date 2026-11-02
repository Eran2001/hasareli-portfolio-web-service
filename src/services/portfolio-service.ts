import { portfolioContent } from '@/configs/portfolio-content'
import type { PortfolioContent } from '@/types/portfolio'

export function fetchPortfolio(): Promise<PortfolioContent> {
  return Promise.resolve(portfolioContent)
}
