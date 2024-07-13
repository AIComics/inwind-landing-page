"use client";

import React, { useEffect, useRef, useState } from "react";
import { Edit2, Image, Save, Loader } from "lucide-react";

const GeneratorStatus = {
  STORY_INPUT: "STORY_INPUT",
  SCRIPT_GENERATED: "SCRIPT_GENERATED",
  COMIC_GENERATED: "COMIC_GENERATED",
};

const generateMockScripts = async (story: string) => {
  // const scriptsData = await fetch("/api/dify/generateScripts", {
  //   method: "POST",
  //   body: JSON.stringify({ story }),
  // });
  // console.log("scriptsData: ", scriptsData);

  return [
    "1-A person walking under the sun",
    "2-The person looks tired and thirsty",
    "3-They spot a water fountain nearby",
    "4-Refreshed, they continue their journey with a smile",
    "5-A person walking under the sun",
    "6-The person looks tired and thirsty",
    "7-They spot a water fountain nearby",
    "8-Refreshed, they continue their journey with a smile",
  ];
};

const generateMockComic = (scripts: any[]) => {
  return scripts.map(() => "/api/placeholder/200/200");
};

const ComicGenerator = () => {
  const [story, setStory] = useState("");
  const [panels, setPanels] = useState(
    Array(8).fill({ script: "", image: "", isImageView: true })
  );
  const [status, setStatus] = useState(GeneratorStatus.STORY_INPUT);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateScript = () => {
    setIsLoading(true);
    setTimeout(async () => {
      const generatedScripts = await generateMockScripts(story);
      setPanels(
        panels.map((panel, index) => ({
          ...panel,
          script: generatedScripts[index],
        }))
      );
      setStatus(GeneratorStatus.SCRIPT_GENERATED);
      setIsLoading(false);
    }, 1500);
  };

  const handleGenerateComic = () => {
    setIsLoading(true);
    setTimeout(() => {
      const generatedComics = generateMockComic(panels.map((p) => p.script));
      setPanels(
        panels.map((panel, index) => ({
          ...panel,
          image: generatedComics[index],
          isImageView: true,
        }))
      );
      setStatus(GeneratorStatus.COMIC_GENERATED);
      setIsLoading(false);
    }, 3000);
  };

  const handleScriptChange = (index: number, script: string) => {
    setPanels(
      panels.map((panel, i) => (i === index ? { ...panel, script } : panel))
    );
  };

  const handleToggleView = (index: number) => {
    setPanels(
      panels.map((panel, i) =>
        i === index ? { ...panel, isImageView: !panel.isImageView } : panel
      )
    );
  };

  const handleSaveScript = (index: number) => {
    setIsLoading(true);
    setTimeout(() => {
      const newImage = "/api/placeholder/200/200";
      setPanels(
        panels.map((panel, i) =>
          i === index ? { ...panel, image: newImage, isImageView: true } : panel
        )
      );
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Comic Generator</h1>
      <div className="mb-4">
        <label htmlFor="story" className="block mb-2">
          Input Story
        </label>
        <textarea
          id="story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
          disabled={status !== GeneratorStatus.STORY_INPUT}
        />
      </div>
      {status === GeneratorStatus.STORY_INPUT && (
        <button
          onClick={handleGenerateScript}
          disabled={isLoading || story.trim() === ""}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400 mb-4"
        >
          {isLoading ? (
            <Loader className="animate-spin mx-auto" />
          ) : (
            "Generate Script"
          )}
        </button>
      )}
      {status !== GeneratorStatus.STORY_INPUT && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {panels.map((panel, index) => (
            <div key={index} className="relative border rounded p-2">
              {status === GeneratorStatus.COMIC_GENERATED &&
              panel.isImageView ? (
                <img
                  // src={panel.image}
                  src="https://images.pexels.com/photos/7022676/pexels-photo-7022676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt={`Panel ${index + 1}`}
                  // className="w-full h-full object-cover"
                />
              ) : (
                <textarea
                  value={panel.script}
                  onChange={(e) => handleScriptChange(index, e.target.value)}
                  className="w-full h-full resize-none"
                  placeholder={`Panel ${index + 1} script`}
                  disabled={
                    status === GeneratorStatus.COMIC_GENERATED &&
                    panel.isImageView
                  }
                />
              )}
              {status === GeneratorStatus.COMIC_GENERATED && (
                <div className="absolute top-1 right-1 flex">
                  <button
                    onClick={() => handleToggleView(index)}
                    className="p-1 bg-white rounded-full shadow mr-1"
                    title={panel.isImageView ? "Edit script" : "View image"}
                  >
                    {panel.isImageView ? (
                      <Edit2 size={16} />
                    ) : (
                      <Image size={16} />
                    )}
                  </button>
                  {!panel.isImageView && (
                    <button
                      onClick={() => handleSaveScript(index)}
                      className="p-1 bg-white rounded-full shadow"
                      title="Save and regenerate"
                    >
                      <Save size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {status === GeneratorStatus.SCRIPT_GENERATED && (
        <button
          onClick={handleGenerateComic}
          disabled={
            isLoading || panels.some((panel) => panel.script?.trim() === "")
          }
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? (
            <Loader className="animate-spin mx-auto" />
          ) : (
            "Generate Comic"
          )}
        </button>
      )}
    </div>
  );
};

export default ComicGenerator;
