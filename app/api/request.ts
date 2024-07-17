import axios from "axios"
import * as process from "process"
import * as Sentry from '@sentry/nextjs';
import { difyRequestLogger } from "@/lib/logger"

export const difyRequest = axios.create({
    baseURL: process.env.DIFY_API_URL,
})

difyRequest.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${process.env.DIFY_API_KEY as string}`

    return config
})

difyRequest.interceptors.response.use(response => response, error => {
    difyRequestLogger.error(error)
    Sentry.captureException(error)
    return Promise.reject(error)
})
