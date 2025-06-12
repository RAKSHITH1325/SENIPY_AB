"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mic, Gamepad2, ShoppingCart, Download, Menu, X, Sparkles } from "lucide-react"
import { MemoryMatchGame } from "./components/games/MemoryMatchGame"
import { WordPuzzleGame } from "./components/games/WordPuzzleGame"
import { NumberChallengeGame } from "./components/games/NumberChallengeGame"
import { PatternRecognitionGame } from "./components/games/PatternRecognitionGame"
import { TriviaQuizGame } from "./components/games/TriviaQuizGame"
import { BrainTeasersGame } from "./components/games/BrainTeasersGame"
import { AnimatedLogo } from "./components/AnimatedLogo"
import Orb from "./components/Orb"
import ShinyText from "./components/ShinyText"
import BlurText from "./components/BlurText"
import { EmailVerification } from "./components/EmailVerification"
import ProfileCard from "./components/ProfileCard"
import RotatingText from "./components/RotatingText"
import { DownloadIcon, Smartphone } from "lucide-react"

export default function SenipyHomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [authDialog, setAuthDialog] = useState<"signin" | "signup" | null>(null)
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const [showOrbDialog, setShowOrbDialog] = useState(false)
  const [showEmailVerification, setShowEmailVerification] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handleAuth = (type: "signin" | "signup", formData: FormData) => {
    const email = formData.get("email") as string
    setUserEmail(email)

    if (type === "signin") {
      // For sign-in, show email verification
      setShowEmailVerification(true)
    } else {
      // For sign-up, you could also add verification or handle differently
      console.log(`${type} attempted with:`, Object.fromEntries(formData))
      setAuthDialog(null)
    }
  }

  const handleVerificationComplete = () => {
    setShowEmailVerification(false)
    setAuthDialog(null)
    alert("Successfully signed in!")
  }

  const handleVerificationBack = () => {
    setShowEmailVerification(false)
  }

  const handleDownload = () => {
    // Create a simple download for demo purposes
    const element = document.createElement("a")
    const file = new Blob(["SENIPY AI Assistant - Thank you for downloading!"], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "senipy-ai.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleAnimationComplete = () => {
    console.log("BlurText animation completed!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-cyan-400/12 to-blue-400/12 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-r from-pink-400/6 to-purple-400/6 rounded-full blur-md animate-bounce"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-gradient-to-r from-green-400/8 to-cyan-400/8 rounded-full blur-lg animate-pulse"></div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5 animate-pulse"></div>
        <div
          className="absolute inset-0 bg-gradient-to-tl from-cyan-900/3 via-transparent to-pink-900/3 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Moving particles */}
        <div className="absolute top-10 left-10 w-1 h-1 bg-blue-300/40 rounded-full animate-ping"></div>
        <div
          className="absolute top-20 right-20 w-1 h-1 bg-purple-300/40 rounded-full animate-ping"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-1 h-1 bg-cyan-300/40 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-1 h-1 bg-pink-300/40 rounded-full animate-ping"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-slate-800/80 backdrop-blur-md border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <AnimatedLogo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-slate-300 hover:text-white transition-colors"
              >
                <ShinyText text="Home" speed={4} className="text-sm" />
              </button>
              <button
                onClick={() => scrollToSection("games")}
                className="text-slate-300 hover:text-white transition-colors"
              >
                <ShinyText text="Games" speed={3} className="text-sm" />
              </button>
              <button
                onClick={() => scrollToSection("feedback")}
                className="text-slate-300 hover:text-white transition-colors"
              >
                <ShinyText text="Feedback" speed={5} className="text-sm" />
              </button>

              {/* SEN Button */}
              <Dialog open={showOrbDialog} onOpenChange={setShowOrbDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-2">
                    <Sparkles className="mr-2 h-4 w-4" />
                    <ShinyText text="SEN" speed={2} className="text-white font-bold" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white text-center">
                      <ShinyText text="Interactive Orb Experience" speed={4} className="hero-shiny text-xl" />
                    </DialogTitle>
                  </DialogHeader>
                  <div className="p-4">
                    <div style={{ width: "100%", height: "400px", position: "relative" }}>
                      <Orb hoverIntensity={0.5} rotateOnHover={true} hue={180} forceHoverState={false} />
                    </div>
                    <p className="text-slate-300 text-center mt-4">
                      <ShinyText
                        text="Hover over the orb to see interactive effects!"
                        speed={3}
                        className="feature-shiny"
                      />
                    </p>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={authDialog === "signin"} onOpenChange={(open) => !open && setAuthDialog(null)}>
                <DialogTrigger asChild>
                  <button
                    onClick={() => setAuthDialog("signin")}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    Login
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-slate-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      <ShinyText text="Sign In" speed={3} className="hero-shiny" />
                    </DialogTitle>
                  </DialogHeader>
                  {showEmailVerification ? (
                    <EmailVerification
                      email={userEmail}
                      onVerificationComplete={handleVerificationComplete}
                      onBack={handleVerificationBack}
                    />
                  ) : (
                    <form action={(formData) => handleAuth("signin", formData)} className="space-y-4">
                      <div>
                        <Label htmlFor="signin-email" className="text-slate-300">
                          Email
                        </Label>
                        <Input
                          id="signin-email"
                          name="email"
                          type="email"
                          required
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="signin-password" className="text-slate-300">
                          Password
                        </Label>
                        <Input
                          id="signin-password"
                          name="password"
                          type="password"
                          required
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        Sign In
                      </Button>
                    </form>
                  )}
                </DialogContent>
              </Dialog>

              <Dialog open={authDialog === "signup"} onOpenChange={(open) => !open && setAuthDialog(null)}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setAuthDialog("signup")}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Sign up
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-slate-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      <ShinyText text="Sign Up" speed={3} className="hero-shiny" />
                    </DialogTitle>
                  </DialogHeader>
                  <form action={(formData) => handleAuth("signup", formData)} className="space-y-4">
                    <div>
                      <Label htmlFor="signup-name" className="text-slate-300">
                        Full Name
                      </Label>
                      <Input
                        id="signup-name"
                        name="name"
                        required
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-email" className="text-slate-300">
                        Email
                      </Label>
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        required
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-password" className="text-slate-300">
                        Password
                      </Label>
                      <Input
                        id="signup-password"
                        name="password"
                        type="password"
                        required
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Sign Up
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-slate-700 pt-4">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  <ShinyText text="Home" speed={4} />
                </button>
                <button
                  onClick={() => scrollToSection("games")}
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  <ShinyText text="Games" speed={3} />
                </button>
                <button
                  onClick={() => scrollToSection("feedback")}
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  <ShinyText text="Feedback" speed={5} />
                </button>
                <Button
                  onClick={() => setShowOrbDialog(true)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 w-fit"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  <ShinyText text="SEN" speed={2} className="text-white font-bold" />
                </Button>
                <button
                  onClick={() => setAuthDialog("signin")}
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  Login
                </button>
                <Button
                  onClick={() => setAuthDialog("signup")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-fit"
                >
                  Sign up
                </Button>
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
                <BlurText
                  text="SENIPY AI"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="text-5xl md:text-6xl font-bold text-white mb-4"
                />
                <h2 className="text-xl text-slate-300 mb-2">
                  <ShinyText text="SENIPY" speed={6} className="feature-shiny" />
                </h2>
                <BlurText
                  text="Maker's of near Future"
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className="text-slate-400 italic mb-6"
                />
                <BlurText
                  text="A friendly assistant designed to simplify daily tasks and enhance well-being, particularly for seniors and those seeking an accessible technology experience."
                  delay={50}
                  animateBy="words"
                  direction="top"
                  className="text-slate-300 mb-8 leading-relaxed"
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => scrollToSection("features")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                  >
                    <ShinyText text="Get Started" speed={3} className="text-white font-semibold" />
                  </Button>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 px-8 py-3 text-lg"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    <ShinyText text="Download" speed={4} className="feature-shiny" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-500/30">
                  <div className="w-32 h-40 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex flex-col items-center justify-center relative">
                    <div className="flex space-x-2 mb-4">
                      <div className="w-3 h-3 bg-slate-800 rounded-full"></div>
                      <div className="w-3 h-3 bg-slate-800 rounded-full"></div>
                    </div>
                    <div className="w-16 h-6 bg-blue-500 rounded-md flex items-center justify-center mb-4">
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-6 bg-slate-800 rounded-sm"></div>
                      <div className="w-3 h-6 bg-slate-800 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-20 bg-slate-100/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <BlurText
              text="Key Features"
              delay={120}
              animateBy="words"
              direction="top"
              className="text-4xl font-bold text-white mb-4 text-center"
            />
            <BlurText
              text="Discover how our robot companion enhances daily life with these thoughtfully designed features"
              delay={60}
              animateBy="words"
              direction="top"
              className="text-slate-300 max-w-2xl mx-auto text-center"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700 hover:bg-slate-800/80 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mic className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  <ShinyText text="Voice Integration" speed={3} className="feature-shiny" />
                </h3>
                <p className="text-slate-300">
                  Control your device with simple voice commands, making navigation effortless even for those with
                  limited mobility
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700 hover:bg-slate-800/80 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gamepad2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  <ShinyText text="Interactive Games" speed={4} className="feature-shiny" />
                </h3>
                <p className="text-slate-300">
                  Enjoy engaging games designed to stimulate mental activity, improve cognitive function, and provide
                  entertainment
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700 hover:bg-slate-800/80 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  <ShinyText text="Voice Shopping" speed={5} className="feature-shiny" />
                </h3>
                <p className="text-slate-300">
                  Shop online using voice commands to easily browse and purchase items without the need for complex
                  navigation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Rotating Text Feature */}
          <div className="text-center mb-8">
            <BlurText
              text="Experience SENIPY with"
              delay={100}
              animateBy="words"
              direction="top"
              className="text-2xl font-bold text-white mb-8 text-center"
            />
          </div>

          <div className="flex justify-center">
            <RotatingText
              texts={[
                "Voice Integration",
                "Easy Navigation",
                "Guardian Connect",
                "Interactive Games",
                "Voice Shopping",
                "Wallet Integration",
              ]}
              mainClassName="px-4 sm:px-6 md:px-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white overflow-hidden py-2 sm:py-3 md:py-4 justify-center rounded-lg text-xl sm:text-2xl md:text-3xl font-bold"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1 sm:pb-2 md:pb-2"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="py-20">
        <div className="container mx-auto px-4">
          {!activeGame ? (
            <>
              <div className="text-center mb-16">
                <BlurText
                  text="Interactive Games"
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className="text-4xl font-bold text-white mb-4"
                />
                <BlurText
                  text="Engage your mind with our collection of brain-training games designed specifically for seniors"
                  delay={60}
                  animateBy="words"
                  direction="top"
                  className="text-slate-300 max-w-2xl mx-auto"
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Memory Match", id: "memory", description: "Challenge your memory with card matching" },
                  { name: "Word Puzzle", id: "word", description: "Find words in letter grids" },
                  { name: "Number Challenge", id: "number", description: "Solve mathematical puzzles" },
                  { name: "Pattern Recognition", id: "pattern", description: "Identify and complete patterns" },
                  { name: "Trivia Quiz", id: "trivia", description: "Test your knowledge with fun questions" },
                  { name: "Brain Teasers", id: "brain", description: "Solve logic puzzles and riddles" },
                ].map((game, index) => (
                  <Card
                    key={index}
                    className="bg-slate-800/60 backdrop-blur-md border-slate-700 hover:bg-slate-800/80 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                        <Gamepad2 className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        <ShinyText text={game.name} speed={3} className="game-shiny" />
                      </h3>
                      <p className="text-slate-300 text-sm mb-4">{game.description}</p>
                      <Button
                        onClick={() => setActiveGame(game.id)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <ShinyText text="Play Now" speed={2} className="text-white font-semibold" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Button
                  onClick={() => setActiveGame(null)}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  ← <ShinyText text="Back to Games" speed={3} className="feature-shiny ml-2" />
                </Button>
              </div>

              {activeGame === "memory" && <MemoryMatchGame />}
              {activeGame === "word" && <WordPuzzleGame />}
              {activeGame === "number" && <NumberChallengeGame />}
              {activeGame === "pattern" && <PatternRecognitionGame />}
              {activeGame === "trivia" && <TriviaQuizGame />}
              {activeGame === "brain" && <BrainTeasersGame />}
            </div>
          )}
        </div>
      </section>

      {/* Specaily Download Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-y border-purple-500/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
              ✨ SPECIAL RELEASE ✨
            </div>
            <BlurText
              text="Download SENIPY"
              delay={120}
              animateBy="words"
              direction="top"
              className="text-4xl font-bold text-white mb-4 text-center"
            />
            <BlurText
              text="Get our premium mobile application with exclusive features for seniors"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-slate-300 max-w-2xl mx-auto mb-8 text-center"
            />
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700 border-2 border-purple-500/50 hover:border-purple-400/70 transition-all duration-300">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                        <Smartphone className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          <ShinyText text="SENIPY APK" speed={3} className="hero-shiny" />
                        </h3>
                        <p className="text-purple-300">Version mark-1 • Latest Release</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-slate-300">Enhanced voice recognition</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-slate-300">Offline game modes</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-slate-300">Large text & button options</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-slate-300">Emergency contact features</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleDownload}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold"
                    >
                      <DownloadIcon className="mr-3 h-5 w-5" />
                      <ShinyText text="Download SENIPY APK" speed={2} className="text-white font-bold" />
                    </Button>

                    <p className="text-xs text-slate-400 text-center">
                      Compatible with Android 8.0+ • 45MB download • Free forever
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-64 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl border border-purple-500/30 flex items-center justify-center backdrop-blur-sm">
                        <div className="w-48 h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-600 flex flex-col items-center justify-center relative overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                          <div className="text-white text-center mt-8">
                            <div className="text-2xl font-bold mb-2">
                              <ShinyText text="SENIPY" speed={3} className="hero-shiny" />
                            </div>
                            <div className="text-sm text-slate-300 mb-4">Senior-Friendly AI</div>
                            <div className="grid grid-cols-3 gap-2 px-4">
                              {[...Array(9)].map((_, i) => (
                                <div key={i} className="w-8 h-8 bg-slate-700 rounded-lg"></div>
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
            <BlurText
              text="Project Builders"
              delay={120}
              animateBy="words"
              direction="top"
              className="text-4xl font-bold text-white mb-4"
            />
            <BlurText
              text="Meet the talented team behind SENIPY AI"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-slate-300 max-w-2xl mx-auto"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="flex justify-center">
              <ProfileCard
                name="Alex Rivera"
                title="Lead Developer"
                handle="alexrivera"
                status="Building the Future"
                contactText="Contact"
                avatarUrl="/images/team-member-1.jpeg"
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => console.log("Contact Alex clicked")}
              />
            </div>

            <div className="flex justify-center">
              <ProfileCard
                name="Jordan Chen"
                title="AI Specialist"
                handle="jordanchen"
                status="Training Models"
                contactText="Connect"
                avatarUrl="https://i.pravatar.cc/300?img=11"
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => console.log("Contact Jordan clicked")}
              />
            </div>

            <div className="flex justify-center">
              <ProfileCard
                name="Morgan Blake"
                title="UX Designer"
                handle="morganblake"
                status="Designing Experiences"
                contactText="Reach Out"
                avatarUrl="https://i.pravatar.cc/300?img=3"
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => console.log("Contact Morgan clicked")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="py-20 bg-slate-100/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <BlurText
                text="We Value Your Feedback"
                delay={120}
                animateBy="words"
                direction="top"
                className="text-4xl font-bold text-white mb-4"
              />
              <BlurText
                text="Help us improve SENIPY AI by sharing your thoughts and suggestions"
                delay={80}
                animateBy="words"
                direction="top"
                className="text-slate-300"
              />
            </div>

            <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="feedback-name" className="text-slate-300">
                      Name
                    </Label>
                    <Input
                      id="feedback-name"
                      className="bg-slate-700 border-slate-600 text-white mt-2"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="feedback-email" className="text-slate-300">
                      Email
                    </Label>
                    <Input
                      id="feedback-email"
                      type="email"
                      className="bg-slate-700 border-slate-600 text-white mt-2"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="feedback-message" className="text-slate-300">
                      Message
                    </Label>
                    <textarea
                      id="feedback-message"
                      className="w-full mt-2 p-3 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 min-h-[120px]"
                      placeholder="Share your feedback, suggestions, or report any issues..."
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <ShinyText text="Send Feedback" speed={3} className="text-white font-semibold" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-md border-t border-slate-700 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-4">
              <ShinyText text="SENIPY" speed={4} className="footer-shiny" />
            </div>
            <p className="text-slate-400 mb-6">
              <ShinyText text="Making technology accessible for everyone" speed={6} className="footer-shiny" />
            </p>
            <div className="flex justify-center space-x-6">
              <button className="text-slate-400 hover:text-white transition-colors">
                <ShinyText text="Privacy Policy" speed={5} className="footer-shiny" />
              </button>
              <button className="text-slate-400 hover:text-white transition-colors">
                <ShinyText text="Terms of Service" speed={4} className="footer-shiny" />
              </button>
              <button className="text-slate-400 hover:text-white transition-colors">
                <ShinyText text="Contact Us" speed={3} className="footer-shiny" />
              </button>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-700">
              <p className="text-slate-500">
                <ShinyText text="© 2024 SENIPY. All rights reserved." speed={7} className="footer-shiny" />
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
