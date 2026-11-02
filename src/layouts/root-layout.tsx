import { Outlet } from '@tanstack/react-router'

import { PortfolioChat } from '@/components/chat/portfolio-chat'
import { SiteHeader } from '@/components/hero/site-header'

export function RootLayout() {
  return (
    <>
      <SiteHeader />
      <Outlet />
      <PortfolioChat />
    </>
  )
}
