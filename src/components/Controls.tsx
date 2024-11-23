import React from 'react';
import { Play, RotateCcw } from 'lucide-react';

type ControlsProps = {
  isPlaying: boolean;
  onStart: () => void;
  onReset: () => void;
};

export default function Controls({ isPlaying, onStart, onReset }: ControlsProps) {
  return (
    <>
      <div className="flex justify-center gap-4">
        {!isPlaying && (
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full transition-colors shadow-lg hover:shadow-pink-500/20"
          >
            <Play size={20} /> Start Game
          </button>
        )}
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors shadow-lg hover:shadow-purple-500/20"
        >
          <RotateCcw size={20} /> Reset
        </button>
      </div>
      <div className="mt-6 text-center text-purple-300 text-sm">
        Use arrow keys to control the snake
      </div>
    </>
  );
}