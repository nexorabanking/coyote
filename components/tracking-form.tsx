"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function TrackingForm() {
  const [trackingId, setTrackingId] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!trackingId.trim()) {
      setError("Please enter a tracking ID")
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/track/${trackingId.trim()}`)
    }, 1000)
  }

  return (
    <Card className="bg-white shadow-xl border-0">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="tracking-id" className="text-sm font-medium text-gray-700">
              Enter Tracking ID
            </label>
            <div className="flex gap-2">
              <Input
                id="tracking-id"
                type="text"
                placeholder="e.g., CL123456789"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1 h-12 text-lg"
                disabled={isLoading}
              />
              <Button type="submit" size="lg" className="bg-orange-600 hover:bg-orange-700 px-8" disabled={isLoading}>
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Track
                  </>
                )}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <p className="text-sm text-gray-500">Don't have a tracking ID? Contact our support team for assistance.</p>
        </form>
      </CardContent>
    </Card>
  )
}
