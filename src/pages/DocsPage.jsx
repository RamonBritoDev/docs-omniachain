import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGemoji from 'remark-gemoji';
import 'highlight.js/styles/atom-one-dark.css';

// Import our parsed JSON docs index
import docsData from '../assets/docsData.json';
import { translations } from '../lib/i18n';

export default function DocsPage() {
    const { section, page } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // Figure out active language and correct path key
    const currentLangMatch = location.pathname.match(/^\/(en|es|ru|zh)(\/|$)/);
    const currentLang = currentLangMatch ? currentLangMatch[1] : 'pt';

    // Build the relative path lookup key for our docsData
    let pageKey = 'introduction'; // fallback
    if (section && page) {
        pageKey = `${section}/${page}`;
    } else if (section) {
        pageKey = section;
    } else if (page) {
        pageKey = page;
    }

    // Special translation mapping for index
    if (pageKey === 'docs' || pageKey === 'index') pageKey = 'introduction';

    // Special translation mapping for index
    if (pageKey === 'docs' || pageKey === 'index') pageKey = 'introduction';

    const t = translations[currentLang]?.layout || translations['pt'].layout;
    const sidebarT = translations[currentLang]?.sidebar || translations['pt'].sidebar;

    const flatNav = [
        { text: sidebarT.introduction, path: 'index' },
        { text: sidebarT.installation, path: 'getting-started/installation' },
        { text: sidebarT.first_agent, path: 'getting-started/first-agent' },
        { text: sidebarT.configuration, path: 'getting-started/configuration' },
        { text: sidebarT.overview, path: 'agents/overview' },
        { text: sidebarT.react_agent, path: 'agents/react' },
        { text: sidebarT.planner_agent, path: 'agents/planner' },
        { text: sidebarT.multimodal_agent, path: 'agents/multimodal' },
        { text: sidebarT.artist_agent, path: 'agents/artist' },
        { text: sidebarT.voice_agent, path: 'agents/voice' },
        { text: sidebarT.supervisor_agent, path: 'agents/supervisor' },
        { text: sidebarT.overview, path: 'media/overview' },
        { text: sidebarT.image_gen, path: 'media/image-gen' },
        { text: sidebarT.stt, path: 'media/stt' },
        { text: sidebarT.tts, path: 'media/tts' },
        { text: sidebarT.overview, path: 'mcp/overview' },
        { text: sidebarT.mcp_client, path: 'mcp/client' },
        { text: sidebarT.mcp_server, path: 'mcp/server' },
    ];

    const searchPath = (pageKey === 'introduction') ? 'index' : pageKey;
    const currentIndex = flatNav.findIndex(item => item.path === searchPath);

    const prevPage = currentIndex > 0 ? flatNav[currentIndex - 1] : null;
    const nextPage = currentIndex !== -1 && currentIndex < flatNav.length - 1 ? flatNav[currentIndex + 1] : null;

    // Fetch data and configure fallback
    let docPage = docsData[currentLang]?.[pageKey];
    let isFallback = false;

    if (!docPage) {
        // Fallback to English, then Portuguese if English missing
        docPage = docsData['en']?.[pageKey] || docsData['pt']?.[pageKey];
        if (docPage) isFallback = true;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pageKey, currentLang]);

    if (!docPage) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.not_found}</h1>
                <p className="text-gray-500 dark:text-gray-400">The document at `{pageKey}` for this language does not exist.</p>
                <button onClick={() => navigate('/')} className="mt-8 bg-brand-500 text-white px-6 py-2 rounded-full font-medium">{t.return_home}</button>
            </div>
        );
    }

    // To extract just the content without the H1 title (since we might want to render it separately or let markdown handle it)
    // We'll just let ReactMarkdown handle the H1 title from the file so it looks authentic

    // Helper to resolve relative markdown links correctly into React Router paths
    const resolveInternalLink = (href) => {
        if (!href || href.startsWith('http') || href.startsWith('#')) return href;

        let cleanHref = href.replace(/\.md(#.*)?$/, '$1'); // Strip .md extension

        if (cleanHref.startsWith('/')) {
            return `/${currentLang}/docs${cleanHref}`;
        }

        let baseParts = pageKey.split('/');
        baseParts.pop(); // Remove current file

        let relParts = cleanHref.split('/');
        for (const part of relParts) {
            if (part === '.') continue;
            if (part === '..') baseParts.pop();
            else baseParts.push(part);
        }

        const finalPath = baseParts.join('/');
        if (!finalPath) return `/${currentLang}/docs`;
        return `/${currentLang}/docs/${finalPath}`;
    };

    return (
        <div className="flex flex-col">
            <div className="w-full">
                {/* Breadcrumbs */}
                <div className="mb-8 flex items-center space-x-1 text-sm text-gray-500">
                    <span className="hover:text-gray-900 dark:hover:text-gray-300">Docs</span>
                    <span>/</span>
                    {section && (
                        <>
                            <span className="capitalize hover:text-gray-900 dark:hover:text-gray-300 cursor-default">{section.replace('-', ' ')}</span>
                            <span>/</span>
                        </>
                    )}
                    <span className="text-brand-500 dark:text-gray-300 capitalize cursor-default">{pageKey.split('/').pop().replace('-', ' ')}</span>
                </div>

                {isFallback && (
                    <div className="mb-6 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm">
                        {t.missing_translation}
                    </div>
                )}

                {/* Content Rendered dynamically from Markdown */}
                {/* We use Tailwind Typography prose classes designed to auto-style markdown gracefully */}
                {/* Important: prose-pre and highlight.js take care of the beautiful code blocks */}
                <div className="prose prose-slate dark:prose-invert prose-brand max-w-none 
            prose-headings:font-semibold prose-h1:text-4xl prose-h1:font-extrabold prose-h1:mb-8
            prose-a:text-brand-500 hover:prose-a:text-brand-600 dark:hover:prose-a:text-brand-400
            prose-pre:bg-[#1e1e24] prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-border-dark prose-pre:p-4 prose-pre:rounded-xl">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkGemoji]}
                        rehypePlugins={[rehypeRaw, rehypeHighlight]}
                        components={{
                            a: ({ node, href, children, ...props }) => {
                                if (href && !href.startsWith('http') && !href.startsWith('#')) {
                                    const resolvedPath = resolveInternalLink(href);
                                    return <Link to={resolvedPath} {...props}>{children}</Link>;
                                }
                                return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
                            }
                        }}
                    >
                        {docPage.content}
                    </ReactMarkdown>
                </div>

                {/* Pagination */}
                <div className="flex flex-row items-center justify-between mt-16 pt-6 border-t border-gray-200 dark:border-border-dark">
                    {prevPage ? (
                        <Link
                            to={`/${currentLang}/docs${prevPage.path === 'index' ? '' : '/' + prevPage.path}`}
                            className="inline-flex flex-col items-start justify-center transition-colors text-gray-500 hover:text-brand-500 dark:hover:text-brand-400 group"
                        >
                            <span className="text-sm font-medium flex items-center mb-1 group-hover:underline"><ArrowLeft className="mr-2 h-4 w-4" /> {t.prev}</span>
                            <span className="text-base font-semibold text-gray-900 dark:text-gray-100">{prevPage.text}</span>
                        </Link>
                    ) : (
                        <div></div>
                    )}
                    {nextPage ? (
                        <Link
                            to={`/${currentLang}/docs${nextPage.path === 'index' ? '' : '/' + nextPage.path}`}
                            className="inline-flex flex-col items-end justify-center transition-colors text-gray-500 hover:text-brand-500 dark:hover:text-brand-400 group"
                        >
                            <span className="text-sm font-medium flex items-center mb-1 group-hover:underline">{t.next} <ArrowRight className="ml-2 h-4 w-4" /></span>
                            <span className="text-base font-semibold text-gray-900 dark:text-gray-100">{nextPage.text}</span>
                        </Link>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
}
