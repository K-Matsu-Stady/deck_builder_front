import { useEffect, useState } from "react";
import type { Card } from "../types/card";
import { CardImage } from "../components/CardImage";

type CardsResponse = {
    cards: Card[];
    status: boolean;
};


// 一旦検索は名前のみ
export const CardListPage = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [cards, setCards] = useState<Card[]>([]);

    const [cardKeyword, setCardKeyword] = useState('');
    const [searchCardKeyword, setSearchCardKeyword] = useState('');

    const fetchCards = async () => {
        try {
            let url = `${API_BASE_URL}/api/cards`;
            if (searchCardKeyword !== '') {
                url += `?name=${encodeURIComponent(searchCardKeyword)}`;
            }

            const response = await fetch(url);

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
    }, [searchCardKeyword]);

    const handleSearch = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setSearchCardKeyword(cardKeyword);
    };

    const handleReset = () => {
        setCardKeyword('');
        setSearchCardKeyword('');
    };

    return (
        <div className="flex divide-x">
            <div className="w-[75%]">
                <h1>カード一覧</h1>

                <div className="w-full flex flex-wrap">
                    {cards.map((card) => (
                        <CardImage key={card.id} card={card} />
                    ))}
                </div>
            </div>

            <div className="w-[25%]">
                <h2>カード検索</h2>

                <form onSubmit={handleSearch}>
                    <div>
                        <label>カード名</label>
                        <input
                            type="text"
                            value={cardKeyword}
                            onChange={(event) => setCardKeyword(event.target.value)}
                            placeholder="カード名を検索"
                        />
                    </div>

                    <button type="submit">検索</button>

                    <button type="button" onClick={handleReset}>リセット</button>
                </form>
            </div>
        </div>
    );
};
