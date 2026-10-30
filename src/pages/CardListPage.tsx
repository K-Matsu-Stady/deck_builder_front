import { useEffect, useState } from "react";
import type { Card } from "../types/card";
import { CardImage } from "../components/CardImage";
import { PageHeader } from "../components/PageHeader";
import type { CardSearchConditions } from "../types/cardSearchConditions";
import { initialCardSearchConditions } from "../constants/initialCardSearchConditions";
import { CardSearchPanel } from "../components/CardSearchPanel";

type CardsResponse = {
    cards: Card[];
    status: boolean;
};


// 一旦検索は名前のみ
export const CardListPage = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [conditions, setConditions] = useState<CardSearchConditions>(initialCardSearchConditions);

    const [cards, setCards] = useState<Card[]>([]);

    const fetchCards = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cards`);

            if (!response.ok) {
                throw new Error(`カードの取得に失敗しました: ${response.status}`);
            }

            const data: CardsResponse = await response.json();

            setCards(data.cards);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const handleSearch = async () => {
        try {
            const params = new URLSearchParams();

            if (conditions.name.trim()) {
                params.set("name", conditions.name.trim());
            }
            
            conditions.colors.forEach((color) => {
                params.append("colors[]", color);
            });

            conditions.types.forEach((type) => {
                params.append("types[]", type);
            });

            if (conditions.minCost !== null) {
                params.set("minCost", String(conditions.minCost));
            }

            if (conditions.maxCost !== null) {
                params.set("maxCost", String(conditions.maxCost));
            }

            if (conditions.minEnergy !== null) {
                params.set("minEnergy", String(conditions.minEnergy));
            }

            if (conditions.maxEnergy !== null) {
                params.set("maxEnergy", String(conditions.maxEnergy));
            }

            if (conditions.minBp !== null) {
                params.set("minBp", String(conditions.minBp));
            }

            if (conditions.maxBp !== null) {
                params.set("maxBp", String(conditions.maxBp));
            }

            const response = await fetch(`${API_BASE_URL}/api/cards?${params.toString()}`);

            if (!response.ok) {
                throw new Error("カード検索に失敗しました");
            }

            const data = await response.json();
            setCards(data.cards);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <PageHeader title="カード一覧" />

            <div className="flex divide-x">
                <div className="w-[75%]">
                    <div className="w-full flex flex-wrap">
                        {cards.map((card) => (
                            <CardImage key={card.id} card={card} />
                        ))}
                    </div>
                </div>

                <CardSearchPanel
                    conditions={conditions}
                    onChange={setConditions}
                    onSearch={handleSearch}
                />
            </div>
        </div>
    );
};
