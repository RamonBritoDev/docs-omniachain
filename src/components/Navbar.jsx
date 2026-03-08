import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Github, Search as SearchIcon, Menu, Moon, Sun, Globe } from 'lucide-react';
import SearchModal from './SearchModal';
import { translations } from '../lib/i18n';

const LANGUAGES = [
    { code: 'pt', label: 'Português' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'ru', label: 'Русский' },
    { code: 'zh', label: '中文' },
];

export default function Navbar({ onMenuClick }) {
    const [isDark, setIsDark] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Detect current language from URL
    const currentLangMatch = location.pathname.match(/^\/(en|es|ru|zh)(\/|$)/);
    const currentLang = currentLangMatch ? currentLangMatch[1] : 'pt';

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        } else {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }

        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    const handleLanguageChange = (e) => {
        const targetLang = e.target.value;
        if (targetLang === currentLang) return;

        // Replace the language prefix in the URL
        let newPath = location.pathname;
        if (currentLang !== 'pt') {
            newPath = newPath.replace(new RegExp(`^/${currentLang}`), '');
        }

        if (targetLang !== 'pt') {
            newPath = `/${targetLang}${newPath === '/' ? '' : newPath}`;
        }

        // Ensure we don't end up with empty paths
        if (newPath === '') newPath = '/';

        navigate(newPath);
    };

    const t = translations[currentLang]?.nav || translations['pt'].nav;

    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b border-border-dark bg-white/80 dark:bg-background-dark/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-background-dark/60">
                <div className="container mx-auto flex h-16 items-center border-b border-gray-200 dark:border-border-dark px-4 md:px-8">

                    {/* Mobile Menu Button */}
                    {onMenuClick && (
                        <button
                            className="mr-2 px-0 text-base md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            onClick={onMenuClick}
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle Menu</span>
                        </button>
                    )}

                    <div className="mr-8 hidden md:flex">
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">Omnia<span className="text-brand-500 dark:text-brand-400">Chain</span></span>
                        </Link>
                        <nav className="flex items-center space-x-6 text-sm font-medium ml-6">
                            <Link to="/docs" className="transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                {t.documentation}
                            </Link>
                            <a href="https://github.com/RamonBritoDev/omniachain" className="transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" target="_blank" rel="noreferrer">
                                GitHub
                            </a>
                        </nav>
                    </div>

                    {/* Mobile Logo */}
                    <div className="flex md:hidden flex-1 justify-center mr-6">
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">Omnia<span className="text-brand-500 dark:text-brand-400">Chain</span></span>
                        </Link>
                    </div>

                    <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
                        <div className="w-full flex-1 md:w-auto md:flex-none">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 border border-gray-200 dark:border-border-dark bg-gray-100 dark:bg-surface-dark/50 hover:bg-gray-200 dark:hover:bg-surface-dark text-gray-500 dark:text-gray-400 px-4 py-2 relative h-9 w-full justify-start rounded-[0.5rem] text-sm font-normal shadow-sm sm:pr-12 md:w-40 lg:w-64"
                            >
                                <SearchIcon className="mr-2 h-4 w-4" />
                                <span className="hidden lg:inline-flex">{t.search_doc}</span>
                                <span className="inline-flex lg:hidden">{t.search}</span>
                                <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                                    <span className="text-xs">⌘</span>K
                                </kbd>
                            </button>
                        </div>

                        <nav className="flex items-center gap-3">
                            {/* Language Selector */}
                            <div className="relative flex items-center">
                                <Globe className="h-4 w-4 absolute left-2 text-gray-500" />
                                <select
                                    value={currentLang}
                                    onChange={handleLanguageChange}
                                    className="pl-8 pr-2 py-1 text-sm bg-transparent border-none text-gray-600 dark:text-gray-300 focus:ring-0 cursor-pointer appearance-none font-medium hover:text-gray-900 dark:hover:text-white"
                                >
                                    {LANGUAGES.map(lang => (
                                        <option key={lang.code} value={lang.code} className="bg-white dark:bg-surface-dark text-gray-900 dark:text-white">
                                            {lang.code.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <a href="https://github.com/RamonBritoDev/omniachain" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </a>

                            <button onClick={toggleTheme} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ml-2">
                                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                <span className="sr-only">Toggle theme</span>
                            </button>
                        </nav>
                    </div>
                </div>
            </header>
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} currentLang={currentLang} />
        </>
    );
}
