// lib/logs.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const logsDirectory = path.join(process.cwd(), 'logs');

function getAllMarkdownFiles(dirPath: string, arrayOfFiles: string[] = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllMarkdownFiles(fullPath, arrayOfFiles);
    } else {
      if (file.endsWith('.md')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

export function getSortedLogsData() {
  const filePaths = getAllMarkdownFiles(logsDirectory);

  const allLogsData = filePaths.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id: filePath,
      date: matterResult.data.date,
      version: matterResult.data.version || matterResult.data.date,
      summary: matterResult.data.summary || '',
      tags: matterResult.data.tags || [],
      content: matterResult.content,
    };
  });

  return allLogsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}