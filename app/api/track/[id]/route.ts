import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Get package details
    const { data: packageData, error: packageError } = await supabase
      .from("packages")
      .select("*")
      .eq("tracking_id", id)
      .single()

    if (packageError || !packageData) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    // Get tracking events
    const { data: events, error: eventsError } = await supabase
      .from("tracking_events")
      .select("*")
      .eq("package_id", packageData.id)
      .order("event_date", { ascending: true })
      .order("event_time", { ascending: true })

    if (eventsError) {
      throw eventsError
    }

    // Format the response
    const trackingData = {
      id: packageData.tracking_id,
      status: packageData.status,
      currentLocation: packageData.current_location,
      destination: packageData.destination,
      estimatedDelivery: packageData.estimated_delivery,
      lastUpdate: new Date(packageData.updated_at).toLocaleString(),
      sender: {
        name: packageData.sender_name,
        address: packageData.sender_address,
      },
      recipient: {
        name: packageData.recipient_name,
        email: packageData.recipient_email,
        phone: packageData.recipient_phone,
        address: packageData.recipient_address,
      },
      timeline: events.map((event) => ({
        date: new Date(event.event_date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        time: new Date(`1970-01-01T${event.event_time}`).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        location: event.location,
        status: event.status,
        description: event.description,
        completed: event.completed,
      })),
      packageInfo: {
        weight: packageData.weight || "N/A",
        dimensions: packageData.dimensions || "N/A",
        service: packageData.service_type,
      },
    }

    return NextResponse.json({ trackingData })
  } catch (error) {
    console.error("Error fetching tracking data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
