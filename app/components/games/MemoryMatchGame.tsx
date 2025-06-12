"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MemoryCard {
  id: number
  symbol: string
  isFlipped: boolean
  isMatched: boolean
}

export function MemoryMatchGame() {
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  const symbols = ["🌟", "🌸", "🦋", "🌈", "🎵", "🌺", "🍀", "🎨"]

  const initializeGame = () => {
    const gameCards = [...symbols, ...symbols].map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false,
    }))

    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]]
    }

    setCards(gameCards)
    setFlippedCards([])
    setScore(0)
    setMoves(0)
    setGameComplete(false)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards
      const firstCard = cards.find((card) => card.id === first)
      const secondCard = cards.find((card) => card.id === second)

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === first || card.id === second ? { ...card, isMatched: true } : card)),
          )
          setScore((prev) => prev + 10)
          setFlippedCards([])
        }, 1000)
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === first || card.id === second ? { ...card, isFlipped: false } : card)),
          )
          setFlippedCards([])
        }, 1000)
      }
      setMoves((prev) => prev + 1)
    }
  }, [flippedCards, cards])

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setGameComplete(true)
    }
  }, [cards])

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return

    const card = cards.find((c) => c.id === cardId)
    if (!card || card.isFlipped || card.isMatched) return

    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)))
    setFlippedCards((prev) => [...prev, cardId])
  }

  return (
    <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-center text-2xl">Memory Match Game</CardTitle>
        <div className="flex justify-center space-x-8 text-slate-300">
          <div>
            Score: <span className="text-white font-bold">{score}</span>
          </div>
          <div>
            Moves: <span className="text-white font-bold">{moves}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {gameComplete ? (
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-green-400">🎉 Congratulations!</h3>
            <p className="text-slate-300">You completed the game in {moves} moves!</p>
            <p className="text-slate-300">Final Score: {score} points</p>
            <Button
              onClick={initializeGame}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Play Again
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`
                    aspect-square text-3xl rounded-lg border-2 transition-all duration-300
                    ${
                      card.isFlipped || card.isMatched
                        ? "bg-white border-purple-500 text-black"
                        : "bg-slate-700 border-slate-600 hover:bg-slate-600"
                    }
                    ${card.isMatched ? "ring-2 ring-green-400" : ""}
                  `}
                  disabled={card.isFlipped || card.isMatched || flippedCards.length === 2}
                >
                  {card.isFlipped || card.isMatched ? card.symbol : "?"}
                </button>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button
                onClick={initializeGame}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                New Game
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
