"use client";
import {useEffect, useState} from "react";

import Image from "next/image";
import {MdMenu} from "react-icons/md";
import {SiComicfury} from "react-icons/si";
import ThemeToggle from "./themeToggle";
import LangSwitch from "./langSwitch";
import User from "@/components/common/user"

import {usePathname} from "next/navigation";
import {useLocale} from "@/hooks/useI18n"

import {defaultLocale} from "@/lib/i18n";
import {NavLinksList} from "@/lib/navLinksList";

const MobileMenu = ({ linkList, lang }) => {
    return (
        <details className="flex md:hidden dropdown dropdown-end">
            <summary className="btn btn-ghost p-0">
                <MdMenu size={18}/>
            </summary>
            <ul className="menu dropdown-content z-[100] p-2 shadow bg-base-100 opacity-100 rounded-box w-52">
                <>
                    <li key={"clerk-user"}>
                        <User />
                    </li>

                    {linkList.map((link, index) => {
                        return (
                            <li key={index}>
                                <a
                                    aria-label={link.name}
                                    title={link.name}
                                    href={`/${lang}${link.url}`}
                                >
                                    {link.name}
                                </a>
                            </li>
                        );
                    })}
                </>
            </ul>
        </details>
    )
}

export default function Navbar() {
    const pathname = usePathname();
    const lang = useLocale()
    const [linkList, setLinkList] = useState([]);

    useEffect(() => {
        setLinkList(NavLinksList[`LINK_${lang.toUpperCase()}`] || []);
    }, [pathname, lang]);

    return (
        <header
            className="w-full z-50 bg-base-100 p-5 pb-0 max-w-[1280px] mx-auto md:mb-5 flex justify-between items-center">
            <a
                aria-label="AI Comic Workshop template"
                className="flex items-center w-1/2 md:w-1/5"
                title="AI Comic Workshop template"
                href={`/${lang}`}
            >
                <Image
                    width={200}
                    height={200}
                    src={"/logo.gif"}
                    className="transition-all hover:scale-110 w-6 md:w-10 h-6 md:h-10"
                    alt="logo"
                ></Image>
                <h2 className="ml-3 font-bold leading-5">AI Comic Workshop</h2>
            </a>

            <ul className="w-3/5 px-5 font-medium hidden md:flex flex-nowrap items-center justify-around">
                {linkList.map((link, index) => {
                    return (
                        <li key={index} className="group py-3 text-center">
                            <a
                                aria-label={link.name}
                                className="group relative"
                                title={link.name}
                                href={`/${lang}${link.url}`}
                            >
                                {link.name}
                                <div
                                    className="absolute left-[50%] group-hover:left-0 w-0 group-hover:w-full h-[3px] transition-all duration-300 bg-base-content/90"></div>
                            </a>
                        </li>
                    );
                })}
            </ul>

            <div className="md:w-1/5 flex items-center justify-end gap-2">
                {/* <label className='flex items-center justify-center md:bg-base-100 md:rounded-full w-5 md:w-8 h-5 md:h-8 md:shadow-sm md:hover:shadow-md transition-all'>
					<a
						aria-label='get template source code'
						title='get template source code'
						href='https://github.com/huglemon/inwind-landing-page'
					>
						<SiComicfury size={14} />
					</a>
				</label> */}
                <ThemeToggle/>
                <LangSwitch/>
                <div className="hidden md:flex items-center justify-center">
                    <User/>
                </div>
                <div className="md:hidden">
                    <MobileMenu linkList={linkList} lang={lang} />
                </div>
            </div>
        </header>
    );
}
