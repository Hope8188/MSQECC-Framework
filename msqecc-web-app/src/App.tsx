import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Theory } from './pages/Theory';
import { Reproducibility, Verification, Lab } from './pages/Stubs';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "theory",
                element: <Theory />,
            },
            {
                path: "reproducibility",
                element: <Reproducibility />,
            },
            {
                path: "verification",
                element: <Verification />,
            },
            {
                path: "lab",
                element: <Lab />,
            }
        ]
    }
]);

export default function App() {
    return <RouterProvider router={router} />;
}
