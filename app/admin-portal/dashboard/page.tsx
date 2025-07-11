"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Truck, Search, LogOut, Package, Clock, Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface AdminPackage {
  id: string
  tracking_id: string
  sender_name: string
  recipient_name: string
  recipient_email: string | null
  recipient_phone: string | null
  recipient_address: string
  current_location: string
  destination: string
  estimated_delivery: string
  status: string
  weight: string | null
  dimensions: string | null
  service_type: string
  updated_at: string
}

export default function AdminDashboard() {
  const [packages, setPackages] = useState<AdminPackage[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<AdminPackage | null>(null)
  const [loading, setLoading] = useState(true)
  const [newPackage, setNewPackage] = useState({
    sender_name: "",
    recipient_name: "",
    recipient_email: "",
    recipient_phone: "",
    recipient_address: "",
    current_location: "",
    destination: "",
    estimated_delivery: "",
    weight: "",
    dimensions: "",
    service_type: "Standard Shipping",
    status: "Awaiting shipment",
  })
  const router = useRouter()

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/admin/packages")
      if (response.status === 401) {
        router.push("/admin-portal")
        return
      }
      const data = await response.json()
      setPackages(data.packages || [])
    } catch (error) {
      console.error("Error fetching packages:", error)
      toast({
        title: "Error",
        description: "Failed to fetch packages",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePackage = async () => {
    // Validate required fields
    const requiredFields = [
      'sender_name',
      'recipient_name', 
      'recipient_address',
      'current_location',
      'destination',
      'estimated_delivery'
    ]
    
    const missingFields = requiredFields.filter(field => !newPackage[field as keyof typeof newPackage])
    
    if (missingFields.length > 0) {
      toast({
        title: "Validation Error",
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        variant: "destructive",
      })
      return
    }

    try {
      console.log("Submitting package data:", newPackage)
      console.log("Package data JSON:", JSON.stringify(newPackage, null, 2))
      
      const response = await fetch("/api/admin/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPackage),
      })

      console.log("Response status:", response.status)
      console.log("Response headers:", Object.fromEntries(response.headers.entries()))

      if (response.ok) {
        const data = await response.json()
        console.log("Success response:", data)
        setPackages([data.package, ...packages])
        setNewPackage({
          sender_name: "",
          recipient_name: "",
          recipient_email: "",
          recipient_phone: "",
          recipient_address: "",
          current_location: "",
          destination: "",
          estimated_delivery: "",
          weight: "",
          dimensions: "",
          service_type: "Standard Shipping",
          status: "Awaiting shipment",
        })
        setIsCreateDialogOpen(false)
        toast({
          title: "Package Created",
          description: `New package created with tracking ID: ${data.package.tracking_id}`,
        })
      } else {
        const errorData = await response.json()
        console.error("Server error response:", errorData)
        throw new Error(errorData.details || errorData.error || "Failed to create package")
      }
    } catch (error) {
      console.error("Error creating package:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create package",
        variant: "destructive",
      })
    }
  }

  const handleUpdatePackage = async () => {
    if (!selectedPackage) return

    try {
      const response = await fetch(`/api/admin/packages/${selectedPackage.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: selectedPackage.status,
          current_location: selectedPackage.current_location,
          estimated_delivery: selectedPackage.estimated_delivery,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setPackages(packages.map((pkg) => (pkg.id === selectedPackage.id ? data.package : pkg)))
        setIsEditDialogOpen(false)
        setSelectedPackage(null)
        toast({
          title: "Package Updated",
          description: `Package ${selectedPackage.tracking_id} has been updated successfully.`,
        })
      } else {
        throw new Error("Failed to update package")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update package",
        variant: "destructive",
      })
    }
  }

  const handleDeletePackage = async (packageId: string, trackingId: string) => {
    try {
      const response = await fetch(`/api/admin/packages/${packageId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setPackages(packages.filter((pkg) => pkg.id !== packageId))
        toast({
          title: "Package Deleted",
          description: `Package ${trackingId} has been deleted successfully.`,
        })
      } else {
        throw new Error("Failed to delete package")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete package",
        variant: "destructive",
      })
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      router.push("/admin-portal")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.tracking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.sender_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.recipient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pkg.recipient_email && pkg.recipient_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (pkg.recipient_phone && pkg.recipient_phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pkg.recipient_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "out for delivery":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "arrived at recipient distribution center":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "customs clearance completed":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "flight departure":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "awaiting flight":
        return "bg-cyan-100 text-cyan-800 border-cyan-200"
      case "order shipped":
        return "bg-teal-100 text-teal-800 border-teal-200"
      case "awaiting shipment":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "picked up by customs for clearance":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "on hold clearance":
        return "bg-red-100 text-red-800 border-red-200"
      case "exception":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
          <img src="/coyote.png" alt="Coyote Logistics Logo" className="h-10 w-auto" />
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard </h1>
          <p className="text-gray-600">Manage tracking IDs and package information</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{packages.length}</p>
                  <p className="text-sm text-gray-600">Total Packages</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {packages.filter((p) => p.status === "Awaiting shipment").length}
                  </p>
                  <p className="text-sm text-gray-600">Awaiting Shipment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {packages.filter((p) => 
                      p.status === "Order shipped" || 
                      p.status === "Awaiting flight" || 
                      p.status === "Flight departure"
                    ).length}
                  </p>
                  <p className="text-sm text-gray-600">In Transit</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {packages.filter((p) => p.status === "Delivered").length}
                  </p>
                  <p className="text-sm text-gray-600">Delivered</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by tracking ID, sender, recipient, or addresses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Package
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Package</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Sender and Recipient Information */}
                <div className="grid gap-6">
                  {/* Sender Information */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-700 border-b pb-1">Sender Information</h3>
                    <div>
                      <Label htmlFor="sender-name">Sender Name</Label>
                      <Input
                        id="sender-name"
                        value={newPackage.sender_name}
                        onChange={(e) => setNewPackage({ ...newPackage, sender_name: e.target.value })}
                        placeholder="Enter sender name"
                      />
                    </div>
                  </div>
                  </div>

                  {/* Recipient Information */}
                  <div className="grid gap-6">
                  <div className="space-y-6">
                    <h3 className="text-sm font-medium text-gray-700 border-b pb-1">Recipient Information</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="recipient-name">Recipient Name</Label>
                      <Input
                        id="recipient-name"
                        value={newPackage.recipient_name}
                        onChange={(e) => setNewPackage({ ...newPackage, recipient_name: e.target.value })}
                        placeholder="Enter recipient name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="recipient-email">Recipient Email</Label>
                      <Input
                        id="recipient-email"
                        type="email"
                        value={newPackage.recipient_email}
                        onChange={(e) => setNewPackage({ ...newPackage, recipient_email: e.target.value })}
                        placeholder="Enter recipient email"
                      />
                    </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="recipient-phone">Recipient Phone</Label>
                      <Input
                        id="recipient-phone"
                        type="tel"
                        value={newPackage.recipient_phone}
                        onChange={(e) => setNewPackage({ ...newPackage, recipient_phone: e.target.value })}
                        placeholder="Enter recipient phone"
                      />
                    </div>

                    <div>
                      <Label htmlFor="recipient-address">Recipient Address</Label>
                      <Input
                        id="recipient-address"
                        value={newPackage.recipient_address}
                        onChange={(e) => setNewPackage({ ...newPackage, recipient_address: e.target.value })}
                        placeholder="Enter recipient address"
                      />
                    </div>
                    </div>
                  </div>
                </div>

                {/* Package Details */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700 border-b pb-1">Package Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currentLocation">Current Location</Label>
                      <Input
                        id="currentLocation"
                        value={newPackage.current_location}
                        onChange={(e) => setNewPackage({ ...newPackage, current_location: e.target.value })}
                        placeholder="e.g., Chicago, IL Hub"
                      />
                    </div>

                    <div>
                      <Label htmlFor="destination">Destination</Label>
                      <Input
                        id="destination"
                        value={newPackage.destination}
                        onChange={(e) => setNewPackage({ ...newPackage, destination: e.target.value })}
                        placeholder="e.g., New York, NY"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
                      <Input
                        id="estimatedDelivery"
                        value={newPackage.estimated_delivery}
                        onChange={(e) => setNewPackage({ ...newPackage, estimated_delivery: e.target.value })}
                        placeholder="e.g., Tomorrow by 6:00 PM"
                      />
                    </div>

                    <div>
                      <Label htmlFor="weight">Weight</Label>
                      <Input
                        id="weight"
                        value={newPackage.weight}
                        onChange={(e) => setNewPackage({ ...newPackage, weight: e.target.value })}
                        placeholder="e.g., 2.5 lbs"
                      />
                    </div>

                    <div>
                      <Label htmlFor="dimensions">Dimensions</Label>
                      <Input
                        id="dimensions"
                        value={newPackage.dimensions}
                        onChange={(e) => setNewPackage({ ...newPackage, dimensions: e.target.value })}
                        placeholder="e.g., 12x8x4"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="service">Service Type</Label>
                    <Select
                      value={newPackage.service_type}
                      onValueChange={(value) => setNewPackage({ ...newPackage, service_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Express Shipping">Express Shipping</SelectItem>
                        <SelectItem value="Standard Shipping">Standard Shipping</SelectItem>
                        <SelectItem value="Overnight">Overnight</SelectItem>
                        <SelectItem value="Ground">Ground</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="status">Initial Status</Label>
                    <Select
                      value={newPackage.status}
                      onValueChange={(value) => setNewPackage({ ...newPackage, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Awaiting shipment">Awaiting shipment</SelectItem>
                        <SelectItem value="Order shipped">Order shipped</SelectItem>
                        <SelectItem value="Awaiting flight">Awaiting flight</SelectItem>
                        <SelectItem value="Flight departure">Flight departure</SelectItem>
                        <SelectItem value="Picked up by customs for clearance">Picked up by customs for clearance</SelectItem>
                        <SelectItem value="On hold clearance">On hold clearance</SelectItem>
                        <SelectItem value="Customs clearance completed">Customs clearance completed</SelectItem>
                        <SelectItem value="Arrived at recipient distribution center">Arrived at recipient distribution center</SelectItem>
                        <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Exception">Exception</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                </div>

                <Button onClick={handleCreatePackage} className="w-full bg-orange-600 hover:bg-orange-700">
                  Create Package
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Packages Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Package Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPackages.map((pkg) => (
                <div key={pkg.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-medium">{pkg.tracking_id}</span>
                      <Badge className={getStatusColor(pkg.status)}>{pkg.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dialog
                        open={isEditDialogOpen && selectedPackage?.id === pkg.id}
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open)
                          if (!open) setSelectedPackage(null)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedPackage(pkg)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Update Package: {pkg.tracking_id}</DialogTitle>
                          </DialogHeader>
                          {selectedPackage && (
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="edit-status">Status</Label>
                                <Select
                                  value={selectedPackage.status}
                                  onValueChange={(value) => setSelectedPackage({ ...selectedPackage, status: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Awaiting shipment">Awaiting shipment</SelectItem>
                                    <SelectItem value="Order shipped">Order shipped</SelectItem>
                                    <SelectItem value="Awaiting flight">Awaiting flight</SelectItem>
                                    <SelectItem value="Flight departure">Flight departure</SelectItem>
                                    <SelectItem value="Picked up by customs for clearance">Picked up by customs for clearance</SelectItem>
                                    <SelectItem value="On hold clearance">On hold clearance</SelectItem>
                                    <SelectItem value="Customs clearance completed">Customs clearance completed</SelectItem>
                                    <SelectItem value="Arrived at recipient distribution center">Arrived at recipient distribution center</SelectItem>
                                    <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                                    <SelectItem value="Delivered">Delivered</SelectItem>
                                    <SelectItem value="Exception">Exception</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label htmlFor="edit-currentLocation">Current Location</Label>
                                <Input
                                  id="edit-currentLocation"
                                  value={selectedPackage.current_location}
                                  onChange={(e) =>
                                    setSelectedPackage({ ...selectedPackage, current_location: e.target.value })
                                  }
                                />
                              </div>

                              <div>
                                <Label htmlFor="edit-estimatedDelivery">Estimated Delivery</Label>
                                <Input
                                  id="edit-estimatedDelivery"
                                  value={selectedPackage.estimated_delivery}
                                  onChange={(e) =>
                                    setSelectedPackage({ ...selectedPackage, estimated_delivery: e.target.value })
                                  }
                                />
                              </div>

                              <Button onClick={handleUpdatePackage} className="w-full bg-orange-600 hover:bg-orange-700">
                                Update Package
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Package</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete package <strong>{pkg.tracking_id}</strong>? 
                              This action cannot be undone and will permanently remove all tracking information.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeletePackage(pkg.id, pkg.tracking_id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete Package
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="font-medium text-gray-800 mb-2">Sender</p>
                      <p><strong>Name:</strong> {pkg.sender_name}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 mb-2">Recipient</p>
                      <p><strong>Name:</strong> {pkg.recipient_name}</p>
                      {pkg.recipient_email && <p><strong>Email:</strong> {pkg.recipient_email}</p>}
                      {pkg.recipient_phone && <p><strong>Phone:</strong> {pkg.recipient_phone}</p>}
                      <p><strong>Address:</strong> {pkg.recipient_address}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 mb-2">Package Details</p>
                      <p><strong>Service:</strong> {pkg.service_type}</p>
                      <p><strong>Weight:</strong> {pkg.weight || "N/A"}</p>
                      <p><strong>Current Location:</strong> {pkg.current_location}</p>
                      <p><strong>Last Update:</strong> {new Date(pkg.updated_at).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}

              {filteredPackages.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm ? "No packages found matching your search." : "No packages created yet."}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
