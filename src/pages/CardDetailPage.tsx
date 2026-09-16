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
        <div>
            <h1>カード詳細</h1>

            <div>
                <p>{card?.card_detail.name}</p>
                <img src="./images/default_card.png" alt="" className="w-50 object-cover" />
            </div>

            <div>
                <div>
                    <label>特徴</label>
                    <p>
                        {card?.card_detail.traits.map((trait) => (
                            <span>{trait.name}</span>
                        ))}
                    </p>
                </div>

                <div>
                    <label>色</label>
                    <p>{card?.card_detail.color}</p>
                </div>
            </div>

            <Link to="/cards">
                一覧へ戻る
            </Link>
        </div>
    );
};
