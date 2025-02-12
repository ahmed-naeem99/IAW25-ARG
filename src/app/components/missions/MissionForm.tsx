"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import localFont from "next/font/local";
import HintButton from "./HintButton";
import { HintProvider } from "@/app/context/HintContext";
import VideoFrame from "./MissionVideo";

const poseyFont = localFont({
  src: "../../../../public/fonts/posey-textured.ttf",
});

interface MissionData {
  video: string;
  answer: string[];
  hint1: string;
  hint2: string;
  hint3: string;
}

const missionData: { [key: number]: MissionData } = {
  1: {
    video: "https://drive.google.com/file/d/19j6ObcDf95_rMN_NckOIIdQ-HWfV03as/preview",
    answer: ["Izz al-Din ibn 'Abd al-Salam", "Izz al Din ibn 'Abd al-Salam"],
    hint1:
      "The clues are on screens. It dissapears and reappears.",
    hint2: "Those are not normal numbers",
    hint3:
      "You might need a laptop. Binary is tricky to decode.",
  },
  2: {
    video: "https://panoraven.com/en/embed/yPsvGiaVtO",
    answer: ["Al Imran"],
    hint1:
      "Hmm. 10 numbers in a row. Looks like a phone number. Try calling it.",
    hint2: "Suspicious audio files are either morse code or a spectogram.",
    hint3: "Ciphers can be symbols too...",
  },
};

const MissionForm = ({ mission }: { mission: number }) => {
  const { data: session, update } = useSession() as any;

  const [submission, setSubmission] = useState("");

  const [submitMessage, setSubmitMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);

  const handleSubmit = async () => {
    setIsCorrect(false);

    if (session.user.mission != mission) {
      setSubmitMessage("You have already completed this mission.");
      return;
    }

    if (!missionData[mission].answer.includes(submission)) {
      setSubmitMessage("Incorrect.");
      return;
    }

    const response = await fetch("/api/auth/updateMission", {
      method: "POST",
      body: JSON.stringify({
        username: session.user.username,
        setMission: mission === 2 ? -1 : mission + 1,
      }),
    });

    if (response.status === 200) {
      setIsCorrect(true);
      if (mission === 2) {
        setSubmitMessage(
          "Congratulations! You have completed all the missions."
        );
        return;
      } else {
        setSubmitMessage("Correct! Well done, proceed to mission 2.");
      }
      update({ mission: mission === 2 ? -1 : mission + 1 });
      return;
    }

    setSubmitMessage("An error has occurred. Please try again.");
  };

  return (
    <HintProvider>
      <div className="h-full justify-center text-center pb-16 md:mx-auto flex flex-col items-center overflow-auto min-h-screen">
        <div className="flex flex-col items-center text-center sm:w-3/4 w-full md:max-w-lg">
          <VideoFrame
            videoLink={missionData[mission].video}
            mission={mission}
          />
          <div
            className={`dark:text-white text-black text-2xl py-8 ${poseyFont.className}`}
          >
            Mission {mission} Submission
          </div>
          <input
            name="missionAnswer"
            onChange={(e) => setSubmission(e.target.value)}
            className="block px-3 sm:w-full w-3/4 rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
          />
          {submitMessage && isCorrect && (
            <p className="text-green-500 pt-3 sm:w-full w-3/4">
              {submitMessage}
            </p>
          )}
          {submitMessage && !isCorrect && (
            <p className="text-red-500 pt-3 sm:w-full w-3/4">{submitMessage}</p>
          )}
          <div className=" flex flex-col text-center items-center gap-y-5 sm:w-full w-3/4 py-4">
            <button
              onClick={handleSubmit}
              disabled={!submission}
              className="disabled:opacity-40 flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Submit (Use Wikipedia Spelling)
            </button>
            <HintButton
              hintNum={1}
              hintMessage={missionData[mission].hint1}
              mission={mission}
            />

            <HintButton
              hintNum={2}
              hintMessage={missionData[mission].hint2}
              mission={mission}
            />

            <HintButton
              hintNum={3}
              hintMessage={missionData[mission].hint3}
              mission={mission}
            />
          </div>
        </div>
      </div>
    </HintProvider>
  );
};

export default MissionForm;
