import { Link } from "react-router";
import type { Card } from "../types/card"
import { useState } from "react";

type CardImageProps = {
    card: Card;
};

export const CardImage = ({
    card,
}: CardImageProps) => {
    const [imgSrc, setImgSrc] = useState(`/images/${card.image_path}`);

    return (
        <Link to={`/cards/${card.id}`}>
            <img
                src={imgSrc}
                alt=""
                onError={() => {
                    setImgSrc('/images/default_card.png');
                }}
                className="w-50 object-cover p-1"
            />
        </Link>
    )
};
