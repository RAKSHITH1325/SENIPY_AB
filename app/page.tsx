"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Zap, Target, Download, ArrowRight, Play, Pause, Menu, X } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [gameScores, setGameScores] = useState<{ [key: string]: number }>({})
  const [playingGames, setPlayingGames] = useState<{ [key: string]: boolean }>({})

  const handleGameToggle = (gameId: string) => {
    setPlayingGames((prev) => ({
      ...prev,
      [gameId]: !prev[gameId],
    }))

    if (!playingGames[gameId]) {
      setGameScores((prev) => ({
        ...prev,
        [gameId]: (prev[gameId] || 0) + 10,
      }))
    }
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob(["SENIPY AI Assistant - Thank you for downloading!"], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "senipy-mark-1.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `
                radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
              `,
              animation: "meshMove 20s ease-in-out infinite alternate",
            }}
          />
        </div>

        <div
          className="absolute top-10 left-10 w-20 h-20 border border-blue-400/20 rotate-45 animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <div className="absolute top-1/4 right-1/4 w-16 h-16 border border-purple-400/15 rounded-full animate-pulse" />
        <div
          className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rotate-12 animate-bounce"
          style={{ animationDuration: "3s" }}
        />

        <div className="absolute top-1/6 left-1/5 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-60" />
        <div
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-50"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <style jsx>{`
        @keyframes meshMove {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
      `}</style>

      {/* Header */}
      <header className="relative z-50 bg-slate-800/80 backdrop-blur-md border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              SENIPY
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("games")}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Games
              </button>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-slate-300 hover:text-white transition-colors">Login</button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-slate-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Sign In to SENIPY</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="signin-email" className="text-slate-300">
                        Email
                      </Label>
                      <Input
                        id="signin-email"
                        type="email"
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signin-password" className="text-slate-300">
                        Password
                      </Label>
                      <Input
                        id="signin-password"
                        type="password"
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="Enter your password"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Sign In
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Sign Up
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-slate-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Join SENIPY</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="signup-name" className="text-slate-300">
                        Full Name
                      </Label>
                      <Input
                        id="signup-name"
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-email" className="text-slate-300">
                        Email
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-password" className="text-slate-300">
                        Password
                      </Label>
                      <Input
                        id="signup-password"
                        type="password"
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="Create a password"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Create Account
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </nav>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-slate-700 pt-4">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection("games")}
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  Games
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 border border-slate-700">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">SENIPY AI</h1>
                <h2 className="text-xl text-slate-300 mb-2">SENIPY</h2>
                <p className="text-slate-400 italic mb-6">Makers of near Future</p>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  A friendly assistant designed to simplify daily tasks and enhance well-being, particularly for seniors
                  and those seeking an accessible technology experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => scrollToSection("features")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 px-8 py-3 text-lg"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-500/30">
                  <div className="w-32 h-40 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex flex-col items-center justify-center relative">
                    <div className="flex space-x-2 mb-4">
                      <div className="w-3 h-3 bg-slate-800 rounded-full" />
                      <div className="w-3 h-3 bg-slate-800 rounded-full" />
                    </div>
                    <div className="w-16 h-6 bg-blue-500 rounded-md flex items-center justify-center mb-4">
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-white rounded-full" />
                        <div className="w-1 h-1 bg-white rounded-full" />
                        <div className="w-1 h-1 bg-white rounded-full" />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-6 bg-slate-800 rounded-sm" />
                      <div className="w-3 h-6 bg-slate-800 rounded-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-100/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Key Features</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Discover how our robot companion enhances daily life with these thoughtfully designed features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700 hover:bg-slate-800/80 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Voice Integration</h3>
                <p className="text-slate-300">
                  Control your device with simple voice commands, making navigation effortless even for those with
                  limited mobility
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700 hover:bg-slate-800/80 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Interactive Games</h3>
                <p className="text-slate-300">
                  Enjoy engaging games designed to stimulate mental activity, improve cognitive function, and provide
                  entertainment
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700 hover:bg-slate-800/80 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Voice Shopping</h3>
                <p className="text-slate-300">
                  Shop online using voice commands to easily browse and purchase items without the need for complex
                  navigation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Interactive Games</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Engage your mind with our collection of brain-training games designed specifically for seniors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Memory Match", id: "memory", description: "Challenge your memory with card matching" },
              { name: "Word Puzzle", id: "word", description: "Find words in letter grids" },
              { name: "Number Challenge", id: "number", description: "Solve mathematical puzzles" },
              { name: "Pattern Recognition", id: "pattern", description: "Identify and complete patterns" },
              { name: "Trivia Quiz", id: "trivia", description: "Test your knowledge with fun questions" },
              { name: "Brain Teasers", id: "brain", description: "Solve logic puzzles and riddles" },
            ].map((game) => (
              <Card
                key={game.id}
                className="bg-slate-800/60 backdrop-blur-md border-slate-700 hover:bg-slate-800/80 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{game.name}</h3>
                  <p className="text-slate-300 text-sm mb-4">{game.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-semibold">Score: {gameScores[game.id] || 0}</span>
                    <Button
                      onClick={() => handleGameToggle(game.id)}
                      className={`${
                        playingGames[game.id]
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      }`}
                    >
                      {playingGames[game.id] ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      {playingGames[game.id] ? "Pause" : "Play"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-y border-purple-500/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
              ✨ SPECIAL RELEASE ✨
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Download SENIPY</h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8">
              Get our premium mobile application with exclusive features for seniors
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700 border-2 border-purple-500/50 hover:border-purple-400/70 transition-all duration-300">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                        <Download className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">SENIPY APK</h3>
                        <p className="text-purple-300">Version mark-1 • Latest Release</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <span className="text-slate-300">Enhanced voice recognition</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <span className="text-slate-300">Offline game modes</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <span className="text-slate-300">Large text & button options</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <span className="text-slate-300">Emergency contact features</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleDownload}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold"
                    >
                      <Download className="mr-3 h-5 w-5" />
                      Download SENIPY APK
                    </Button>

                    <p className="text-xs text-slate-400 text-center">
                      Compatible with Android 8.0+ • 45MB download • Free forever
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-64 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl border border-purple-500/30 flex items-center justify-center backdrop-blur-sm">
                        <div className="w-48 h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-600 flex flex-col items-center justify-center relative overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-purple-600 to-pink-600" />
                          <div className="text-white text-center mt-8">
                            <div className="text-2xl font-bold mb-2">SENIPY</div>
                            <div className="text-sm text-slate-300 mb-4">Senior-Friendly AI</div>
                            <div className="grid grid-cols-3 gap-2 px-4">
                              {[...Array(9)].map((_, i) => (
                                <div key={i} className="w-8 h-8 bg-slate-700 rounded-lg" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Project Builders Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Project Builders</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">Meet the talented team behind SENIPY AI</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Rohan B",
                title: "UX Designer",
                image: "/images/team-member-1.jpeg",
                description: "Passionate about creating accessible and intuitive user experiences",
                linkedin: "https://linkedin.com/in/rohan-b-ux",
                github: "https://github.com/rohan-b-design",
                portfolio: "https://rohanb.design"
              },
              {
                name: "Rakshith Ignatius",
                title: "AI Specialist & PO",
                image: "/images/team-member-2.jpeg",
                description: "Expert in machine learning and product strategy for cognitive computing",
                linkedin: "https://linkedin.com/in/rakshith-ignatius",
                github: "https://github.com/rakshith-ai",
                twitter: "https://twitter.com/rakshith_ai"
              },
              {
                name: "Pavan Kumar",
                title: "Lead Developer",
                image: "https://i.pravatar.cc/300?img=3",
                description: "Focused on building scalable and robust technology solutions",
                linkedin: "https://linkedin.com/in/pavan-kumar-dev",
                github: "https://github.com/pavan-kumar-lead",
                website: "https://pavankumar.dev"
              },
            ].map((member, index) => (
              <div key={index} className="flex justify-center">
                <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700 text-center hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 max-w-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-64 w-full">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                      <p className="text-purple-300 font-medium mb-3">{member.title}</p>
                      <p className="text-slate-300 text-sm mb-4">{member.description}</p>
                      
                      {/* Social Links */}
                      <div className="flex justify-center space-x-3 mb-4">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                            aria-label={`${member.name}'s LinkedIn`}
                          >
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                        
                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-gray-800 hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors"
                            aria-label={`${member.name}'s GitHub`}
                          >
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.3\
