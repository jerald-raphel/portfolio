import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const nodemailer = (await import("nodemailer")).default;

  try {
    const { name, email, subject, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jjeraldraphel@gmail.com",
        pass: "smmcvzrxsffawsbo", // make sure this is your App Password!
      },
    });

    await transporter.sendMail({
      from: "Portfolio Contact <jjeraldraphel@gmail.com>",
      to: "jjeraldraphel@gmail.com",
      subject: `Message from: ${name} - ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
