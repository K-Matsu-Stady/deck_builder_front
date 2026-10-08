import type { DeckCard } from "./deckCard";

export type DeckWithCard = {
    id: number;
    name: string;
    cards: DeckCard[];
};
