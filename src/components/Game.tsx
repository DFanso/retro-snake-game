import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
import Controls from './Controls';
import { Position, Direction } from '../types/game';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION: Direction = { x: 1, y: 0 };
const BASE_SPEED = 150;

export default function Game() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Calculate speed multiplier based on score
  const speedMultiplier = 1 + Math.floor(score / 50) * 0.2;
  const currentSpeed = Math.max(50, BASE_SPEED / speedMultiplier);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setIsPlaying(false);
    setScore(0);
    generateFood();
  };

  const checkCollision = (head: Position) => {
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      return true;
    }
    
    for (const segment of snake.slice(1)) {
      if (head.x === segment.x && head.y === segment.y) {
        return true;
      }
    }
    return false;
  };

  const moveSnake = useCallback(() => {
    if (!isPlaying) return;

    const newSnake = [...snake];
    const head = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y,
    };

    if (checkCollision(head)) {
      setIsPlaying(false);
      if (score > highScore) {
        setHighScore(score);
      }
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setScore(prev => prev + 10);
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, isPlaying, score, highScore, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, direction]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, currentSpeed);
    return () => clearInterval(gameLoop);
  }, [moveSnake, currentSpeed]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-pink-500/20">
        <ScoreBoard 
          score={score} 
          highScore={highScore} 
          speed={Number(speedMultiplier.toFixed(1))} 
        />
        <GameBoard 
          snake={snake} 
          food={food} 
          gridSize={GRID_SIZE} 
        />
        <Controls 
          isPlaying={isPlaying} 
          onStart={() => setIsPlaying(true)} 
          onReset={resetGame} 
        />
      </div>
    </div>
  );
}