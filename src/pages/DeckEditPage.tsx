import { useEffect, useState } from "react";
import type { CardWithDetail } from "../types/cardWithDetail";
import { PageHeader } from "../components/PageHeader";

type CardWithDetailsResponse = {
    cards: CardWithDetail[];
    status: boolean;
};

type DeckCard = {
    card: CardWithDetail;
    count: number;
}

export const DeckEditPage = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [cards, setCards] = useState<CardWithDetail[]>([]);
    const [deckCards, setDeckCards] = useState<DeckCard[]>([]);
    const [deckName, setDeckName] = useState('');

    const fetchCards = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cards/withDetails`);

            if (!response.ok) {
                throw new Error(`カードの取得に失敗しました: ${response.status}`);
            }

            const data: CardWithDetailsResponse = await response.json();

            setCards(data.cards);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const handleAddCard = (card: CardWithDetail) => {
        const existingCard = deckCards.find(
            (deckCard) => deckCard.card.id === card.id
        );

        if (existingCard) {
            setDeckCards((currentDeckCards) =>
                currentDeckCards.map((deckCard) => {
                    if (existingCard.card.id !== deckCard.card.id) {
                        return deckCard;
                    }

                    return {
                        ...deckCard,
                        count: deckCard.count + 1,
                    };
                }),
            );
        } else {
            setDeckCards((prev) => [...prev, { card: card, count: 1 }]);
        }
    };

    const handleDeleteCard = (targetDeckCard: DeckCard) => {
        if (targetDeckCard.count === 1) {
            setDeckCards((currentDeckCards) =>
                currentDeckCards.filter((deckCard) => deckCard.card.id !== targetDeckCard.card.id)
            );
        } else {
            setDeckCards((currentDeckCards) =>
                currentDeckCards.map((deckCard) => {
                    if (targetDeckCard.card.id !== deckCard.card.id) {
                        return deckCard;
                    }

                    return {
                        ...deckCard,
                        count: deckCard.count - 1,
                    };
                }),
            );
        }
    };

    const handleSubmit = async () => {
        if (deckName === '') {
            alert('デッキ名が入力されていません');
            return;
        }

        if (deckCards.reduce((a, b) => a + b.count, 0) === 0) {
            alert('カードが登録されていません');
            return;
        }

        try {
            const requestBody = {
                name: deckName,
                deckCards: deckCards,
            };

            console.log(requestBody);

            const response = await fetch(`${API_BASE_URL}/api/decks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`デッキの登録に失敗しました: ${response.status}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full h-full">
            <PageHeader title="デッキ編集" />

            <div className="h-[95%] flex">
                <div className="w-[70%] h-full overflow-y-auto flex flex-wrap gap-2.5">
                    {cards.map((card) => (
                        <button
                            key={card.id}
                            type="button"
                            onClick={() => handleAddCard(card)}
                        >
                            <img
                                src={`/ images / ${card.image_path}`}
                                alt={card.card_detail.name}
                                onError={(e) => {
                                    e.currentTarget.src = '/images/default_card.png';
                                }}
                                className="w-50 object-cover"
                            />
                        </button>
                    ))}
                </div>

                <div className="w-[30%] flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between">
                            <div className="flex gap-2.5">
                                <h2>メイン</h2>
                                <p>{deckCards.reduce((a, b) => a + b.count, 0)} / 50</p>
                            </div>

                            <input
                                type="text"
                                value={deckName}
                                onChange={(e) => {
                                    setDeckName(e.target.value);
                                }}
                                placeholder="デッキ名を入力"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                            {deckCards.map((deckCard) => (
                                <div key={deckCard.card.id}>
                                    <img
                                        src={`/ images / ${deckCard.card.image_path}`}
                                        alt={deckCard.card.card_detail.name}
                                        onError={(e) => {
                                            e.currentTarget.src = '/images/default_card.png';
                                        }}
                                        className="w-24 object-cover"
                                    />
                                    <div className="flex justify-center gap-2.5">
                                        <button
                                            type="button"
                                            onClick={() => handleAddCard(deckCard.card)}
                                        >+</button>
                                        <p>×{deckCard.count}</p>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteCard(deckCard)}
                                        >-</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="button" onClick={handleSubmit}>登録する</button>
                </div>
            </div>
        </div>
    );
};
