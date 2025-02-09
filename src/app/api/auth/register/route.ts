import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,36}$/;

export async function POST(request: Request) {
  try {
    console.log("Received request to /api/auth/register");

    // Parse the request body
    const { email, username, password, fullName, teamMembers } = await request.json();
    console.log("Request body:", { email, username, password, fullName, teamMembers });

    // Validate email and username
    if (!username || !usernameRegex.test(username)) {
      console.log("Invalid username format");
      return NextResponse.json(
        { message: "Invalid username format", code: "INVALID_USERNAME_FORMAT" },
        { status: 400 }
      );
    }
    if (!email || !emailRegex.test(email)) {
      console.log("Invalid email format");
      return NextResponse.json(
        { message: "Invalid email format", code: "INVALID_EMAIL_FORMAT" },
        { status: 400 }
      );
    }
    if (!password) {
      console.log("Password is required");
      return NextResponse.json(
        { message: "Password is required", code: "PASSWORD_REQUIRED" },
        { status: 400 }
      );
    }

    console.log("All fields are valid. Hashing password...");

    // Hash the password
    const hashedPassword = await hash(password, 10);
    console.log("Password hashed successfully");

    // Ensure teamMembers is properly formatted (JSON string for PostgreSQL)
    const formattedTeamMembers = JSON.stringify(teamMembers || []);

    // Insert the user into the database
    try {
      console.log("Inserting user into the database...");
      const response = await sql`
        INSERT INTO users (email, username, password, full_name, team_members)
        VALUES (${email}, ${username}, ${hashedPassword}, ${fullName}, ${formattedTeamMembers})
      `;
      console.log("User inserted successfully:", response);
    } catch (dbError: any) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { message: "Database error", code: "DB_ERROR", details: dbError.message },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({ message: "Success" });
  } catch (e: any) {
    console.error("Error in /api/auth/register:", e);
    
    // Log detailed error properties
    console.error("Error name:", e.name);
    console.error("Error message:", e.message);
    console.error("Error stack:", e.stack);

    if (e instanceof Error) {
      console.error("Full error object:", JSON.stringify(e, Object.getOwnPropertyNames(e), 2));
    }

    // Handle database constraint errors
    if (e.code === "23505") {
      if (e.message.includes("unique_lowercase_email")) {
        console.log("Email already exists");
        return NextResponse.json(
          { message: "Email already exists", code: "EMAIL_EXISTS" },
          { status: 400 }
        );
      }
      if (e.message.includes("unique_username")) {
        console.log("Username already exists");
        return NextResponse.json(
          { message: "Username already exists", code: "USERNAME_EXISTS" },
          { status: 400 }
        );
      }
    }

    // Handle unknown errors
    console.log("Unknown error occurred");
    return NextResponse.json(
      { message: "An error occurred", code: "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
}
