"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Pattern {
  sequence: string[]
  missing: number
  options: string[]
  answer: string
}

export function PatternRecognitionGame() {
  const [currentPattern, setCurrentPattern] = useState<Pattern | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [feedback, setFeedback] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)

  const generatePattern = (difficulty: number): Pattern => {
    const patterns = [
      // Color patterns
      () => {
        const colors = ["🔴", "🟡", "🔵", "🟢", "🟣", "🟠"]
        const patternLength = Math.min(3 + difficulty, 6)
        const sequence = []
        for (let i = 0; i < 6; i++) {
          sequence.push(colors[i % patternLength])
        }
        const missing = Math.floor(Math.random() * 6)
        const answer = sequence[missing]
        sequence[missing] = "❓"

        const options = [answer]
        while (options.length < 4) {
          const randomColor = colors[Math.floor(Math.random() * colors.length)]
          if (!options.includes(randomColor)) {
            options.push(randomColor)
          }
        }

        return {
          sequence,
          missing,
          options: options.sort(() => Math.random() - 0.5),
          answer,
        }
      },

      // Shape patterns
      () => {
        const shapes = ["⭐", "🔺", "⬜", "🔶", "⭕", "🔸"]
        const patternLength = Math.min(2 + difficulty, 4)
        const sequence = []
        for (let i = 0; i < 8; i++) {
          sequence.push(shapes[i % patternLength])
        }
        const missing = Math.floor(Math.random() * 8)
        const answer = sequence[missing]
        sequence[missing] = "❓"

        const options = [answer]
        while (options.length < 4) {
          const randomShape = shapes[Math.floor(Math.random() * shapes.length)]
          if (!options.includes(randomShape)) {
            options.push(randomShape)
          }
        }

        return {
          sequence,
          missing,
          options: options.sort(() => Math.random() - 0.5),
          answer,
        }
      },

      // Number patterns
      () => {
        const start = Math.floor(Math.random() * 10) + 1
        const step = Math.floor(Math.random() * 3) + 1
        const sequence = []
        for (let i = 0; i < 7; i++) {
          sequence.push((start + i * step).toString())
        }
        const missing = Math.floor(Math.random() * 7)
        const answer = sequence[missing]
        sequence[missing] = "❓"

        const options = [answer]
        while (options.length < 4) {
          const randomNum = (Math.floor(Math.random() * 20) + 1).toString()
          if (!options.includes(randomNum)) {
            options.push(randomNum)
          }
        }

        return {
          sequence,
          missing,
          options: options.sort(() => Math.random() - 0.5),
          answer,
        }
      },
    ]

    const patternGenerator = patterns[Math.floor(Math.random() * patterns.length)]
    return patternGenerator()
  }

  const startNewPattern = () => {
    setCurrentPattern(generatePattern(level))
    setSelectedAnswer(null)
    setFeedback("")
    setShowAnswer(false)
  }

  useEffect(() => {
    startNewPattern()
  }, [level])

  const checkAnswer = () => {
    if (!currentPattern || !selectedAnswer) return

    if (selectedAnswer === currentPattern.answer) {
      setScore((prev) => prev + level * 5)
      setFeedback("🎉 Correct! Well done!")
      setLevel((prev) => prev + 1)
      setTimeout(() => {
        startNewPattern()
      }, 2000)
    } else {
      setFeedback(`❌ Wrong! The correct answer was ${currentPattern.answer}`)
      setShowAnswer(true)
      setTimeout(() => {
        startNewPattern()
      }, 3000)
    }
  }

  return (
    <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-center text-2xl">Pattern Recognition</CardTitle>
        <div className="flex justify-center space-x-8 text-slate-300">
          <div>
            Score: <span className="text-white font-bold">{score}</span>
          </div>
          <div>
            Level: <span className="text-yellow-400 font-bold">{level}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {currentPattern && (
          <>
            <div className="text-center">
              <p className="text-slate-300 mb-4">Find the missing element in the pattern:</p>

              <div className="flex justify-center items-center space-x-3 mb-6 flex-wrap">
                {currentPattern.sequence.map((item, index) => (
                  <div
                    key={index}
                    className={`
                      w-16 h-16 rounded-lg border-2 flex items-center justify-center text-2xl
                      ${
                        item === "❓"
                          ? "border-yellow-400 bg-yellow-400/20 animate-pulse"
                          : "border-slate-600 bg-slate-700"
                      }
                      ${showAnswer && index === currentPattern.missing ? "border-green-400 bg-green-400/20" : ""}
                    `}
                  >
                    {showAnswer && index === currentPattern.missing ? currentPattern.answer : item}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-center text-slate-300">Choose the correct answer:</p>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {currentPattern.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(option)}
                    className={`
                      w-full h-16 rounded-lg border-2 text-2xl transition-all duration-200
                      ${
                        selectedAnswer === option
                          ? "border-purple-400 bg-purple-400/20"
                          : "border-slate-600 bg-slate-700 hover:bg-slate-600"
                      }
                    `}
                    disabled={showAnswer}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {feedback && (
                <div className="text-center p-3 rounded-lg bg-slate-700/50">
                  <p className="text-white text-lg">{feedback}</p>
                </div>
              )}

              <div className="text-center">
                {!showAnswer ? (
                  <Button
                    onClick={checkAnswer}
                    disabled={!selectedAnswer}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    onClick={startNewPattern}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Next Pattern
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
