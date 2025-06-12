"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Zap, Target, Download, ArrowRight, Play, Pause } from "lucide-react"
import ProfileCard from "./components/ProfileCard"

// Simple AnimatedLogo component
const AnimatedLogo = () => {
  return (
    <div className="relative">
      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
        SENIPY
      </div>
    </div>
  )
}

// Simple RotatingText component
const RotatingText = () => {
  const words = ["SENIPY", "COGNITIVE", "TRAINING", "AI-POWERED"]
  const [currentWord, setCurrentWord] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-block min-w-[200px] text-left">
      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
        {words[currentWord]}
      </span>
    </span>
  )
}

// Simple ProfileCard component
// const ProfileCard = ({ name, role, image }: { name: string; role: string; image: string }) => {
//   return (
//     <Card className="p-6 text-center hover:shadow-lg transition-shadow">
//       <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
//         {name.charAt(0)}
//       </div>
//       <h3 className="font-semibold text-lg">{name}</h3>
//       <p className="text-gray-600">{role}</p>
//     </Card>
//   )
// }

// Simple game component
const SimpleGame = ({ title, description }: { title: string; description: string }) => {
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">Score: {score}</span>
        <Button
          onClick={() => {
            setIsPlaying(!isPlaying)
            if (!isPlaying) setScore(score + 10)
          }}
          variant={isPlaying ? "destructive" : "default"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? "Pause" : "Play"}
        </Button>
      </div>
    </Card>
  )
}

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [isSignedIn, setIsSignedIn] = useState(false)
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
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <AnimatedLogo />
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Sign In</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign In to SENIPY</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  <Button className="w-full" onClick={() => setIsSignedIn(true)}>
                    Sign In
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Sign Up</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Join SENIPY</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="Enter your email" />
                  </div>
                  <Button className="w-full">Create Account</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 text-center py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 text-center">
            Welcome to <RotatingText />
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-center">
            Enhance your cognitive abilities with our AI-powered training platform designed for seniors
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <Brain className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Cognitive Training</h3>
              <p className="text-gray-600">
                Scientifically designed exercises to improve memory, attention, and processing speed
              </p>
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <Zap className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">Adaptive algorithms that personalize training based on your performance</p>
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <Target className="w-12 h-12 mx-auto mb-4 text-pink-600" />
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">Detailed analytics to monitor your cognitive improvement over time</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Training Games</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SimpleGame title="Memory Match" description="Test your memory with card matching games" />
            <SimpleGame title="Word Puzzle" description="Enhance vocabulary and language skills" />
            <SimpleGame title="Number Challenge" description="Improve numerical reasoning and calculation" />
            <SimpleGame title="Pattern Recognition" description="Develop visual processing abilities" />
            <SimpleGame title="Trivia Quiz" description="Challenge your general knowledge" />
            <SimpleGame title="Brain Teasers" description="Solve puzzles to boost problem-solving skills" />
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Download Our App</h2>
          <p className="text-xl text-gray-600 mb-8">Get the full SENIPY experience on your mobile device</p>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">SENIPY Mobile</h3>
            <p className="mb-6">Version: mark-1</p>
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              <Download className="mr-2 w-5 h-5" />
              Download APK
            </Button>
          </div>
        </div>
      </section>

      {/* Project Builders Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Project Builders</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ProfileCard name="Alex Johnson" role="Lead Developer" image="/images/team-member-1.jpeg" />
            <ProfileCard name="Sarah Chen" role="AI Researcher" image="/images/team-member-2.jpeg" />
            <ProfileCard name="Mike Rodriguez" role="UX Designer" image="/images/team-member-3.jpeg" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <AnimatedLogo />
          <p className="mt-4 text-gray-400">Empowering seniors through AI-powered cognitive training</p>
          <div className="mt-8 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact
            </a>
          </div>
          <p className="mt-8 text-gray-500">© 2024 SENIPY. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
