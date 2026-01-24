import nodemailer from "nodemailer"

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Sanitize input to prevent injection
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "")
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Validation
    if (!name || !email || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (name.length < 2 || name.length > 100) {
      return Response.json({ error: "Name must be between 2 and 100 characters" }, { status: 400 })
    }

    if (message.length < 10 || message.length > 5000) {
      return Response.json({ error: "Message must be between 10 and 5000 characters" }, { status: 400 })
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name)
    const sanitizedEmail = sanitizeInput(email)
    const sanitizedMessage = sanitizeInput(message)

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      subject: `New Portfolio Message from ${sanitizedName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, "<br/>")}</p>
      `,
      replyTo: sanitizedEmail,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return Response.json({ success: true, message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return Response.json({ error: "Failed to send email" }, { status: 500 })
  }
}
