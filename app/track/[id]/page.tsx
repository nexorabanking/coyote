"use client"

import { use, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { ArrowLeft, Package, MapPin, Clock, Truck, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

interface TrackingData {
  id: string
  status: string
  currentLocation: string
  destination: string
  estimatedDelivery: string
  lastUpdate: string
  sender: {
    name: string
    email: string | null
    phone: string | null
    address: string
  }
  recipient: {
    name: string
    email: string | null
    phone: string | null
    address: string
  }
  timeline: Array<{
    date: string
    time: string
    location: string
    status: string
    description: string
    completed: boolean
  }>
  packageInfo: {
    weight: string
    dimensions: string
    service: string
  }
}

export default function TrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await fetch(`/api/track/${id}`)
        const result = await response.json()

        if (response.ok) {
          setTrackingData(result.trackingData)
        } else {
          setTrackingData(null)
        }
      } catch (error) {
        console.error("Error fetching tracking data:", error)
        setTrackingData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchTrackingData()
  }, [id])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "in transit":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "out for delivery":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "in transit":
        return <Truck className="h-4 w-4" />
      case "out for delivery":
        return <Package className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              <p className="text-gray-600">Loading tracking information...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!trackingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center space-y-4">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900">Tracking ID Not Found</h2>
              <p className="text-gray-600">
                We couldn't find any information for tracking ID: <strong>{id}</strong>
              </p>
              <p className="text-sm text-gray-500">
                Please check your tracking ID and try again, or contact our support team for assistance.
              </p>
              <Link href="/">
                <Button className="bg-orange-600 hover:bg-orange-700">Try Another Tracking ID</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Package Tracking</h1>
          <p className="text-gray-600">Tracking ID: {trackingData.id}</p>
        </div>

        {/* Status Overview */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-orange-600" />
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className={getStatusColor(trackingData.status)}>
                {getStatusIcon(trackingData.status)}
                <span className="ml-2">{trackingData.status}</span>
              </Badge>
              <span className="text-sm text-gray-500">Last updated {trackingData.lastUpdate}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Current Location</p>
                  <p className="font-medium">{trackingData.currentLocation}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Estimated Delivery</p>
                  <p className="font-medium">{trackingData.estimatedDelivery}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sender and Recipient Information */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Sender</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {trackingData.sender.name}</p>
                  <p><strong>Address:</strong> {trackingData.sender.address}</p>
                  {trackingData.sender.email && <p><strong>Email:</strong> {trackingData.sender.email}</p>}
                  {trackingData.sender.phone && <p><strong>Phone:</strong> {trackingData.sender.phone}</p>}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Recipient</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {trackingData.recipient.name}</p>
                  <p><strong>Address:</strong> {trackingData.recipient.address}</p>
                  {trackingData.recipient.email && <p><strong>Email:</strong> {trackingData.recipient.email}</p>}
                  {trackingData.recipient.phone && <p><strong>Phone:</strong> {trackingData.recipient.phone}</p>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Package Information */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Package Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Weight</p>
                <p className="font-medium">{trackingData.packageInfo.weight}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dimensions</p>
                <p className="font-medium">{trackingData.packageInfo.dimensions}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Service</p>
                <p className="font-medium">{trackingData.packageInfo.service}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Tracking Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trackingData.timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${event.completed ? "bg-green-500" : "bg-gray-300"}`}></div>
                    {index < trackingData.timeline.length - 1 && (
                      <div className={`w-0.5 h-12 ${event.completed ? "bg-green-500" : "bg-gray-300"}`}></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{event.status}</span>
                      <Badge variant="outline" className="text-xs">
                        {event.date} {event.time}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                    <p className="text-xs text-gray-500">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
