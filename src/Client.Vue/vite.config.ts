import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path';
import fs from 'fs';
import child_process from 'child_process';

const baseFolder =
    process.env.APPDATA !== undefined && process.env.APPDATA !== ''
        ? `${process.env.APPDATA}/ASP.NET/https`
        : `${process.env.HOME}/.aspnet/https`;

const certificateArg = process.argv.map(arg => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
const certificateName = certificateArg ? certificateArg.groups.value : "aufy.client";

if (!certificateName) {
  console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.')
  process.exit(-1);
}

const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  const res = child_process.spawnSync('dotnet', [
    'dev-certs',
    'https',
    '--format',
    'pem',
    '-ep',
    certFilePath,
    '--no-password',
  ], { stdio: 'inherit', });

  if (res.status !== 0) {
    console.error('Failed to generate certificate.');
  }
}


export default defineConfig({
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'https://localhost:7050',
        changeOrigin: true,
        secure: false,
      },
      '/swagger': {
        target: 'https://localhost:7050',
        changeOrigin: true,
        secure: false,
      }
    },
    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath),
    }
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
