import { Link } from "react-router";
import type { Card } from "../types/card"

type CardImageProps = {
    card: Card;
};

export const CardImage = ({
    card,
}: CardImageProps) => {
    return (
        <Link to={`/cards/${card.id}`}>
            <img src="./images/default_card.png" alt="" className="w-50 object-cover" />
        </Link>
    )
};
