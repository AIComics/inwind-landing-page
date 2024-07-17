import log4js from "log4js"
import * as process from "process";

const _log4js = log4js.configure({
    appenders: {
        default: {
            type: "console",
        }
    },
    categories: {
        default: {
            appenders: ["default"],
            level: process.env.NODE_ENV === "production" ? "info" : "all",
        },
    }
});

export const defaultLogger = _log4js.getLogger("default");

export const difyRequestLogger = _log4js.getLogger("difyRequest");

export const runtimeLogger = _log4js.getLogger("runtime");
