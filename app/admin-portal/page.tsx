"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Truck, Lock, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({
    email: "admin@coyotelogistics.com",
    password: "admin123",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log("Submitting login form...")

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()
      console.log("Login response:", data)

      if (response.ok) {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${data.user.full_name}!`,
        })
        router.push("/admin-portal/dashboard")
      } else {
        setError(data.error || "Login failed")
      }
    } catch (error) {
      console.error("Network error:", error)
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
          <img src="/coyote.png" alt="Coyote Logistics Logo" className="h-10 w-auto" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl">Admin Portal</CardTitle>
            <p className="text-gray-600">Sign in to access the admin dashboard</p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@coyotelogistics.com"
                value=""
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value=""
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Lock className="h-4 w-4 mr-2" />
              )}
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Demo Credentials (pre-filled):</p>
            <p className="text-xs text-gray-500">Email: admin@coyotelogistics.com</p>
            <p className="text-xs text-gray-500">Password: admin123</p>
            <p className="text-xs text-orange-600 mt-2">Note: Make sure to run the database setup scripts first!</p>
          </div> */}
        </CardContent>
      </Card>
    </div>
  )
}
