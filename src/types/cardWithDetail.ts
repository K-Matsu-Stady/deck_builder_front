import type { Card } from "./card"
import type { CardDetail } from "./cardDetail"

export type CardWithDetail = Card & {
    card_detail: CardDetail;
};
