"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface MathProblem {
  question: string
  answer: number
  difficulty: "easy" | "medium" | "hard"
}

export function NumberChallengeGame() {
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(false)

  const generateProblem = (diff: "easy" | "medium" | "hard"): MathProblem => {
    let question: string
    let answer: number

    switch (diff) {
      case "easy":
        const a = Math.floor(Math.random() * 20) + 1
        const b = Math.floor(Math.random() * 20) + 1
        const operation = Math.random() > 0.5 ? "+" : "-"
        if (operation === "+") {
          question = `${a} + ${b}`
          answer = a + b
        } else {
          const larger = Math.max(a, b)
          const smaller = Math.min(a, b)
          question = `${larger} - ${smaller}`
          answer = larger - smaller
        }
        break

      case "medium":
        const c = Math.floor(Math.random() * 12) + 1
        const d = Math.floor(Math.random() * 12) + 1
        const op = Math.random() > 0.5 ? "×" : "÷"
        if (op === "×") {
          question = `${c} × ${d}`
          answer = c * d
        } else {
          const product = c * d
          question = `${product} ÷ ${c}`
          answer = d
        }
        break

      case "hard":
        const operations = ["+", "-", "×"]
        const op1 = operations[Math.floor(Math.random() * operations.length)]
        const op2 = operations[Math.floor(Math.random() * operations.length)]
        const x = Math.floor(Math.random() * 10) + 1
        const y = Math.floor(Math.random() * 10) + 1
        const z = Math.floor(Math.random() * 10) + 1

        let intermediate: number
        if (op1 === "+") intermediate = x + y
        else if (op1 === "-") intermediate = Math.max(x, y) - Math.min(x, y)
        else intermediate = x * y

        if (op2 === "+") {
          question = `(${x} ${op1} ${y}) + ${z}`
          answer = intermediate + z
        } else if (op2 === "-") {
          question = `(${x} ${op1} ${y}) - ${z}`
          answer = Math.max(intermediate - z, 0)
        } else {
          question = `(${x} ${op1} ${y}) × ${z}`
          answer = intermediate * z
        }
        break
    }

    return { question, answer, difficulty: diff }
  }

  const startGame = () => {
    setGameActive(true)
    setTimeLeft(30)
    setScore(0)
    setStreak(0)
    setFeedback("")
    generateNewProblem()
  }

  const generateNewProblem = () => {
    setCurrentProblem(generateProblem(difficulty))
    setUserAnswer("")
    setFeedback("")
  }

  const checkAnswer = () => {
    if (!currentProblem || !gameActive) return

    const userNum = Number.parseInt(userAnswer)
    if (isNaN(userNum)) {
      setFeedback("Please enter a valid number")
      return
    }

    if (userNum === currentProblem.answer) {
      const points = difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3
      setScore((prev) => prev + points + streak)
      setStreak((prev) => prev + 1)
      setFeedback(`🎉 Correct! +${points + streak} points`)
      setTimeout(generateNewProblem, 1500)
    } else {
      setStreak(0)
      setFeedback(`❌ Wrong! The answer was ${currentProblem.answer}`)
      setTimeout(generateNewProblem, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && gameActive) {
      checkAnswer()
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000)
    } else if (timeLeft === 0) {
      setGameActive(false)
      setFeedback(`⏰ Time's up! Final score: ${score}`)
    }
    return () => clearTimeout(timer)
  }, [gameActive, timeLeft, score])

  return (
    <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-center text-2xl">Number Challenge</CardTitle>
        <div className="flex justify-center space-x-8 text-slate-300">
          <div>
            Score: <span className="text-white font-bold">{score}</span>
          </div>
          <div>
            Streak: <span className="text-yellow-400 font-bold">{streak}</span>
          </div>
          {gameActive && (
            <div>
              Time: <span className="text-red-400 font-bold">{timeLeft}s</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {!gameActive ? (
          <div className="text-center space-y-6">
            <div>
              <p className="text-slate-300 mb-4">Choose your difficulty level:</p>
              <div className="flex justify-center space-x-4">
                {(["easy", "medium", "hard"] as const).map((diff) => (
                  <Button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    variant={difficulty === diff ? "default" : "outline"}
                    className={
                      difficulty === diff
                        ? "bg-gradient-to-r from-purple-600 to-pink-600"
                        : "border-slate-600 text-slate-300 hover:bg-slate-700"
                    }
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Difficulty Info:</h3>
              <div className="text-slate-300 text-sm space-y-1">
                <p>
                  <strong>Easy:</strong> Addition and subtraction (1-20)
                </p>
                <p>
                  <strong>Medium:</strong> Multiplication and division (1-12)
                </p>
                <p>
                  <strong>Hard:</strong> Mixed operations with parentheses
                </p>
              </div>
            </div>

            <Button
              onClick={startGame}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Start Game (30 seconds)
            </Button>
          </div>
        ) : (
          currentProblem && (
            <div className="text-center space-y-6">
              <div className="bg-slate-700/50 rounded-lg p-6">
                <p className="text-white text-3xl font-bold mb-4">{currentProblem.question} = ?</p>
                <Input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Your answer"
                  className="bg-slate-700 border-slate-600 text-white text-center text-xl max-w-xs mx-auto"
                  autoFocus
                />
              </div>

              {feedback && (
                <div className="p-3 rounded-lg bg-slate-700/50">
                  <p className="text-white text-lg">{feedback}</p>
                </div>
              )}

              <Button
                onClick={checkAnswer}
                disabled={!userAnswer}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Submit Answer
              </Button>
            </div>
          )
        )}
      </CardContent>
    </Card>
  )
}
