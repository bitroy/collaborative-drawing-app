export default {
  '*.{ts,tsx,js,jsx,css,md,json}': [
    'prettier --write', // Format files
    'eslint --fix', // Lint and auto-fix (ESLint will pick up workspace-specific configs)
  ],
};
