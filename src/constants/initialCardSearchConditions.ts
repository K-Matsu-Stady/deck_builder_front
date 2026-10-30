import type { CardSearchConditions } from "../types/cardSearchConditions";

export const initialCardSearchConditions: CardSearchConditions = {
    name: "",
    colors: [],
    types: [],
    minCost: null,
    maxCost: null,
    minEnergy: null,
    maxEnergy: null,
    minBp: null,
    maxBp: null,
    triggers: [],
    traits: [],
};
