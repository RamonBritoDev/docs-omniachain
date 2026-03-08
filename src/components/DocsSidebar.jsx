import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Zap, Bot, BookOpen, Layers, Shield, Image, Mic } from 'lucide-react';
import { translations } from '../lib/i18n';

export default function DocsSidebar({ onLinkClick }) {
    const location = useLocation();
    const currentLangMatch = location.pathname.match(/^\/(en|es|ru|zh)(\/|$)/);
    const currentLang = currentLangMatch ? currentLangMatch[1] : 'pt';
    const prefix = currentLang === 'pt' ? '/docs' : `/${currentLang}/docs`;
    const t = translations[currentLang]?.sidebar || translations['pt'].sidebar;

    const navGroups = [
        {
            title: t.getting_started,
            icon: <Zap className="h-4 w-4 mr-2" />,
            items: [
                { text: t.introduction, path: 'index' },
                { text: t.installation, path: 'getting-started/installation' },
                { text: t.first_agent, path: 'getting-started/first-agent' },
                { text: t.configuration, path: 'getting-started/configuration' },
            ]
        },
        {
            title: t.agents,
            icon: <Bot className="h-4 w-4 mr-2" />,
            items: [
                { text: t.overview, path: 'agents/overview' },
                { text: t.react_agent, path: 'agents/react' },
                { text: t.planner_agent, path: 'agents/planner' },
                { text: t.multimodal_agent, path: 'agents/multimodal' },
                { text: t.artist_agent, path: 'agents/artist' },
                { text: t.voice_agent, path: 'agents/voice' },
                { text: t.supervisor_agent, path: 'agents/supervisor' },
            ]
        },
        {
            title: t.media,
            icon: <Image className="h-4 w-4 mr-2" />,
            items: [
                { text: t.overview, path: 'media/overview' },
                { text: t.image_gen, path: 'media/image-gen' },
                { text: t.stt, path: 'media/stt' },
                { text: t.tts, path: 'media/tts' },
            ]
        },
        {
            title: t.mcp,
            icon: <Layers className="h-4 w-4 mr-2" />,
            items: [
                { text: t.overview, path: 'mcp/overview' },
                { text: t.mcp_client, path: 'mcp/client' },
                { text: t.mcp_server, path: 'mcp/server' },
            ]
        }
    ];

    return (
        <div className="w-full">
            {navGroups.map((group, index) => (
                <div key={index} className="pb-8">
                    <h4 className="mb-2 w-full rounded-md px-2 py-1 text-sm font-semibold flex items-center text-gray-900 dark:text-white">
                        {group.icon}
                        {group.title}
                    </h4>
                    <div className="grid grid-flow-row auto-rows-max text-sm">
                        {group.items.map((item, i) => {
                            const fullPath = item.path === 'index' ? prefix : `${prefix}/${item.path}`;
                            // For active checking, we consider /docs and /docs/index as equivalent
                            const isActiveLocal = location.pathname === fullPath ||
                                (item.path === 'index' && (location.pathname === prefix || location.pathname === `${prefix}/`));

                            return (
                                <NavLink
                                    key={i}
                                    to={fullPath}
                                    onClick={onLinkClick}
                                    className={`group flex w-full items-center rounded-md border border-transparent px-2 py-2 mb-1 hover:underline text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ${isActiveLocal ? 'bg-gray-100 dark:bg-surface-dark font-medium text-brand-500 dark:!text-brand-400 !no-underline' : ''
                                        }`}
                                >
                                    {item.text}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
