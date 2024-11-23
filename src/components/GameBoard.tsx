import React from 'react';
import { Position } from '../types/game';

type GameBoardProps = {
  snake: Position[];
  food: Position;
  gridSize: number;
};

export default function GameBoard({ snake, food, gridSize }: GameBoardProps) {
  return (
    <div 
      className="relative w-[400px] h-[400px] border-2 border-pink-500/50 rounded-lg overflow-hidden mb-6"
      style={{
        background: 'linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)',
        backgroundSize: `${400/gridSize}px ${400/gridSize}px`
      }}
    >
      {snake.map((segment, i) => (
        <div
          key={i}
          className="absolute bg-pink-500 rounded-sm transition-all duration-100"
          style={{
            width: `${100/gridSize}%`,
            height: `${100/gridSize}%`,
            left: `${(segment.x * 100)/gridSize}%`,
            top: `${(segment.y * 100)/gridSize}%`,
            boxShadow: i === 0 ? '0 0 10px rgba(236, 72, 153, 0.5)' : 'none'
          }}
        />
      ))}
      <div
        className="absolute bg-purple-400 rounded-full animate-pulse"
        style={{
          width: `${100/gridSize}%`,
          height: `${100/gridSize}%`,
          left: `${(food.x * 100)/gridSize}%`,
          top: `${(food.y * 100)/gridSize}%`,
          boxShadow: '0 0 10px rgba(192, 132, 252, 0.5)'
        }}
      />
    </div>
  );
}