import type { Trait } from "./trait";

export type CardDetail = {
    id: number;
    card_number: string;
    name: string;
    type: string;
    cost: number;
    ap: number;
    color: string;
    energy: number;
    energy_modifier: number;
    bp: number;
    bp_modifier: number;
    trigger: string;
    effect: string;
    traits: Trait[];
};
