import { useEffect, useState } from "react";
import type { Deck } from "../types/deck";

type DecksResponse = {
    decks: Deck[];
    status: boolean;
};


export const DeckListPage = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [decks, setDecks] = useState<Deck[]>([]);

    useEffect(() => {
        const fetchDecks = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/decks`);

                if (!response.ok) {
                    throw new Error(`デッキの取得に失敗しました: ${response.status}`);
                }

                const data: DecksResponse = await response.json();

                setDecks(data.decks);
            } catch (error) {
                console.log(error);
            }
        };

        fetchDecks();
    }, []);

    return (
        <div className="flex divide-x">
            <div className="w-[75%]">
                <h1>デッキ一覧</h1>

                {decks && decks.length > 0 ? (
                    <div className="w-full flex flex-wrap">
                        {decks.map((deck) => (
                            <div key={deck.id}>
                                <p>{deck.name}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>データがありません</p>
                )}
            </div>
        </div>
    );
};
