import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { verifyToken } from "@/lib/auth"

// Update package
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const token = request.cookies.get("admin-token")?.value

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updateData = await request.json()

    const { data: updatedPackage, error } = await supabase
      .from("packages")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    // Add tracking event for status change
    if (updateData.status) {
      await supabase.from("tracking_events").insert({
        package_id: id,
        event_date: new Date().toISOString().split("T")[0],
        event_time: new Date().toTimeString().split(" ")[0],
        location: updateData.current_location || updatedPackage.current_location,
        status: updateData.status,
        description: `Status updated to ${updateData.status}`,
        completed: true,
      })
    }

    return NextResponse.json({ package: updatedPackage })
  } catch (error) {
    console.error("Error updating package:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Delete package
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const token = request.cookies.get("admin-token")?.value

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete tracking events first (due to foreign key constraint)
    const { error: eventsError } = await supabase
      .from("tracking_events")
      .delete()
      .eq("package_id", id)

    if (eventsError) {
      throw eventsError
    }

    // Delete the package
    const { error: packageError } = await supabase
      .from("packages")
      .delete()
      .eq("id", id)

    if (packageError) {
      throw packageError
    }

    return NextResponse.json({ message: "Package deleted successfully" })
  } catch (error) {
    console.error("Error deleting package:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
