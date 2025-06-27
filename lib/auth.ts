import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { supabase } from "./supabase"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-change-in-production"

export interface AdminUser {
  id: string
  email: string
  full_name: string
}

export async function verifyAdmin(email: string, password: string): Promise<AdminUser | null> {
  try {
    console.log("Attempting to verify admin:", email)

    const { data: user, error } = await supabase.from("admin_users").select("*").eq("email", email).single()

    if (error) {
      console.error("Database error:", error)
      return null
    }

    if (!user) {
      console.log("User not found")
      return null
    }

    console.log("User found, verifying password...")

    // Check if password matches
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    console.log("Password valid:", isValidPassword)

    if (!isValidPassword) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
    }
  } catch (error) {
    console.error("Auth error:", error)
    return null
  }
}

export function generateToken(user: AdminUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
    },
    JWT_SECRET,
    { expiresIn: "24h" },
  )
}

export function verifyToken(token: string): AdminUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminUser
    return decoded
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}
