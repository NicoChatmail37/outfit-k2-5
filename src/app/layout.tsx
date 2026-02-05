import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Comment s'habiller ?",
    description: 'Recommandations vestimentaires basées sur la météo',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body>{children}</body>
        </html>
    );
}
