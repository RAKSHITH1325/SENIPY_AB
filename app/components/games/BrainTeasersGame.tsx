"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface BrainTeaser {
  question: string
  answer: string
  hint: string
  category: string
  difficulty: "easy" | "medium" | "hard"
}

export function BrainTeasersGame() {
  const [currentTeaser, setCurrentTeaser] = useState<BrainTeaser | null>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  const brainTeasers: BrainTeaser[] = [
    {
      question:
        "I have keys but no locks. I have space but no room. You can enter, but you can't go outside. What am I?",
      answer: "keyboard",
      hint: "You use me to type on a computer",
      category: "Riddle",
      difficulty: "medium",
    },
    {
      question: "What has hands but cannot clap?",
      answer: "clock",
      hint: "I tell time and hang on walls",
      category: "Riddle",
      difficulty: "easy",
    },
    {
      question: "I'm tall when I'm young, and short when I'm old. What am I?",
      answer: "candle",
      hint: "I provide light and melt as I burn",
      category: "Riddle",
      difficulty: "easy",
    },
    {
      question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
      answer: "m",
      hint: "Think about the letters in these words",
      category: "Word Play",
      difficulty: "hard",
    },
    {
      question:
        "A man lives on the 20th floor of an apartment building. Every morning he takes the elevator down to the ground floor. When he comes home, he takes the elevator to the 10th floor and walks the rest of the way... except on rainy days, when he takes the elevator all the way to the 20th floor. Why?",
      answer: "short",
      hint: "Think about his physical characteristics and what he needs to reach elevator buttons",
      category: "Logic",
      difficulty: "hard",
    },
    {
      question: "What gets wetter the more it dries?",
      answer: "towel",
      hint: "You use me after a shower",
      category: "Riddle",
      difficulty: "easy",
    },
    {
      question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
      answer: "map",
      hint: "I show you where places are located",
      category: "Riddle",
      difficulty: "medium",
    },
    {
      question: "What can travel around the world while staying in a corner?",
      answer: "stamp",
      hint: "I'm small, sticky, and help mail get delivered",
      category: "Riddle",
      difficulty: "medium",
    },
    {
      question: "The more you take, the more you leave behind. What am I?",
      answer: "footsteps",
      hint: "Think about walking",
      category: "Riddle",
      difficulty: "easy",
    },
    {
      question: "What has a head, a tail, is brown, and has no legs?",
      answer: "penny",
      hint: "I'm worth one cent",
      category: "Riddle",
      difficulty: "easy",
    },
  ]

  const getRandomTeaser = () => {
    return brainTeasers[Math.floor(Math.random() * brainTeasers.length)]
  }

  const startNewTeaser = () => {
    setCurrentTeaser(getRandomTeaser())
    setUserAnswer("")
    setShowHint(false)
    setFeedback("")
    setAttempts(0)
    setGameComplete(false)
  }

  useEffect(() => {
    startNewTeaser()
  }, [])

  const checkAnswer = () => {
    if (!currentTeaser) return

    const userAnswerLower = userAnswer.toLowerCase().trim()
    const correctAnswer = currentTeaser.answer.toLowerCase()

    setAttempts((prev) => prev + 1)

    if (userAnswerLower === correctAnswer || userAnswerLower.includes(correctAnswer)) {
      const points = currentTeaser.difficulty === "easy" ? 10 : currentTeaser.difficulty === "medium" ? 15 : 20
      const bonusPoints = showHint ? 0 : 5
      const totalPoints = points + bonusPoints - attempts * 2

      setScore((prev) => prev + Math.max(totalPoints, 1))
      setFeedback(`🎉 Correct! You earned ${Math.max(totalPoints, 1)} points!`)
      setGameComplete(true)
    } else {
      if (attempts >= 2) {
        setFeedback(`❌ The answer was: ${currentTeaser.answer}`)
        setGameComplete(true)
      } else {
        setFeedback(`❌ Try again! ${3 - attempts - 1} attempts remaining.`)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !gameComplete) {
      checkAnswer()
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-400"
      case "medium":
        return "text-yellow-400"
      case "hard":
        return "text-red-400"
      default:
        return "text-slate-400"
    }
  }

  return (
    <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-center text-2xl">Brain Teasers</CardTitle>
        <div className="text-center text-slate-300">
          Score: <span className="text-white font-bold">{score}</span>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {currentTeaser && (
          <>
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-400 text-sm">{currentTeaser.category}</span>
                  <span className={`text-sm font-semibold ${getDifficultyColor(currentTeaser.difficulty)}`}>
                    {currentTeaser.difficulty.toUpperCase()}
                  </span>
                </div>
                <p className="text-white text-lg leading-relaxed">{currentTeaser.question}</p>
              </div>

              {showHint && (
                <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4">
                  <p className="text-yellow-200">💡 Hint: {currentTeaser.hint}</p>
                </div>
              )}

              <div className="space-y-4">
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your answer here..."
                  className="bg-slate-700 border-slate-600 text-white text-center text-lg"
                  disabled={gameComplete}
                />

                {feedback && (
                  <div className="text-center p-4 rounded-lg bg-slate-700/50">
                    <p className="text-white text-lg">{feedback}</p>
                  </div>
                )}

                <div className="flex justify-center space-x-4">
                  {!gameComplete ? (
                    <>
                      <Button
                        onClick={checkAnswer}
                        disabled={!userAnswer.trim()}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        Submit Answer
                      </Button>
                      {!showHint && (
                        <Button
                          onClick={() => setShowHint(true)}
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                          Get Hint
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button
                      onClick={startNewTeaser}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Next Brain Teaser
                    </Button>
                  )}
                </div>
              </div>

              <div className="text-center text-slate-400 text-sm">
                <p>Think carefully and take your time!</p>
                {attempts > 0 && <p>Attempts used: {attempts}/3</p>}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
