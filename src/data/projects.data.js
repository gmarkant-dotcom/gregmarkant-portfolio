export const projects = [
  {
    id: 'jpmc-vip-001',
    client: 'JPMorgan Chase',
    projectName: 'Chairman’s Circle VIP Program',
    year: 2019,
    endYear: 2022,
    heroImage: '/projects/jpmc-vip.jpg',
    caption:
      "Led end-to-end strategy and production for JPMC's premier VIP client hospitality program across US Open, Kentucky Derby, and Wimbledon. Managed $4M+ annual portfolio, 14-vendor ecosystem, and C-suite stakeholder relationships.",
    industry: 'banking',
    skills: ['experiential', 'partnerships', 'operations', 'strategy'],
    featured: true,
  },
  // Add more entries here in Phase 4
]

// All unique industries across projects — used to build filter pills
export function getIndustries() {
  return [...new Set(projects.map((p) => p.industry))].sort()
}

// All unique skills across projects — used to build filter pills
export function getSkills() {
  return [...new Set(projects.flatMap((p) => p.skills))].sort()
}
