import { createBrowserRouter } from "react-router";
import { CardListPage } from "./pages/CardListPage";
import { CardDetailPage } from "./pages/CardDetailPage";
import { DeckEditPage } from "./pages/DeckEditPage";
import { DeckListPage } from "./pages/DeckListPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <CardListPage />,
    },
    {
        path: '/cards',
        element: <CardListPage />,
    },
    {
        path: '/cards/:id',
        element: <CardDetailPage />
    },
    {
        path: '/decks',
        element: <DeckListPage />
    },
    {
        path: '/decks/new',
        element: <DeckEditPage />
    },
    {
        path: '/decks/:id/edit',
        element: <DeckEditPage />
    }
]);
