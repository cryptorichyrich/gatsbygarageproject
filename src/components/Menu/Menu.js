    import { graphql, useStaticQuery, Link } from 'gatsby'
    import { StaticImage } from 'gatsby-plugin-image';
    import React, { useState } from 'react';

    export const Menu = () => {
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

        const data = useStaticQuery(graphql`
            query MainMenuQuery {
            wp {
                acfOptionsMainMenu {
                mainMenu {
                    callToActionButton {
                    destination {
                        ... on WpPage {
                        uri
                        }
                    }
                    label
                    }
                    menu {
                    root {
                        destination {
                        ... on WpPage {
                            uri
                        }
                        }
                        label
                    }
                    subMenuItem {
                        label
                        destination {
                        ... on WpPage {
                            uri
                        }
                        }
                    }
                    }
                }
                }
            }
            }   
        `);

        const menus = data?.wp?.acfOptionsMainMenu?.mainMenu?.menu || [];
        const ctas = data?.wp?.acfOptionsMainMenu?.mainMenu?.callToActionButton || [];

        return (
            <nav className="bg-gradient-to-tr from-british-racing-green to-emerald-900 text-white sticky top-0 z-50 justify-between">
                {/* Desktop and Mobile Header */}
                <div className="flex justify-between items-center px-4 md:h-16">
                    {/* Logo */}
                    <Link to="/">
                        <StaticImage
                            src="../../../static/icon.png"
                            alt="logo"
                            layout="fixed"
                            height={30}
                            className='py-2'
                        />
                    </Link>

                    {/* Hamburger Menu Button (Mobile) */}
                    <button
                        className="text-white md:hidden focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-4 h-full items-center font-bold">
                        {(menus || []).map((menu, index) => (
                            <div key={index} className="relative group h-full">
                                {/* Main Menu Item */}
                                <Link
                                    key={index}
                                    className="text-white flex font-bold h-full no-underline items-center px-4 py-2 hover:bg-emerald-800"
                                    to={menu.root.destination.uri}
                                >
                                    {menu.root.label}
                                </Link>

                                {/* Submenu Items */}
                                {menu.subMenuItem && menu.subMenuItem.length > 0 && (
                                    <div className="hidden block font-bold group-hover:block bg-emerald-800 absolute top-full right-0 shadow-md">
                                        {menu.subMenuItem.map((subMenuItem, subIndex) => (
                                            <Link
                                                key={subIndex}
                                                className="block whitespace-nowrap text-white px-4 py-2 no-underline hover:bg-emerald-700 "
                                                to={subMenuItem.destination.uri}
                                            >
                                                {subMenuItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {(ctas || []).map((ctaItem, index) => (
                            <Link
                                key={index}
                                className="text-black bg-yellow-500 hover:bg-yellow-400 transition-colors px-4 py-2 rounded no-underline font-bold uppercase"
                                to={ctaItem.destination.uri}
                            >
                                {ctaItem.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-emerald-800 text-white">
                        {(menus || []).map((menu, index) => (
                            <div key={index} className="relative group h-full font-bold">
                                {/* Main Menu Item */}
                                <Link
                                    key={index}
                                    className="block text-white px-4 py-2 hover:bg-emerald-700 no-underline"
                                    to={menu.root.destination.uri}
                                >
                                    {menu.root.label}
                                </Link>

                                {/* Submenu Items */}
                                {menu.subMenuItem && menu.subMenuItem.length > 0 && (
                                    <div className="pl-4">
                                        {menu.subMenuItem.map((subMenuItem, subIndex) => (
                                            <Link
                                                key={subIndex}
                                                className="h-full block text-white px-4 py-2 hover:bg-emerald-600 no-underline hover:h-full"
                                                to={subMenuItem.destination.uri}
                                            >
                                                {subMenuItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {(ctas || []).map((ctaItem, index) => (
                            <Link
                                key={index}
                                className="block text-black bg-yellow-500 hover:bg-yellow-400 transition-colors px-4 py-2 rounded no-underline font-bold uppercase"
                                to={ctaItem.destination.uri}
                            >
                                {ctaItem.label}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        );
    };
