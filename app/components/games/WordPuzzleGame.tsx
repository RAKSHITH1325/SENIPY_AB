"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface WordPuzzle {
  word: string
  clue: string
  category: string
}

export function WordPuzzleGame() {
  const [currentPuzzle, setCurrentPuzzle] = useState<WordPuzzle | null>(null)
  const [userInput, setUserInput] = useState("")
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [gameComplete, setGameComplete] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)

  const puzzles: WordPuzzle[] = [
    { word: "GARDEN", clue: "A place where flowers and vegetables grow", category: "Nature" },
    { word: "FAMILY", clue: "People related to you by blood or marriage", category: "Relationships" },
    { word: "MEMORY", clue: "The ability to remember things from the past", category: "Mind" },
    { word: "SUNSET", clue: "When the sun goes down in the evening", category: "Nature" },
    { word: "WISDOM", clue: "Knowledge gained through experience", category: "Mind" },
    { word: "FRIEND", clue: "Someone you like and trust", category: "Relationships" },
    { word: "RECIPE", clue: "Instructions for cooking a dish", category: "Food" },
    { word: "TRAVEL", clue: "Going from one place to another", category: "Activity" },
  ]

  const getRandomPuzzle = () => {
    const randomIndex = Math.floor(Math.random() * puzzles.length)
    return puzzles[randomIndex]
  }

  const startNewPuzzle = () => {
    setCurrentPuzzle(getRandomPuzzle())
    setUserInput("")
    setAttempts(0)
    setFeedback("")
    setGameComplete(false)
    setHintsUsed(0)
  }

  useEffect(() => {
    startNewPuzzle()
  }, [])

  const checkAnswer = () => {
    if (!currentPuzzle) return

    const userAnswer = userInput.toUpperCase().trim()
    const correctAnswer = currentPuzzle.word.toUpperCase()

    setAttempts((prev) => prev + 1)

    if (userAnswer === correctAnswer) {
      const points = Math.max(10 - attempts - hintsUsed, 1)
      setScore((prev) => prev + points)
      setFeedback(`🎉 Correct! You earned ${points} points!`)
      setGameComplete(true)
    } else {
      if (attempts >= 2) {
        setFeedback(`❌ The answer was: ${correctAnswer}`)
        setGameComplete(true)
      } else {
        setFeedback(`❌ Try again! ${3 - attempts - 1} attempts remaining.`)
      }
    }
  }

  const getHint = () => {
    if (!currentPuzzle || hintsUsed >= 2) return

    setHintsUsed((prev) => prev + 1)
    const word = currentPuzzle.word

    if (hintsUsed === 0) {
      setFeedback(`💡 Hint: The word has ${word.length} letters and starts with "${word[0]}"`)
    } else {
      const vowels = word.split("").filter((letter) => "AEIOU".includes(letter))
      setFeedback(`💡 Hint: The word contains these vowels: ${vowels.join(", ")}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !gameComplete) {
      checkAnswer()
    }
  }

  return (
    <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-center text-2xl">Word Puzzle Game</CardTitle>
        <div className="text-center text-slate-300">
          Score: <span className="text-white font-bold">{score}</span>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {currentPuzzle && (
          <>
            <div className="text-center space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-slate-300 text-sm mb-2">Category: {currentPuzzle.category}</p>
                <p className="text-white text-lg">{currentPuzzle.clue}</p>
              </div>

              <div className="flex justify-center space-x-2">
                {currentPuzzle.word.split("").map((_, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 border-2 border-slate-600 rounded-lg flex items-center justify-center text-white text-xl font-bold bg-slate-700"
                  >
                    {userInput.toUpperCase()[index] || ""}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer here..."
                className="bg-slate-700 border-slate-600 text-white text-center text-lg"
                disabled={gameComplete}
                maxLength={currentPuzzle.word.length}
              />

              {feedback && (
                <div className="text-center p-3 rounded-lg bg-slate-700/50">
                  <p className="text-white">{feedback}</p>
                </div>
              )}

              <div className="flex justify-center space-x-4">
                {!gameComplete ? (
                  <>
                    <Button
                      onClick={checkAnswer}
                      disabled={!userInput.trim()}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Submit Answer
                    </Button>
                    <Button
                      onClick={getHint}
                      disabled={hintsUsed >= 2}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      Get Hint ({2 - hintsUsed} left)
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={startNewPuzzle}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Next Puzzle
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
