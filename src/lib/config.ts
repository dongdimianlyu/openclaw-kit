// Centralized config for white-labeling
export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'OpenClaw Shovel',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'The ultimate boilerplate for building production-ready AI tools.',
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'OpenClaw Inc.',
  // Provide brand color classes (ensure they exist in tailwind config or are standard tailwind colors)
  theme: {
    primaryColor: process.env.NEXT_PUBLIC_THEME_PRIMARY || 'blue', // e.g. 'blue', 'indigo', 'violet'
  }
};
