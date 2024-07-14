import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get('topic');

  if (!topic) {
    return new NextResponse('Missing topic parameter', { status: 400 });
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return new NextResponse('No API key found', { status: 500 });
  }

  console.log('xxx: ', apiKey, topic);


  try {
    const response = await axios.post(
      'https://dify.tonori.cn/v1/workflows/run',
      {
        inputs: { topic, typesetting: '0' },
        response_mode: 'blocking',
        user: 'abc-123',
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        responseType: 'json',
      }
      // 'http://localhost/v1/chat-messages',
      // {
      //   inputs: {
      //   },
      //   "query": "What are the specs of the iPhone 13 Pro Max?",
      //   response_mode: 'blocking',
      //   user: 'abc-123',
      // },
      // {
      //   headers: {
      //     Authorization: `Bearer app-K8h24ajzA03bfvQwCbDNDQN2`,
      //     'Content-Type': 'application/json',
      //   },
      //   responseType: 'json',
      // }
    );
    console.log("===response ====: ", response);

    return new NextResponse(JSON.stringify(response.data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // const mockData = {
    //   "task_id": "6ccd5122-09e3-4705-b145-6388e37a6141",
    //   "workflow_run_id": "52a002de-4ebe-4224-a8fc-af4d5bc2cab3",
    //   "data": {
    //     "id": "52a002de-4ebe-4224-a8fc-af4d5bc2cab3",
    //     "workflow_id": "32b58f3c-c3c2-4db0-bcf1-967075ada548",
    //     "status": "succeeded",
    //     "outputs": {
    //       "text": "{\"2\": [\"https://comfyui-dify-demo.tonori.cn/view?filename=ComfyUI_temp_ytucl_00001_.png&subfolder=&type=temp\"], \"24\": [\"https://comfyui-dify-demo.tonori.cn/view?filename=ComfyUI_temp_diqez_00001_.png&subfolder=&type=temp\"], \"31\": [\"https://comfyui-dify-demo.tonori.cn/view?filename=ComfyUI_temp_frgbm_00001_.png&subfolder=&type=temp\"], \"47\": [\"https://comfyui-dify-demo.tonori.cn/view?filename=ComfyUI_temp_hmhom_00001_.png&subfolder=&type=temp\"], \"52\": [\"https://comfyui-dify-demo.tonori.cn/view?filename=ComfyUI_temp_neklk_00001_.png&subfolder=&type=temp\"], \"55\": [\"https://comfyui-dify-demo.tonori.cn/view?filename=ComfyUI_temp_mipzg_00001_.png&subfolder=&type=temp\"], \"60\": [\"https://comfyui-dify-demo.tonori.cn/view?filename=ComfyUI_temp_vtfjd_00001_.png&subfolder=&type=temp\"], \"64\": [\"https://comfyui-dify-demo.tonori.cn/view?filename=ComfyUI_temp_fupzh_00001_.png&subfolder=&type=temp\"], \"27\": [\"https://comfyui-dify-demo.tonori.cn/view?filename=PB-_temp_duoji_00001_.png&subfolder=PreviewBridge&type=temp\"], \"88\": [\"https://comfyui-dify-demo.tonori.cn/view?filename=ComfyUI_00340_.png&subfolder=&type=output\"]}",
    //       "json": []
    //     },
    //     "error": null,
    //     "elapsed_time": 101.9472920249973,
    //     "total_tokens": 7901,
    //     "total_steps": 6,
    //     "created_at": 1720968299,
    //     "finished_at": 1720968400
    //   }
    // }

    // return new NextResponse(JSON.stringify(mockData), {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error)
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}