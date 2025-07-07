import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { verifyToken } from "@/lib/auth"

// Get all packages
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin-token")?.value

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: packages, error } = await supabase
      .from("packages")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ packages })
  } catch (error) {
    console.error("Error fetching packages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Create new package
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("admin-token")?.value

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const packageData = await request.json()
    console.log("Received package data:", packageData)

    // Generate unique tracking ID
    const trackingId = `CL${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    console.log("Generated tracking ID:", trackingId)

    // Prepare the data for insertion
    const insertData = {
      tracking_id: trackingId,
      sender_name: packageData.sender_name,
      recipient_name: packageData.recipient_name,
      recipient_email: packageData.recipient_email || null,
      recipient_phone: packageData.recipient_phone || null,
      recipient_address: packageData.recipient_address,
      current_location: packageData.current_location,
      destination: packageData.destination,
      estimated_delivery: packageData.estimated_delivery,
      status: packageData.status || "Awaiting shipment",
      weight: packageData.weight || null,
      dimensions: packageData.dimensions || null,
      service_type: packageData.service_type || "Standard Shipping",
      updated_at: new Date().toISOString(),
    }

    console.log("Inserting package data:", insertData)

    const { data: newPackage, error } = await supabase
      .from("packages")
      .insert(insertData)
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    console.log("Package created successfully:", newPackage)

    // Create initial tracking event
    const trackingEventData = {
      package_id: newPackage.id,
      event_date: new Date().toISOString().split("T")[0],
      event_time: new Date().toTimeString().split(" ")[0],
      location: packageData.current_location,
      status: packageData.status || "Awaiting shipment",
      description: `Package status set to ${packageData.status || "Awaiting shipment"}`,
      completed: true,
    }

    console.log("Creating tracking event:", trackingEventData)

    const { error: trackingError } = await supabase
      .from("tracking_events")
      .insert(trackingEventData)

    if (trackingError) {
      console.error("Error creating tracking event:", trackingError)
      // Don't throw here, as the package was created successfully
    }

    return NextResponse.json({ package: newPackage })
  } catch (error) {
    console.error("Error creating package:", error)
    return NextResponse.json({ 
      error: "Internal server error", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 })
  }
}
