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
      {/* New Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated Mesh Gradient */}
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

        {/* Floating Geometric Shapes */}
        <div
          className="absolute top-10 left-10 w-20 h-20 border border-blue-400/20 rotate-45 animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 border border-purple-400/15 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rotate-12 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/6 w-8 h-8 border-2 border-pink-400/20 transform rotate-45 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-14 h-14 border border-green-400/15 rounded-lg rotate-45 animate-spin"
          style={{ animationDuration: "15s", animationDelay: "2s" }}
        ></div>

        {/* Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
              <stop offset="50%" stopColor="rgba(147, 51, 234, 0.3)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.5)" />
            </linearGradient>
          </defs>

          <g className="constellation-lines">
            <line x1="100" y1="100" x2="300" y2="200" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.6">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="300" y1="200" x2="500" y2="150" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="5s" repeatCount="indefinite" />
            </line>
            <line x1="700" y1="300" x2="900" y2="250" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.5">
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="200" y1="500" x2="400" y2="600" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.3">
              <animate attributeName="opacity" values="0.1;0.6;0.1" dur="6s" repeatCount="indefinite" />
            </line>
            <line x1="800" y1="500" x2="1000" y2="400" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="4.5s" repeatCount="indefinite" />
            </line>
          </g>

          {/* Constellation Nodes */}
          <g className="constellation-nodes">
            <circle cx="100" cy="100" r="2" fill="rgba(59, 130, 246, 0.8)">
              <animate attributeName="r" values="1;3;1" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="300" cy="200" r="2" fill="rgba(147, 51, 234, 0.8)">
              <animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="500" cy="150" r="2" fill="rgba(236, 72, 153, 0.8)">
              <animate attributeName="r" values="1;3;1" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="700" cy="300" r="2" fill="rgba(59, 130, 246, 0.8)">
              <animate attributeName="r" values="1;3;1" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle cx="900" cy="250" r="2" fill="rgba(147, 51, 234, 0.8)">
              <animate attributeName="r" values="1;3;1" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>

        {/* Flowing Wave Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                <stop offset="50%" stopColor="rgba(147, 51, 234, 0.6)" />
                <stop offset="100%" stopColor="rgba(236, 72, 153, 0.8)" />
              </linearGradient>
            </defs>
            <path d="M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z" fill="url(#waveGradient)" opacity="0.3">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 50,20; 0,0"
                dur="10s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M0,500 Q400,300 800,500 T1200,500 L1200,800 L0,800 Z" fill="url(#waveGradient)" opacity="0.2">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; -30,15; 0,0"
                dur="12s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>

        {/* Glowing Particles */}
        <div className="absolute top-1/6 left-1/5 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-60"></div>
        <div
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-50"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/5 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-70"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/6 right-1/2 w-1 h-1 bg-green-400 rounded-full animate-ping opacity-45"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "gridMove 25s linear infinite",
          }}
        />
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes meshMove {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        .constellation-lines line {
          filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0.5));
        }
        
        .constellation-nodes circle {
          filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.8));
        }
      `}</style>

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

      {/* Download Section */}
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
              <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700 text-center hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 max-w-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-64 w-full">
                    <img src="/images/rohan-profile.jpeg" alt="Rohan B" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      <ShinyText text="Rohan B" speed={3} className="hero-shiny" />
                    </h3>
                    <p className="text-purple-300 font-medium mb-3">UX Designer</p>
                    <p className="text-slate-300 text-sm mb-4">
                      Passionate about creating accessible and intuitive user experiences
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-3 mb-4">
                      <a
                        href="https://linkedin.com/in/rohan-b-ux"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Rohan's LinkedIn"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>

                      <a
                        href="https://github.com/rohan-b-design"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-gray-800 hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Rohan's GitHub"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.874.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>

                      <a
                        href="https://rohanb.design"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Rohan's Portfolio"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center">
              <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700 text-center hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 max-w-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-64 w-full">
                    <img
                      src="/images/rakshith-profile.jpeg"
                      alt="Rakshith Ignatius"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      <ShinyText text="Rakshith Ignatius" speed={3} className="hero-shiny" />
                    </h3>
                    <p className="text-purple-300 font-medium mb-3">AI Specialist & PO</p>
                    <p className="text-slate-300 text-sm mb-4">
                      Expert in machine learning and product strategy for cognitive computing
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-3 mb-4">
                      <a
                        href="https://www.linkedin.com/in/ʀᴀᴋꜱʜɪᴛʜ-ɪɢɴᴀᴛɪᴜꜱ-ʀ-4b328524b"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Rakshith's LinkedIn"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>

                      <a
                        href="https://github.com/rakshith-ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-gray-800 hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Rakshith's GitHub"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.874.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>

                      <a
                        href="https://twitter.com/rakshith_ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Rakshith's Twitter"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center">
              <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700 text-center hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 max-w-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-64 w-full">
                    <img
                      src="https://i.pravatar.cc/300?img=3"
                      alt="Pavan Kumar"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      <ShinyText text="Pavan Kumar" speed={3} className="hero-shiny" />
                    </h3>
                    <p className="text-purple-300 font-medium mb-3">Lead Developer</p>
                    <p className="text-slate-300 text-sm mb-4">
                      Focused on building scalable and robust technology solutions
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-3 mb-4">
                      <a
                        href="https://linkedin.com/in/pavan-kumar-dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Pavan's LinkedIn"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>

                      <a
                        href="https://github.com/pavan-kumar-lead"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-gray-800 hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Pavan's GitHub"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.874.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>

                      <a
                        href="https://pavankumar.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Pavan's Website"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
