import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

console.log('🚀 Starting OpenClaw Shovel Deployment to Fly.io');

const checkCommand = (cmd: string, name: string) => {
  try {
    execSync(`${cmd} --version`, { stdio: 'ignore' });
  } catch {
    console.error(`❌ ${name} is not installed or not in PATH. Please install it first.`);
    process.exit(1);
  }
};

checkCommand('flyctl', 'Fly CLI');

const FLY_TOML_PATH = path.join(process.cwd(), 'fly.toml');
const hasFlyConfig = fs.existsSync(FLY_TOML_PATH);

if (!hasFlyConfig) {
  console.log('\n📝 No fly.toml found. Initializing Fly app...');
  try {
    // Run fly launch but don't deploy yet
    execSync('flyctl launch --no-deploy --yes', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to initialize Fly app.');
    process.exit(1);
  }
}

// Generate Dockerfile if not exists
const DOCKERFILE_PATH = path.join(process.cwd(), 'Dockerfile');
if (!fs.existsSync(DOCKERFILE_PATH)) {
  console.log('\n🐳 Generating Dockerfile for Next.js app...');
  const dockerfileContent = `
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
  `.trim();
  fs.writeFileSync(DOCKERFILE_PATH, dockerfileContent);
  console.log('✅ Dockerfile created.');
}

console.log('\n🚢 Deploying to Fly.io...');
try {
  execSync('flyctl deploy', { stdio: 'inherit' });
  console.log('\n✅ Deployment successful!');
  console.log('🌍 Your app is now live.');
} catch (error) {
  console.error('\n❌ Deployment failed. Check the logs above for details.');
  process.exit(1);
}
