// 这个模块定义了一些用于生成响应的函数

// respData函数用于生成一个成功的响应，它接受一个数据对象作为参数，并将其作为响应的data字段返回
export function respData(data: any) {
  console.log('data in resp :>> ', data);
  return respJson(0, "ok", data || []);
}

export function respDifyData(resData: any) {
  return new Response(JSON.stringify(resData.data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// respOk函数用于生成一个成功的响应，但不包含任何数据
export function respOk() {
  return respJson(0, "ok");
}

// respErr函数用于生成一个失败的响应，它接受一个错误消息作为参数，并将其作为响应的message字段返回
export function respErr(message: string) {
  return respJson(-1, message);
}

// respJson函数用于生成一个通用的响应对象，它接受一个状态码、一个消息和一个数据对象作为参数，并将它们封装成一个JSON对象返回
export function respJson(code: number, message: string, data?: any) {
  let json = {
    code: code,
    message: message,
    respData: data,
  };
  if (data) {
    json["respData"] = data;
  }

  return Response.json(json);
}

