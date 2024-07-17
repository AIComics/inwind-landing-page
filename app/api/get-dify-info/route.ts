import { difyRequest } from "@/app/api/request"

import { SuccessfulResponse, ErrorResponse } from '@/lib/resp';

export async function POST(req: Request) {
  try {
    const { data } = await difyRequest.get(
      'https://dify.tonori.cn/v1/parameters?user=abc-3',
    );

    return new SuccessfulResponse({
      data
    }).nextResponse();
  } catch (e) {
    return new ErrorResponse().nextResponse();
  }
}
