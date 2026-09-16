import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { CardWithDetail } from "../types/cardWithDetail";

type CardResponse = {
    card: CardWithDetail;
    status: boolean;
};

export const CardDetailPage = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const { id } = useParams();

    const [card, setCard] = useState<CardWithDetail>();

    const fetchCardDetail = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cards/${id}`);

            if (!response.ok) {
                throw new Error(`カードの取得に失敗しました: ${response.status}`);
            }

            const data: CardResponse = await response.json();

            setCard(data.card);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCardDetail();
    }, []);

    return (
        <div className="w-full h-full flex flex-col justify-between px-5">
            <h1 className="text-2xl font-bold py-5">カード詳細</h1>

            <div className="flex h-[80%]">
                <div className="w-[30%]">
                    <p>{card?.card_detail.name}</p>
                    <div className="flex justify-center items-center">
                        <img
                            src={`/images/${card?.image_path}`}
                            alt={card?.card_detail.name}
                            onError={(e) => {
                                e.currentTarget.src = '/images/default_card.png';
                            }}
                            className="w-50 object-cover"
                        />
                    </div>
                </div>

                <div className="w-[70%]">
                    <div>
                        <label>特徴</label>
                        <p>
                            {card?.card_detail.traits.map((trait) => (
                                <span key={trait.id}>{trait.name}</span>
                            ))}
                        </p>
                    </div>

                    <div>
                        <label>色</label>
                        <p>{card?.card_detail.color}</p>
                    </div>
                </div>
            </div>

            <Link to="/cards">
                一覧へ戻る
            </Link>
        </div>
    );
};
