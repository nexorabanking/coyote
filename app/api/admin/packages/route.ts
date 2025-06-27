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

    // Generate unique tracking ID
    const trackingId = `CL${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    const { data: newPackage, error } = await supabase
      .from("packages")
      .insert({
        tracking_id: trackingId,
        ...packageData,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    // Create initial tracking event
    await supabase.from("tracking_events").insert({
      package_id: newPackage.id,
      event_date: new Date().toISOString().split("T")[0],
      event_time: new Date().toTimeString().split(" ")[0],
      location: packageData.current_location,
      status: packageData.status || "Package Picked Up",
      description: `Package picked up from ${packageData.current_location}`,
      completed: true,
    })

    return NextResponse.json({ package: newPackage })
  } catch (error) {
    console.error("Error creating package:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
