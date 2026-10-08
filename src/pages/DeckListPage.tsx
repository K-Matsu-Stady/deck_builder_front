import { useEffect, useState } from "react";
import type { Deck } from "../types/deck";
import { PageHeader } from "../components/PageHeader";
import { Button } from "../components/Button";
import { SquarePen } from "lucide-react";
import { Link } from "react-router";

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
        <div>
            <PageHeader title="デッキ一覧">
                <Button>新規作成</Button>
            </PageHeader>

            <div className="flex divide-x">
                <div className="w-[75%]">
                    {decks && decks.length > 0 ? (
                        <div className="w-full flex flex-wrap">
                            {decks.map((deck) => (
                                <div key={deck.id} className="flex gap-2.5">
                                    <p>{deck.name}</p>
                                    <Link to={`/decks/${deck.id}/edit`}>
                                        <SquarePen />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>データがありません</p>
                    )}
                </div>
            </div>
        </div>
    );
};
