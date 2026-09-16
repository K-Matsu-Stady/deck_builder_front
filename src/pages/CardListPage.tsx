import { useEffect, useState } from "react";
import type { Card } from "../types/card";
import { Link } from "react-router";

type CardsResponse = {
    cards: Card[];
    status: boolean;
};

export const CardListPage = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [cards, setCards] = useState<Card[]>([]);

    const [cardKeyword, setcardKeyword] = useState('');

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

    return (
        <div className="flex divide-x">
            <div className="w-[75%]">
                <h1>カード一覧</h1>

                <div className="w-full flex flex-wrap">
                    {cards.map((card) => (
                        <Link to={`/cards/${card.id}`}>
                            <img src="./images/default_card.png" alt="" className="w-50 object-cover" />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="w-[25%]">
                <h2>カード検索</h2>

                <form>
                    <div>
                        <label>カード名</label>
                        <input
                            type="text"
                            value={cardKeyword}
                            onChange={(event) => setcardKeyword(event.target.value)}
                            placeholder="カード名を検索"
                        />
                    </div>

                    <button type="submit">検索</button>

                    <button type="button">リセット</button>
                </form>
            </div>
        </div>
    );
};
