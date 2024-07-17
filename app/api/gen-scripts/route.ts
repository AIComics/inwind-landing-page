import { NextRequest, NextResponse } from 'next/server';
import { difyRequest } from "@/app/api/request"

export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get('topic');

  if (!topic) {
    return new NextResponse('Missing topic parameter', { status: 400 });
  }

  const encoder = new TextEncoder();

  try {
    const stream = new ReadableStream({
      async start(controller) {
        const sendEvent = (event: string, data: any) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ event, data })}\n\n`));
        };

        sendEvent('debug', { message: 'Stream started' });

        const response = await difyRequest.post(
          '/workflows/run',
          {
            inputs: { topic, typesetting: '0' },
            response_mode: 'streaming',
            user: 'abc-123',
          },
          {
            responseType: 'stream',
          }
        );

        response.data.on('data', (chunk: Buffer) => {
          const rawData = chunk.toString();
          sendEvent('debug', { rawData });

          const lines = rawData.split('\n');
          for (const line of lines) {
            if (line.trim() !== '') {
              try {
                // Check if the line starts with "data: "
                const jsonStr = line.startsWith('data: ') ? line.slice(6) : line;
                const parsedData = JSON.parse(jsonStr);
                sendEvent('data', parsedData);
              } catch (error) {
                sendEvent('error', { message: 'Error parsing JSON', data: line, error: error.message });
              }
            }
          }
        });

        response.data.on('end', () => {
          sendEvent('debug', { message: 'Stream ended' });
          controller.close();
        });
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
