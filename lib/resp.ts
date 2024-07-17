// 这个模块定义了一些用于生成响应的函数
import { NextResponse } from 'next/server';


export interface SuccessfulResp<D = any> {
    code: number;
    message: string;
    data?: D
}

export interface ErrorResp {
    code: number;
    message: string;
}

export class SuccessfulResponse {
    code: number;
    message: string;
    data?: any

    constructor({code, message, data}: Partial<SuccessfulResp> = {}) {
        this.code = code ?? 0;
        this.message = message ?? "success";
        this.data = data;
    }

    json() {
        return Response.json({
            code: this.code,
            message: this.message,
            data: this.data
        })
    }

    nextResponse(status: number = 200) {
        return new NextResponse(JSON.stringify({
            code: this.code,
            message: this.message,
            data: this.data
        }), {
            status,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
}

export class ErrorResponse {
    code: number;
    message: string

    constructor({code, message}: Partial<ErrorResp> = {}) {
        this.code = code ?? -1;
        this.message = message ?? "INTERNAL_SERVER_ERROR";
    }

    json() {
        return Response.json({
            code: this.code,
            message: this.message
        })
    }

    nextResponse(status: number = 500) {
        return new NextResponse(JSON.stringify({
            code: this.code,
            message: this.message
        }), {
            status
        })
    }
}


