"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TriviaQuestion {
  question: string
  options: string[]
  correct: number
  category: string
  difficulty: "easy" | "medium" | "hard"
}

export function TriviaQuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [feedback, setFeedback] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  const questions: TriviaQuestion[] = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2,
      category: "Geography",
      difficulty: "easy",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1,
      category: "Science",
      difficulty: "easy",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correct: 2,
      category: "Art",
      difficulty: "medium",
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correct: 1,
      category: "Nature",
      difficulty: "easy",
    },
    {
      question: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correct: 1,
      category: "History",
      difficulty: "medium",
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correct: 2,
      category: "Science",
      difficulty: "hard",
    },
    {
      question: "Which Shakespeare play features the character Hamlet?",
      options: ["Romeo and Juliet", "Macbeth", "Hamlet", "Othello"],
      correct: 2,
      category: "Literature",
      difficulty: "easy",
    },
    {
      question: "What is the smallest country in the world?",
      options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
      correct: 1,
      category: "Geography",
      difficulty: "medium",
    },
    {
      question: "How many strings does a standard guitar have?",
      options: ["4", "5", "6", "7"],
      correct: 2,
      category: "Music",
      difficulty: "easy",
    },
    {
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Platinum"],
      correct: 2,
      category: "Science",
      difficulty: "medium",
    },
  ]

  const getRandomQuestion = () => {
    const availableQuestions = questions.filter((_, index) => index !== questions.indexOf(currentQuestion!))
    if (availableQuestions.length === 0) return questions[0]
    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
  }

  const startNewQuestion = () => {
    if (questionNumber > 10) {
      setGameComplete(true)
      return
    }

    setCurrentQuestion(getRandomQuestion())
    setSelectedAnswer(null)
    setFeedback("")
    setShowAnswer(false)
  }

  const startNewGame = () => {
    setScore(0)
    setQuestionNumber(1)
    setGameComplete(false)
    setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)])
    setSelectedAnswer(null)
    setFeedback("")
    setShowAnswer(false)
  }

  useEffect(() => {
    startNewGame()
  }, [])

  const checkAnswer = () => {
    if (!currentQuestion || selectedAnswer === null) return

    const isCorrect = selectedAnswer === currentQuestion.correct
    const points = currentQuestion.difficulty === "easy" ? 10 : currentQuestion.difficulty === "medium" ? 15 : 20

    if (isCorrect) {
      setScore((prev) => prev + points)
      setFeedback(`🎉 Correct! +${points} points`)
    } else {
      setFeedback(`❌ Wrong! The correct answer was: ${currentQuestion.options[currentQuestion.correct]}`)
    }

    setShowAnswer(true)
    setTimeout(() => {
      setQuestionNumber((prev) => prev + 1)
      startNewQuestion()
    }, 3000)
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
        <CardTitle className="text-white text-center text-2xl">Trivia Quiz</CardTitle>
        {!gameComplete && (
          <div className="flex justify-center space-x-8 text-slate-300">
            <div>
              Score: <span className="text-white font-bold">{score}</span>
            </div>
            <div>
              Question: <span className="text-white font-bold">{questionNumber}/10</span>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {gameComplete ? (
          <div className="text-center space-y-6">
            <h3 className="text-3xl font-bold text-green-400">🎉 Quiz Complete!</h3>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <p className="text-2xl text-white mb-2">Final Score: {score} points</p>
              <p className="text-slate-300">You got {Math.floor(score / 13)} out of 10 questions right!</p>
              <div className="mt-4">
                {score >= 150 && <p className="text-yellow-400">🏆 Excellent performance!</p>}
                {score >= 100 && score < 150 && <p className="text-blue-400">👏 Great job!</p>}
                {score >= 50 && score < 100 && <p className="text-green-400">👍 Good effort!</p>}
                {score < 50 && <p className="text-purple-400">💪 Keep practicing!</p>}
              </div>
            </div>
            <Button
              onClick={startNewGame}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Play Again
            </Button>
          </div>
        ) : (
          currentQuestion && (
            <>
              <div className="space-y-4">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 text-sm">{currentQuestion.category}</span>
                    <span className={`text-sm font-semibold ${getDifficultyColor(currentQuestion.difficulty)}`}>
                      {currentQuestion.difficulty.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-white text-lg">{currentQuestion.question}</p>
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAnswer(index)}
                      disabled={showAnswer}
                      className={`
                        w-full p-4 rounded-lg border-2 text-left transition-all duration-200
                        ${
                          selectedAnswer === index
                            ? showAnswer
                              ? index === currentQuestion.correct
                                ? "border-green-400 bg-green-400/20"
                                : "border-red-400 bg-red-400/20"
                              : "border-purple-400 bg-purple-400/20"
                            : showAnswer && index === currentQuestion.correct
                              ? "border-green-400 bg-green-400/20"
                              : "border-slate-600 bg-slate-700 hover:bg-slate-600"
                        }
                      `}
                    >
                      <span className="text-white">{option}</span>
                    </button>
                  ))}
                </div>

                {feedback && (
                  <div className="text-center p-4 rounded-lg bg-slate-700/50">
                    <p className="text-white text-lg">{feedback}</p>
                  </div>
                )}

                <div className="text-center">
                  {!showAnswer ? (
                    <Button
                      onClick={checkAnswer}
                      disabled={selectedAnswer === null}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <div className="text-slate-400">Next question in {Math.ceil(3)} seconds...</div>
                  )}
                </div>
              </div>
            </>
          )
        )}
      </CardContent>
    </Card>
  )
}
