import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Terminal, Cpu, MessageSquare, Image as ImageIcon, Zap, ShieldCheck, Github } from 'lucide-react';
import Navbar from '../components/Navbar';
import { translations } from '../lib/i18n';
import { motion } from 'framer-motion';

export default function LandingPage() {
    const location = useLocation();
    const currentLangMatch = location.pathname.match(/^\/(en|es|ru|zh)(\/|$)/);
    const currentLang = currentLangMatch ? currentLangMatch[1] : 'pt';
    const prefix = currentLang === 'pt' ? '/docs' : `/${currentLang}/docs`;
    const t = translations[currentLang]?.landing || translations['pt'].landing;
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark text-gray-900 dark:text-white selection:bg-brand-500/30">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-24 pb-32 sm:pt-32 sm:pb-40 lg:pb-48">
                    {/* Animated Background Gradients */}
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 flex w-full justify-center opacity-60 mix-blend-screen h-full">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.4, 0.7, 0.4],
                                    x: [0, 80, 0],
                                    y: [0, 40, 0]
                                }}
                                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-[20rem] h-[40rem] w-[40rem] rounded-full bg-brand-500/30 blur-3xl"
                            ></motion.div>
                            <motion.div
                                animate={{
                                    scale: [1, 1.4, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                    x: [0, -100, 0],
                                    y: [0, -60, 0]
                                }}
                                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-[10rem] right-[10rem] h-[35rem] w-[35rem] rounded-full bg-purple-500/30 blur-3xl"
                            ></motion.div>
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.2, 0.5, 0.2],
                                    x: [0, 60, 0],
                                    y: [0, -80, 0]
                                }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-[25rem] left-[5rem] h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/20 blur-3xl"
                            ></motion.div>
                        </div>
                    </div>

                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mb-8 flex justify-center"
                        >
                            <span className="inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-300 backdrop-blur-sm">
                                <span className="flex h-2 w-2 rounded-full bg-brand-400 mr-2 animate-pulse"></span>
                                {t.badge}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, type: 'spring', bounce: 0.3 }}
                            className="mx-auto max-w-4xl font-display text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-7xl"
                        >
                            {t.title1} <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-400 to-pink-400">
                                {t.title2}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-gray-600 dark:text-gray-400 sm:text-xl"
                        >
                            {t.subtitle}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-10 flex justify-center gap-4 sm:flex-row flex-col"
                        >
                            <Link
                                to={prefix}
                                className="group inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-400 hover:shadow-brand-500/20 hover:-translate-y-0.5 transition-all duration-200"
                            >
                                {t.cta_docs}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <a
                                href="https://github.com/RamonBritoDev/omniachain"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-surface-dark px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-gray-100 dark:hover:bg-border-dark transition-all duration-200 hover:-translate-y-0.5"
                            >
                                <Terminal className="mr-2 h-4 w-4 text-gray-400" />
                                pip install omniachain
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* Features Preview Section */}
                <section className="py-20 relative bg-gray-50/50 dark:bg-surface-dark/30 border-t border-gray-200 dark:border-border-dark">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{t.feat_title}</h2>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">{t.feat_sub}</p>
                        </div>

                        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 pt-6 lg:grid-cols-3">
                            {[
                                { title: t.f1_t, description: t.f1_d, icon: <Zap className="h-6 w-6 text-yellow-400" /> },
                                { title: t.f2_t, description: t.f2_d, icon: <ShieldCheck className="h-6 w-6 text-green-400" /> },
                                { title: t.f3_t, description: t.f3_d, icon: <MessageSquare className="h-6 w-6 text-brand-300" /> },
                                { title: t.f4_t, description: t.f4_d, icon: <Cpu className="h-6 w-6 text-brand-400" /> },
                                { title: t.f5_t, description: t.f5_d, icon: <ImageIcon className="h-6 w-6 text-pink-400" /> },
                                { title: t.f6_t, description: t.f6_d, icon: <Terminal className="h-6 w-6 text-gray-400" /> },
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark p-8 shadow-sm transition-all hover:border-brand-500/50 hover:shadow-brand-500/10 group"
                                >
                                    <div className="absolute right-0 top-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-brand-500/5 blur-2xl group-hover:bg-brand-500/10 transition-all"></div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-border-dark">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                                    </div>
                                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-background-dark py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <p className="text-sm text-gray-500">{t.footer}</p>
                    <div className="flex gap-4">
                        <a href="https://github.com/RamonBritoDev/omniachain" className="text-gray-500 hover:text-white transition-colors">
                            <Github className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
