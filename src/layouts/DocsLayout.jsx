import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DocsSidebar from '../components/DocsSidebar';
import { translations } from '../lib/i18n';

export default function DocsLayout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const currentLangMatch = location.pathname.match(/^\/(en|es|ru|zh)(\/|$)/);
    const currentLang = currentLangMatch ? currentLangMatch[1] : 'pt';
    const t = translations[currentLang]?.layout || translations['pt'].layout;

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark text-gray-900 dark:text-gray-100">
            <Navbar onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />

            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 mx-auto px-4 md:px-8">

                {/* Sidebar */}
                <aside className={`fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto border-r border-gray-200 dark:border-border-dark py-6 pr-6`}>
                    <DocsSidebar />
                </aside>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 top-16 z-40 bg-gray-900/80 dark:bg-background-dark/80 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)}>
                        <div className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white dark:bg-surface-dark border-r border-gray-200 dark:border-border-dark shadow-xl overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
                            <DocsSidebar onLinkClick={() => setMobileMenuOpen(false)} />
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px] w-full min-w-0">
                    <div className="mx-auto w-full min-w-0">
                        <Outlet />
                    </div>

                    {/* Table of Contents (Right Sidebar) */}
                    <div className="hidden text-sm xl:block">
                        <div className="sticky top-16 -mt-10 pt-4">
                            <div className="no-scrollbar h-full overflow-auto pb-10 pt-6">
                                <div className="space-y-2 border-l border-gray-200 dark:border-border-dark pl-4 text-gray-500 dark:text-gray-400">
                                    <p className="font-medium text-gray-900 dark:text-white mb-4">{t.on_this_page}</p>
                                    <ul className="m-0 list-none space-y-3 font-medium">
                                        <li><a href="#overview" className="hover:text-gray-900 dark:hover:text-white transition-colors">{translations[currentLang]?.sidebar?.overview || translations['pt'].sidebar.overview}</a></li>
                                        <li><a href="#installation" className="hover:text-gray-900 dark:hover:text-white transition-colors">{translations[currentLang]?.sidebar?.installation || translations['pt'].sidebar.installation}</a></li>
                                        <li><a href="#quickstart" className="hover:text-gray-900 dark:hover:text-white transition-colors">{t.quickstart}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
