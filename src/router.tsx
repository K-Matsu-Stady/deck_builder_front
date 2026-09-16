import { createBrowserRouter } from "react-router";
import { CardListPage } from "./pages/CardListPage";
import { CardDetailPage } from "./pages/CardDetailPage";

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
]);
