import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './i18n';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Unable to find the React root element.');
}

createRoot(rootElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
