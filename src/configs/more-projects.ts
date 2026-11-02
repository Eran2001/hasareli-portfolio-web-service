export type MoreProject = {
  slug: string
  name: string
  summary: string
  stack: string[]
  url: string
  live: string
  visibility: 'Public' | 'Private'
}

export const moreProjects: MoreProject[] = [
  { slug: 'devicehub', name: 'DeviceHub', summary: 'Custom WooCommerce WordPress theme for the Hutch DeviceHub store.', stack: ['WordPress', 'WooCommerce', 'PHP'], url: 'https://github.com/Eran2001/wp-devicehub-theme-web-service', live: 'https://dev-devicehub.hutch.xhive.io/', visibility: 'Public' },
  { slug: 'student-management', name: 'Student management', summary: 'Student management app with a Go API and a web frontend.', stack: ['Go', 'Web'], url: 'https://github.com/Eran2001/student-management-api-service', live: '', visibility: 'Public' },
  { slug: 'ledger', name: 'Ledger', summary: 'A private personal money manager with manual accounts and no bank links.', stack: ['TypeScript'], url: 'https://github.com/Eran2001/expense-tracker-web-service', live: '', visibility: 'Public' },
  { slug: 'wealth-vision', name: 'Wealth Vision', summary: 'A personal finance site built with React and Vite.', stack: ['React', 'Vite'], url: 'https://github.com/Eran2001/wealth-vision-web-service', live: 'https://wealth-vision-eosin.vercel.app', visibility: 'Public' },
  { slug: 'collina', name: 'Collina', summary: 'A Next.js site for a Ceylon export house, with a product catalogue.', stack: ['Next.js'], url: 'https://github.com/Eran2001/cielan-app-web-service', live: 'https://cielan-app-web-service.vercel.app', visibility: 'Private' },
  { slug: 'cleveri', name: 'Cleveri', summary: 'React frontend with sign-in, a home screen, and profile settings.', stack: ['React', 'TypeScript'], url: 'https://github.com/Eran2001/cleveri-ai-web-service', live: '', visibility: 'Private' },
  { slug: 'lumex', name: 'Lumex', summary: 'Showcase site for a data analytics product with live dashboards.', stack: ['TypeScript'], url: 'https://github.com/Eran2001/lumex-showcase-web-service', live: '', visibility: 'Public' },
  { slug: 'auth-screens', name: 'Auth screens', summary: 'Responsive sign-in and sign-up screens built with Next.js.', stack: ['Next.js'], url: 'https://github.com/Eran2001/responsive-auth-layout-web-service', live: 'https://responsive-auth-layout-web-service-ruddy.vercel.app', visibility: 'Public' },
  { slug: 'fintech-hive', name: 'FinTech Hive', summary: 'WordPress theme for the FinTech Hive site.', stack: ['WordPress', 'PHP'], url: 'https://github.com/Eran2001/wp-fintech-hive-theme-web-service', live: '', visibility: 'Private' },
  { slug: 'grow-platform', name: 'Grow Platform', summary: 'WordPress theme whose templates and stylesheet are branded FinTech Hive.', stack: ['WordPress', 'CSS'], url: 'https://github.com/Eran2001/wp-grow-platform-theme-web-service', live: '', visibility: 'Private' },
  { slug: 'tanstack-table', name: 'TanStack Table', summary: 'Demo of TanStack Table with sorting and drag-and-drop columns.', stack: ['TanStack Table', 'TypeScript'], url: 'https://github.com/Eran2001/tanstack-table-showcase-web-service', live: 'https://tanstack-table-showcase-web-service.vercel.app', visibility: 'Public' },
  { slug: 'luxe-commerce', name: 'Luxe Commerce', summary: 'A React storefront UI.', stack: ['React', 'TypeScript'], url: 'https://github.com/Eran2001/e-commerce-web-service', live: 'https://v0-e-commerce-web-service.vercel.app', visibility: 'Public' },
  { slug: 'lunar-luxe-mart', name: 'Lunar Luxe Mart', summary: 'Shop with cart, checkout, and wishlist, built on TanStack Start.', stack: ['TanStack Start', 'TypeScript'], url: 'https://github.com/Eran2001/lunar-luxe-mart', live: 'https://lunar-luxe-mart.vercel.app', visibility: 'Public' },
  { slug: 'job-tracker', name: 'Job tracker', summary: 'Job application tracker with a drag-and-drop board.', stack: ['TypeScript'], url: 'https://github.com/Eran2001/job-application-tracker-web-service', live: '', visibility: 'Public' },
  { slug: 'saas-admin', name: 'SaaS admin', summary: 'Next.js SaaS dashboard with mock projects, team, billing, and settings.', stack: ['Next.js'], url: 'https://github.com/Eran2001/saas-mutli-tenant-admin-panel-web-service', live: '', visibility: 'Public' },
  { slug: 'lankabites', name: 'LankaBites', summary: 'React frontend for a Sri Lankan food-ordering app.', stack: ['React', 'TypeScript'], url: 'https://github.com/Eran2001/food-ordering-application-web-service', live: '', visibility: 'Public' },
  { slug: 'lankabites-api', name: 'LankaBites API', summary: 'API for the Sri Lankan food-ordering app.', stack: ['TypeScript'], url: 'https://github.com/Eran2001/food-ordering-application-api-service', live: '', visibility: 'Public' },
  { slug: 'nexusflow', name: 'NexusFlow', summary: 'A React marketing page for a SaaS product.', stack: ['React', 'TypeScript'], url: 'https://github.com/Eran2001/nexus-sass-web-service', live: 'https://nexus-sass-application.vercel.app', visibility: 'Public' },
  { slug: 'earlier-portfolio', name: 'Earlier portfolio', summary: 'Earlier personal portfolio, built in React with Lovable.', stack: ['React', 'TypeScript'], url: 'https://github.com/Eran2001/eran-hasareli-personal-portfolio', live: '', visibility: 'Public' },
  { slug: 'finflow', name: 'FinFlow', summary: 'A personal finance tracker for income and expenses.', stack: ['React', 'TypeScript'], url: 'https://github.com/Eran2001/income-expenses-web-service', live: 'https://income-expenses-react.vercel.app', visibility: 'Public' },
  { slug: 'lumina', name: 'Lumina', summary: 'A photography studio portfolio with a gallery, services, and journal.', stack: ['TypeScript'], url: 'https://github.com/Eran2001/neo-subasinghe-portfolio', live: 'https://new-neo-port.vercel.app', visibility: 'Public' },
  { slug: 'fine-management', name: 'Fine management', summary: 'Fine management app with a React client and a separate server.', stack: ['React', 'JavaScript'], url: 'https://github.com/Eran2001/fine-management-web-service', live: '', visibility: 'Public' },
  { slug: 'store-pro', name: 'Store Pro', summary: 'A React and TypeScript e-commerce storefront.', stack: ['React', 'TypeScript'], url: 'https://github.com/Eran2001/store-pro-e-commerce-store-web-service', live: 'https://e-commerce-store-one-rouge.vercel.app', visibility: 'Public' },
  { slug: 'react-portfolio', name: 'React portfolio', summary: 'Earlier React portfolio, including a downloadable PDF resume.', stack: ['React', 'JavaScript'], url: 'https://github.com/Eran2001/era-react-portfolio', live: 'https://era-react-portfolio.vercel.app', visibility: 'Public' },
  { slug: 'todo-api', name: 'Todo API', summary: 'Laravel app whose public route reports that the API is running.', stack: ['Laravel', 'PHP'], url: 'https://github.com/Eran2001/todo-web-service', live: '', visibility: 'Public' },
  { slug: 'blog', name: 'Blog', summary: 'PHP and Bootstrap blog with a sign-up page.', stack: ['PHP', 'Bootstrap'], url: 'https://github.com/Eran2001/blog-post-web-service', live: '', visibility: 'Public' },
  { slug: 'task-board', name: 'Task board', summary: 'React frontend for the task and project management API.', stack: ['React', 'JavaScript'], url: 'https://github.com/Eran2001/task-and-project-management-system-web-service', live: 'https://e-commerce-web-service-nine.vercel.app', visibility: 'Public' },
  { slug: 'task-board-api', name: 'Task board API', summary: 'Express and MongoDB API for users, projects, tasks, and messages.', stack: ['Express', 'MongoDB'], url: 'https://github.com/Eran2001/task-and-project-management-system-api-service', live: 'https://e-commerce-api-service.vercel.app', visibility: 'Public' },
]

export function findProject(slug: string) {
  return moreProjects.find((project) => project.slug === slug)
}
