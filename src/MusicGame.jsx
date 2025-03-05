import React, { useState, useEffect } from "react";
import * as Tone from "tone";

const MusicGame = () => {
  const [currentNote, setCurrentNote] = useState(4); // C4 (middle C) as default
  const [recording, setRecording] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState(
    "↑↓キーで音階を選び、スペースキーで音を鳴らします"
  );
  const [synth, setSynth] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const notes = ["C", "D", "E", "F", "G", "A", "B"];
  const octave = 4;

  // Initialize Tone.js
  useEffect(() => {
    const newSynth = new Tone.Synth().toDestination();
    setSynth(newSynth);

    return () => {
      newSynth.dispose();
    };
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = async (e) => {
      if (!isInitialized && e.key === " ") {
        await Tone.start();
        setIsInitialized(true);
        setMessage("音を鳴らしました。メロディを作りましょう！");
        return;
      }

      if (!isInitialized) return;

      if (e.key === "ArrowUp") {
        setCurrentNote((prev) => Math.min(prev + 1, notes.length - 1));
      } else if (e.key === "ArrowDown") {
        setCurrentNote((prev) => Math.max(prev - 1, 0));
      } else if (e.key === " " && !e.repeat && synth) {
        // Play the note
        const noteToPlay = `${notes[currentNote]}${octave}`;
        synth.triggerAttackRelease(noteToPlay, "8n");

        // Record the note
        const newNote = { note: noteToPlay, time: Date.now() };
        setRecording((prev) => [...prev, newNote]);
        setMessage(`音階: ${noteToPlay} を追加しました`);
      } else if (e.key === "Enter") {
        // Play back the recording
        playRecording();
      } else if (e.key === "Escape") {
        // Clear the recording
        setRecording([]);
        setMessage("録音をリセットしました");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentNote, synth, isInitialized]);

  // Function to play back the recording
  const playRecording = async () => {
    if (recording.length === 0 || isPlaying) return;

    setIsPlaying(true);
    setMessage("再生中...");

    // Play each note in sequence
    for (let i = 0; i < recording.length; i++) {
      if (synth) {
        synth.triggerAttackRelease(recording[i].note, "8n");
        // Wait between notes
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }

    setIsPlaying(false);
    setMessage("再生完了！続けて録音できます");
  };

  // Create piano keys visualization
  const renderPianoKeys = () => {
    return notes.map((note, index) => (
      <div
        key={index}
        className={`p-4 m-1 border ${
          index === currentNote ? "bg-blue-500 text-white" : "bg-white"
        } cursor-pointer`}
        onClick={() => setCurrentNote(index)}
      >
        {note}
        {octave}
      </div>
    ));
  };

  // Display recorded notes
  const renderRecording = () => {
    return recording.map((item, index) => (
      <span key={index} className="mr-2 p-1 bg-gray-100 rounded">
        {item.note}
      </span>
    ));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">じぶんでつくる音楽</h1>

      {!isInitialized && (
        <div className="bg-yellow-100 p-4 mb-4 rounded">
          スペースキーを押して、音楽ゲームを開始してください
        </div>
      )}

      <div className="mb-4 p-2 bg-gray-50 rounded min-h-8">{message}</div>

      <div className="flex justify-center mb-6">{renderPianoKeys()}</div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">操作方法:</h2>
        <ul className="list-disc pl-6">
          <li>↑↓キー: 音階を選択</li>
          <li>スペースキー: 音を鳴らす＆録音</li>
          <li>Enterキー: 録音したメロディを再生</li>
          <li>Escキー: 録音をリセット</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">録音したメロディ:</h2>
        <div className="p-2 border min-h-12 rounded">
          {recording.length > 0
            ? renderRecording()
            : "録音されたメロディはまだありません"}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={playRecording}
            disabled={isPlaying || recording.length === 0}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
          >
            再生
          </button>
          <button
            onClick={() => {
              setRecording([]);
              setMessage("録音をリセットしました");
            }}
            disabled={recording.length === 0}
            className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
          >
            リセット
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicGame;
