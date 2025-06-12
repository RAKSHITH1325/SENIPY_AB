"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Mail, ArrowLeft } from "lucide-react"

interface EmailVerificationProps {
  email: string
  onVerificationComplete: () => void
  onBack: () => void
}

export function EmailVerification({ email, onVerificationComplete, onBack }: EmailVerificationProps) {
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const [isResending, setIsResending] = useState(false)

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setError("")

    // Simulate verification process
    setTimeout(() => {
      if (verificationCode === "123456") {
        onVerificationComplete()
      } else {
        setError("Invalid verification code. Please try again.")
      }
      setIsVerifying(false)
    }, 1500)
  }

  const handleResendCode = async () => {
    setIsResending(true)
    // Simulate resending code
    setTimeout(() => {
      setIsResending(false)
      alert("Verification code resent to your email!")
    }, 1000)
  }

  return (
    <Card className="bg-slate-800 border-slate-700 max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Mail className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-white text-xl">Verify Your Email</CardTitle>
        <p className="text-slate-300 text-sm">
          We've sent a verification code to <strong>{email}</strong>
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleVerification} className="space-y-4">
          <div>
            <Label htmlFor="verification-code" className="text-slate-300">
              Verification Code
            </Label>
            <Input
              id="verification-code"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter 6-digit code"
              className="bg-slate-700 border-slate-600 text-white text-center text-lg tracking-widest"
              maxLength={6}
              required
            />
            <p className="text-xs text-slate-400 mt-1">Demo code: 123456</p>
          </div>

          {error && <div className="text-red-400 text-sm text-center">{error}</div>}

          <Button
            type="submit"
            disabled={isVerifying || verificationCode.length !== 6}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isVerifying ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Verifying...
              </div>
            ) : (
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4" />
                Verify Email
              </div>
            )}
          </Button>
        </form>

        <div className="text-center space-y-2">
          <p className="text-slate-400 text-sm">Didn't receive the code?</p>
          <Button
            variant="ghost"
            onClick={handleResendCode}
            disabled={isResending}
            className="text-blue-400 hover:text-blue-300"
          >
            {isResending ? "Resending..." : "Resend Code"}
          </Button>
        </div>

        <Button variant="ghost" onClick={onBack} className="w-full text-slate-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sign In
        </Button>
      </CardContent>
    </Card>
  )
}
