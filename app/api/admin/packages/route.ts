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

    // Generate unique tracking ID with timestamp to ensure uniqueness
    const timestamp = Date.now().toString(36)
    const randomPart = Math.random().toString(36).substr(2, 6).toUpperCase()
    const trackingId = `CL${timestamp}${randomPart}`
    console.log("Generated tracking ID:", trackingId)

    // Check if tracking ID already exists
    const { data: existingPackage, error: checkError } = await supabase
      .from("packages")
      .select("tracking_id")
      .eq("tracking_id", trackingId)
      .single()

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error("Error checking existing tracking ID:", checkError)
      throw checkError
    }

    if (existingPackage) {
      console.error("Tracking ID already exists:", trackingId)
      return NextResponse.json({ 
        error: "Tracking ID collision, please try again" 
      }, { status: 409 })
    }

    // Prepare the data for insertion
    const insertData = {
      tracking_id: trackingId,
      sender_name: packageData.sender_name?.trim() || '',
      recipient_name: packageData.recipient_name?.trim() || '',
      recipient_email: packageData.recipient_email?.trim() || null,
      recipient_phone: packageData.recipient_phone?.trim() || null,
      recipient_address: packageData.recipient_address?.trim() || '',
      current_location: packageData.current_location?.trim() || '',
      destination: packageData.destination?.trim() || '',
      estimated_delivery: packageData.estimated_delivery?.trim() || '',
      status: packageData.status?.trim() || "Awaiting shipment",
      weight: packageData.weight?.trim() || null,
      dimensions: packageData.dimensions?.trim() || null,
      service_type: packageData.service_type?.trim() || "Standard Shipping",
      updated_at: new Date().toISOString(),
    }

    // Validate required fields
    const requiredFields = ['sender_name', 'recipient_name', 'recipient_address', 'current_location', 'destination', 'estimated_delivery']
    const missingFields = requiredFields.filter(field => !insertData[field as keyof typeof insertData])
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: "Missing required fields", 
        details: `Required fields missing: ${missingFields.join(', ')}` 
      }, { status: 400 })
    }

    console.log("Inserting package data:", insertData)

    const { data: newPackage, error } = await supabase
      .from("packages")
      .insert(insertData)
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json({ 
          error: "Tracking ID already exists, please try again",
          details: error.message 
        }, { status: 409 })
      }
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
