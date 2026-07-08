import fs from 'fs';
import path from 'path';
import { Proker, StatusSearchResult } from '@/types';
import { mockProkers, mockRegistrationResults } from './mock-data';

const isVercel = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
const dataFilePath = isVercel 
  ? path.join('/tmp', 'data.json') 
  : path.join(process.cwd(), 'data.json');

export interface Database {
  prokers: Proker[];
  registrations: StatusSearchResult[];
}

// Ensure the database file exists and is seeded with mock data if it doesn't
function ensureDbExists() {
  if (!fs.existsSync(dataFilePath)) {
    const initialData: Database = {
      prokers: mockProkers as unknown as Proker[],
      registrations: mockRegistrationResults as unknown as StatusSearchResult[],
    };
    fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

export function readDb(): Database {
  ensureDbExists();
  const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(fileContent);
}

export function writeDb(data: Database) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
  getProkers: () => readDb().prokers,
  addProker: (proker: Proker) => {
    const data = readDb();
    data.prokers.push(proker);
    writeDb(data);
  },
  updateProker: (id: string, updates: Partial<Proker>) => {
    const data = readDb();
    data.prokers = data.prokers.map(p => p.id === id ? { ...p, ...updates } : p);
    writeDb(data);
  },
  deleteProker: (id: string) => {
    const data = readDb();
    data.prokers = data.prokers.filter(p => p.id !== id);
    writeDb(data);
  },
  getRegistrations: () => readDb().registrations,
  addRegistration: (reg: StatusSearchResult) => {
    const data = readDb();
    data.registrations.push(reg);
    writeDb(data);
  },
  updateRegistrationStatus: (id: string, status: StatusSearchResult['status']) => {
    const data = readDb();
    data.registrations = data.registrations.map(r => r.id === id ? { ...r, status } : r);
    writeDb(data);
  },
};
