"use client";

import React, { useState, useEffect } from "react";
import { Edit2, Save, Loader, Search } from "lucide-react";
import { Image } from "antd";

const GeneratorStatus = {
  TOPIC_INPUT: "TOPIC_INPUT",
  GENERATING: "GENERATING",
  GENERATED: "GENERATED",
};

const ComicGenerator = () => {
  const [topic, setTopic] = useState("");
  const [panels, setPanels] = useState([]);
  const [status, setStatus] = useState(GeneratorStatus.TOPIC_INPUT);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingData, setStreamingData] = useState([]);
  const [endImageUrl, setEndImageUrl] = useState<string>("");

  const handleGenerateScript = async () => {
    setIsLoading(true);
    setStatus(GeneratorStatus.GENERATING);
    setStreamingData([]);
    setPanels([]);

    const result = await fetch(
      `/api/get-comic?topic=${encodeURIComponent(topic)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
      const rowData = await result.json();
      console.log("🚀 ~ handleGenerateScript ~ rowData:", rowData);
      const targetPhotoData: string[] = JSON.parse(rowData.data.outputs?.text);
      setEndImageUrl(targetPhotoData["88"][0]); // 临时处理，直接拿最后一张
      setIsLoading(false);
      setStatus(GeneratorStatus.GENERATED);
    } catch (error) {
      console.log("🚀 ~ handleGenerateScript ~ error:", error);
      setIsLoading(false);
      setStatus(GeneratorStatus.GENERATED);
    }

    // const arr = [];
    // for (let i = 0; i < targetPhotoData.length; i++) {
    //   arr.push({
    //     section: `Panel ${i}`,
    //     text: "",
    //     imageUrl: targetPhotoData[i],
    //   });
    // }
    // setPanels(arr);

    // return;

    // const eventSource = new EventSource(
    //   `/api/gen-scripts?topic=${encodeURIComponent(topic)}`
    // );
    // eventSource.onmessage = (event) => {
    //   try {
    //     const data = JSON.parse(event.data);
    //     console.log("Streaming data:", data);
    //     setStreamingData((prevData) => [...prevData, data]);

    //     if (
    //       data.event === "data" &&
    //       data.data.event === "node_finished" &&
    //       data.data.data.index === 4
    //     ) {
    //       console.log("!!!! Comic generation node finished !!!!!");
    //       const nodeData = data.data.data;

    //       // Extract panel texts
    //       if (nodeData.inputs) {
    //         const panelTexts = [];
    //         for (let i = 1; i <= 8; i++) {
    //           const key = `text_bottom_${i}`;
    //           if (nodeData.inputs[key]) {
    //             panelTexts.push({
    //               section: `Panel ${i}`,
    //               text: nodeData.inputs[key],
    //               imageUrl: null, // We'll update this later
    //             });
    //           }
    //         }
    //         setPanels(panelTexts);
    //       }

    //       // Extract and assign image URLs
    //       try {
    //         console.log("Image generation node data:", nodeData);
    //         const imageUrlsData = JSON.parse(nodeData.outputs.text);
    //         console.log("Parsed image URLs data:", imageUrlsData);

    //         // Sort the keys (which are numbers) and get the corresponding URLs
    //         const sortedUrls = Object.keys(imageUrlsData)
    //           .sort((a, b) => parseInt(a) - parseInt(b))
    //           .map((key) => imageUrlsData[key][0])
    //           .filter((url) => !url.includes("PreviewBridge")); // Filter out preview images

    //         setPanels((prevPanels) =>
    //           prevPanels.map((panel, index) => ({
    //             ...panel,
    //             imageUrl: sortedUrls[index] || null,
    //           }))
    //         );

    //         setStatus(GeneratorStatus.GENERATED);
    //       } catch (error) {
    //         console.error("Error parsing image URLs:", error);
    //       }
    //     }

    //     if (data.event === "workflow_finished") {
    //       eventSource.close();
    //       setIsLoading(false);
    //     }
    //   } catch (error) {
    //     console.error("Error processing SSE data:", error);
    //   }
    // };

    // eventSource.onerror = (error) => {
    //   console.error("SSE error:", error);
    //   eventSource.close();
    //   setIsLoading(false);
    //   setStatus(GeneratorStatus.TOPIC_INPUT);
    // };
  };

  const renderPanels = () => {
    return (
      <div>{endImageUrl && <Image src={endImageUrl} alt="end Panel" />}</div>
      // <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      //   {panels.map((panel, index) => (
      //     <div
      //       key={index}
      //       className="flex flex-col border rounded overflow-hidden"
      //     >
      //       <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
      //         {panel.imageUrl ? (
      //           <img
      //             src={panel.imageUrl}
      //             alt={`Panel ${index + 1}`}
      //             className="w-full h-full object-cover"
      //             // onError={(e) => {
      //             //   console.error(`Error loading image for panel ${index + 1}:`, e);
      //             //   e.target.src = '/api/placeholder/400/400';
      //             // }}
      //           />
      //         ) : (
      //           <span className="text-gray-500">Image</span>
      //         )}
      //       </div>
      //       <div className="p-2 bg-white">
      //         <p className="text-sm">{panel.text}</p>
      //       </div>
      //     </div>
      //   ))}
      // </div>
    );
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Comic Generator
        </h1>
        <div className="relative mb-12">
          <div className="relative rounded-full shadow-sm">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Start with a topic..."
              className="block w-full pr-24 sm:pr-32 py-3 pl-6 text-lg leading-6 rounded-full border-2 border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            />
            <button
              onClick={handleGenerateScript}
              disabled={isLoading || topic.trim() === ""}
              className="absolute right-1 top-1 bottom-1 px-4 sm:px-6 flex items-center justify-center text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              {isLoading ? (
                <Loader className="animate-spin h-5 w-5" />
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Generate
                </>
              )}
            </button>
          </div>
        </div>

        {status === GeneratorStatus.GENERATING && (
          <div className="text-center mb-12">
            <Loader className="animate-spin h-10 w-10 mx-auto text-indigo-600 mb-4" />
            <p className="text-lg text-gray-600">
              Crafting your comic masterpiece...
            </p>
          </div>
        )}

        <div className="mb-12">{renderPanels()}</div>

        <div className="bg-gray-50 rounded-lg shadow-md p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Use the Comic Generator
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700">
            <li>
              Enter an interesting topic or theme for your comic in the input
              field above.
            </li>
            <li>
              Click the "Generate" button to start the AI-powered creation
              process.
            </li>
            <li>
              Wait a moment while our advanced AI generates a unique 8-panel
              comic based on your topic.
            </li>
            <li>
              Once complete, your comic will appear as a series of images with
              captions below.
            </li>
            <li>
              Each panel represents a part of the story, creating a narrative
              flow from beginning to end.
            </li>
            <li>
              If you're not satisfied, try again with a different topic or more
              specific details.
            </li>
            <li>
              Remember, AI can be unpredictable – embrace unexpected or amusing
              results as part of the creative process!
            </li>
            <li>
              Have fun exploring various ideas and see what kind of comics you
              can bring to life!
            </li>
          </ol>
          <p className="mt-6 text-sm text-gray-500">
            Note: This tool uses advanced AI to generate comics. While we strive
            for appropriate content, occasionally unexpected results may occur.
            Please use responsibly and enjoy the creative journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComicGenerator;
