const { existsSync, mkdirSync, copyFileSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');

const baseFolder = ".certs/";
if (!existsSync(baseFolder)) {
  mkdirSync(baseFolder);
}

const certificateName = "aufy.client";
const certFilePath = join(baseFolder, `${certificateName}.pem`);
const keyFilePath = join(baseFolder, `${certificateName}.key`);

if (!existsSync(certFilePath) || !existsSync(keyFilePath)) {
    const res = spawnSync('dotnet', [
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

