// import nodemailer from "nodemailer"

// // Validate email format
// function isValidEmail(email: string): boolean {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//   return emailRegex.test(email)
// }

// // Sanitize input to prevent injection
// function sanitizeInput(input: string): string {
//   return input.trim().replace(/[<>]/g, "")
// }

// export async function POST(request: Request) {
//   try {
//     const { name, email, subject, message } = await request.json()

//     // Validate environment variables
//     if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
//       console.error("Missing email configuration: EMAIL_USER and EMAIL_PASSWORD must be set")
//       return Response.json(
//         { error: "Server configuration error. Please contact the site administrator." },
//         { status: 500 }
//       )
//     }

//     // Validation
//     if (!name || !email || !message) {
//       return Response.json({ error: "Missing required fields: name, email, and message are required" }, { status: 400 })
//     }

//     if (!isValidEmail(email)) {
//       return Response.json({ error: "Invalid email format" }, { status: 400 })
//     }

//     if (name.length < 2 || name.length > 100) {
//       return Response.json({ error: "Name must be between 2 and 100 characters" }, { status: 400 })
//     }

//     if (subject && (subject.length < 2 || subject.length > 200)) {
//       return Response.json({ error: "Subject must be between 2 and 200 characters" }, { status: 400 })
//     }

//     if (message.length < 10 || message.length > 5000) {
//       return Response.json({ error: "Message must be between 10 and 5000 characters" }, { status: 400 })
//     }

//     // Sanitize inputs
//     const sanitizedName = sanitizeInput(name)
//     const sanitizedEmail = sanitizeInput(email)
//     const sanitizedSubject = subject ? sanitizeInput(subject) : `New Portfolio Message from ${sanitizedName}`
//     const sanitizedMessage = sanitizeInput(message)

//     // Configure nodemailer transporter
//     // Support for Gmail, Outlook, Yahoo, and custom SMTP
//     const emailService = process.env.EMAIL_SERVICE?.toLowerCase() || "gmail"
    
//     let transporterConfig: any
    
//     if (emailService === "outlook" || emailService === "hotmail") {
//       transporterConfig = {
//         host: "smtp-mail.outlook.com",
//         port: 587,
//         secure: false,
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASSWORD,
//         },
//       }
//     } else if (emailService === "yahoo") {
//       transporterConfig = {
//         host: "smtp.mail.yahoo.com",
//         port: 587,
//         secure: false,
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASSWORD,
//         },
//       }
//     } else if (emailService === "gmail") {
//       transporterConfig = {
//         service: "gmail",
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASSWORD,
//         },
//       }
//     } else {
//       // Custom SMTP configuration
//       transporterConfig = {
//         host: process.env.SMTP_HOST,
//         port: parseInt(process.env.SMTP_PORT || "587"),
//         secure: process.env.SMTP_SECURE === "true",
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASSWORD,
//         },
//       }
//     }
    
//     const transporter = nodemailer.createTransport(transporterConfig)

//     // Email options
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
//       subject: sanitizedSubject,
//       html: `
//         <h2>New Contact Form Submission</h2>
//         <p><strong>Name:</strong> ${sanitizedName}</p>
//         <p><strong>Email:</strong> ${sanitizedEmail}</p>
//         ${subject ? `<p><strong>Subject:</strong> ${sanitizedSubject}</p>` : ""}
//         <p><strong>Message:</strong></p>
//         <p>${sanitizedMessage.replace(/\n/g, "<br/>")}</p>
//       `,
//       replyTo: sanitizedEmail,
//     }

//     // Send email
//     await transporter.sendMail(mailOptions)

//     return Response.json({ success: true, message: "Email sent successfully" }, { status: 200 })
//   } catch (error) {
//     console.error("Contact form error:", error)
    
//     // Provide more specific error messages for Gmail
//     if (error instanceof Error) {
//       const errorMsg = error.message.toLowerCase()
      
//       // Gmail-specific authentication errors
//       if (errorMsg.includes("invalid login") || errorMsg.includes("username and password not accepted")) {
//         return Response.json(
//           { 
//             error: "Gmail authentication failed. Make sure you're using an App Password (not your regular password). Visit: https://myaccount.google.com/apppasswords" 
//           },
//           { status: 500 }
//         )
//       }
//       if (errorMsg.includes("less secure app") || errorMsg.includes("application-specific password")) {
//         return Response.json(
//           { 
//             error: "Gmail requires an App Password. Generate one at: https://myaccount.google.com/apppasswords" 
//           },
//           { status: 500 }
//         )
//       }
//       if (errorMsg.includes("econnection") || errorMsg.includes("etimedout")) {
//         return Response.json(
//           { error: "Connection error. Please check your internet connection and try again." },
//           { status: 500 }
//         )
//       }
//       if (errorMsg.includes("eauthentication")) {
//         return Response.json(
//           { 
//             error: "Authentication failed. For Gmail, you must use an App Password. Get one at: https://myaccount.google.com/apppasswords" 
//           },
//           { status: 500 }
//         )
//       }
//     }
    
//     return Response.json(
//       { error: error instanceof Error ? error.message : "Failed to send email. Please try again." },
//       { status: 500 }
//     )
//   }
// }
