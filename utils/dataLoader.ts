import fs from 'fs';
export function loadTestData(fileName: string): any {
  return JSON.parse(fs.readFileSync(`./data/${fileName}`, 'utf-8'));
}