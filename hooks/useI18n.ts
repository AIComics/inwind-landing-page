import { useState, useEffect } from "react"
import { usePathname } from "next/navigation";
import { defaultLocale, getDictionary } from "@/lib/i18n"

export async function useI18n(locale: string = defaultLocale) {
    return await getDictionary(locale);
}

export const useLocale = (_defaultLocale?: string ) => {
    const pathname = usePathname();

    const [locale, setLocale] = useState(_defaultLocale ?? defaultLocale)

    useEffect(() => {
        if (pathname !== "/") {
            setLocale(pathname.split("/")[1] ?? defaultLocale);
        } else {
            setLocale(defaultLocale)
        }
    }, [pathname]);

    return locale
}
