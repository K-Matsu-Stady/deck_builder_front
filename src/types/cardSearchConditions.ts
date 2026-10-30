export type CardSearchConditions = {
    name: string;
    colors: string[];
    types: string[];
    minCost: number | null;
    maxCost: number | null;
    minEnergy: number | null;
    maxEnergy: number | null;
    minBp: number | null;
    maxBp: number | null;
    triggers: string[];
    traits: string[];
};
