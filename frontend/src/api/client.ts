import type { VillageDTO } from './types';

const BASE_URL = 'http://localhost:8000';

export async function fetchVillage(): Promise<VillageDTO> {
  const response = await fetch(`${BASE_URL}/api/village/`);
  const data: VillageDTO = await response.json();
  return data;
}

export async function saveVillage(dto: VillageDTO): Promise<void> {
  await fetch(`${BASE_URL}/api/village/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
}