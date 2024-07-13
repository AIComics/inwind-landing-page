import axios from 'axios';
import fs from 'fs';

import { respData, respErr } from '@/lib/resp';

// Function to save error to a JSON file
function saveErrorToJson(error: any) {
  const errorJson = JSON.stringify(error, null, 2);
  fs.writeFileSync('D:/error.json', errorJson);
}

export async function POST(req: Request) {
  console.log('》》》走到api了:>> ');
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error('No API key found');
    }

    const data = await axios.post(
      'https://dify.tonori.cn/v1/workflows/run',
      {
        inputs: {},
        response_mode: 'streaming',
        user: 'abc-123',
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return respData(data);
  } catch (e) {
    saveErrorToJson(e);
    // console.log('axios request failed: ', e);
    return respErr('axios request failed');
  }
}
