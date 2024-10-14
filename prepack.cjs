const axios = require('axios');
const fs = require('fs');
const path = require('path');
const repository = 'dimaslanjaka/markdown-it';
const urlTemplate = 'https://github.com/dimaslanjaka/markdown-it/raw/{hash}/release/markdown-it.tgz';

const pkg = require('./package.json');

async function getLatestCommitHash() {
  try {
    const response = await axios.get(`https://api.github.com/repos/${repository}/commits`);
    return response.data[0].sha; // Get the latest commit hash
  } catch (error) {
    console.error('Error fetching the latest commit:', error.message);
    return null;
  }
}

async function updateUrl() {
  const latestHash = await getLatestCommitHash();
  if (latestHash) {
    const newUrl = urlTemplate.replace('{hash}', latestHash);
    console.log('Updated URL:', newUrl);
    pkg.dependencies['markdown-it'] = newUrl;
    pkg.resolutions['markdown-it'] = newUrl;
    pkg.overrides['markdown-it'] = newUrl;
    fs.writeFileSync(path.resolve(__dirname, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
  } else {
    console.log('Failed to retrieve the latest hash.');
  }
}

updateUrl();
