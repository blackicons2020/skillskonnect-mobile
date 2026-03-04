import { skillNames } from './skillTypes';

// Derive the flat skill list from the canonical skillTree (defined in skillTypes.ts).
// This ensures every dropdown, filter, and search across the app stays in sync.
export const SKILL_TYPES: string[] = skillNames;

// Backward-compatible alias used by Dashboard, ClientDashboard, Hero, etc.
export const CLEANING_SERVICES: string[] = SKILL_TYPES;

