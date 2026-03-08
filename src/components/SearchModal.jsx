import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, Command } from 'lucide-react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import docsData from '../assets/docsData.json';

// Flatten the JSON structure for searching
// We will search across all languages, but prioritize the current one if possible
// For simplicity, we create a flat array mapping: [{ lang, path, title, snippet }]
let searchIndex = [];
for (const lang in docsData) {
    for (const path in docsData[lang]) {
        const doc = docsData[lang][path];
        // Create a plain text snippet from Markdown by removing basic markdown tags
        const cleanContent = doc.content.replace(/[#*_~`>\[\]]/g, '').slice(0, 300);
        searchIndex.push({
            lang,
            path,
            title: doc.title,
            content: cleanContent,
        });
    }
}

const fuse = new Fuse(searchIndex, {
    keys: ['title', 'content'],
    threshold: 0.3,
    includeMatches: true
});

export default function SearchModal({ isOpen, onClose, currentLang }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);

            const handleKeyDown = (e) => {
                if (e.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, onClose]);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }
        const searchResults = fuse.search(query);
        // Sort so current language results appear first
        const sorted = searchResults.sort((a, b) => {
            if (a.item.lang === currentLang && b.item.lang !== currentLang) return -1;
            if (a.item.lang !== currentLang && b.item.lang === currentLang) return 1;
            return 0;
        });
        setResults(sorted.slice(0, 8)); // Top 8 results
    }, [query, currentLang]);

    const handleResultClick = (lang, path) => {
        // Navigate to localized route
        const basePath = lang === 'pt' ? '' : `/${lang}`;
        navigate(`${basePath}/docs/${path}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-background-dark/80 backdrop-blur-sm" onClick={onClose}>
            <div
                className="relative w-full max-w-2xl transform divide-y divide-border-dark overflow-hidden rounded-xl bg-surface-dark shadow-2xl ring-1 ring-border-dark transition-all mx-4"
                onClick={e => e.stopPropagation()}
            >
                <div className="relative flex items-center px-4">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        className="h-14 w-full border-0 bg-transparent pl-4 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-lg"
                        placeholder="Search documentation..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="absolute right-4 rounded-md p-1 hover:bg-border-dark text-gray-400 hover:text-white" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {results.length > 0 && (
                    <ul className="max-h-96 overflow-y-auto p-2">
                        {results.map((res, i) => (
                            <li
                                key={i}
                                className="group flex cursor-pointer select-none flex-col rounded-lg px-4 py-3 hover:bg-brand-500/10 hover:text-brand-400 text-gray-300"
                                onClick={() => handleResultClick(res.item.lang, res.item.path)}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-white group-hover:text-brand-400">{res.item.title}</span>
                                    <span className="text-xs font-mono uppercase text-gray-500 border border-border-dark px-1.5 py-0.5 rounded">{res.item.lang}</span>
                                </div>
                                <span className="mt-1 text-sm text-gray-500 truncate">{res.item.content}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {query !== '' && results.length === 0 && (
                    <div className="px-6 py-14 text-center text-sm sm:px-14">
                        <Command className="mx-auto h-6 w-6 text-gray-500" />
                        <p className="mt-4 font-semibold text-white">No results found</p>
                        <p className="mt-2 text-gray-400">We couldn't find anything with that term. Please try again.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
