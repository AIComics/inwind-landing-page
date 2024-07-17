'use client';
import React from "react";
import { message } from "antd"

import { useUser, UserButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useLocale } from "@/hooks/useI18n";

import signInUriBuilder from "@/lib/clerk/signInUriBuilder";


export default function User() {
    const router = useRouter()
    const {isSignedIn, isLoaded} = useUser()
    const lang = useLocale()

    if (isSignedIn) {
        return (
            <UserButton/>
        )
    }

    const handlerClerkSignInClick: React.MouseEventHandler = (event) => {
        event.preventDefault()

        if (!isLoaded) {
            message.error(lang === "zh" ? "Clark 初始化失败，请刷新页面重试" : "Clerk not loaded, please try again")
            throw new Error("Clerk not loaded")
        }

        router.push(signInUriBuilder())
    }

    return (
        <a className="cursor-pointer text-sm" onClick={handlerClerkSignInClick}>
            {lang === 'zh' ? "登陆" : "Sign in"}
        </a>
    )

}
