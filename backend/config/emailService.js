const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTPEmail = async (email, otp) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [email],
      subject: "Verify your Resumify account",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Verify your Resumify account</title>
          </head>

          <body style="
            margin: 0;
            padding: 0;
            background-color: #f4f7fb;
            font-family: Arial, Helvetica, sans-serif;
          ">

            <div style="
              padding: 40px 20px;
            ">

              <div style="
                max-width: 520px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                padding: 32px;
              ">

                <div style="
                  color: #176efd;
                  font-size: 24px;
                  font-weight: 700;
                  margin-bottom: 24px;
                ">
                  Resumify
                </div>

                <h1 style="
                  margin: 0 0 16px;
                  color: #111827;
                  font-size: 22px;
                ">
                  Verify your email address
                </h1>

                <p style="
                  margin: 0 0 20px;
                  color: #4b5563;
                  font-size: 15px;
                  line-height: 1.6;
                ">
                  Thanks for signing up for Resumify. Use the verification
                  code below to complete your registration.
                </p>

                <div style="
                  margin: 24px 0;
                  padding: 20px;
                  background-color: #f0f6ff;
                  border: 1px solid #dbeafe;
                  border-radius: 8px;
                  text-align: center;
                ">

                  <p style="
                    margin: 0 0 8px;
                    color: #6b7280;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                  ">
                    Verification Code
                  </p>

                  <p style="
                    margin: 0;
                    color: #176efd;
                    font-size: 32px;
                    font-weight: 700;
                    letter-spacing: 8px;
                  ">
                    ${otp}
                  </p>

                </div>

                <p style="
                  margin: 0;
                  color: #4b5563;
                  font-size: 14px;
                  line-height: 1.6;
                ">
                  This code is valid for 10 minutes. If you did not request
                  this verification code, you can safely ignore this email.
                </p>

                <hr style="
                  border: 0;
                  border-top: 1px solid #e5e7eb;
                  margin: 28px 0 20px;
                " />

                <p style="
                  margin: 0;
                  color: #9ca3af;
                  font-size: 12px;
                  line-height: 1.5;
                ">
                  This is an automated email from Resumify.
                  Please do not reply to this message.
                </p>

              </div>

            </div>

          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend email error:", error);
      throw new Error("Failed to send verification email");
    }

    return data;
  } catch (error) {
    console.error("Send OTP email error:", error);
    throw error;
  }
};

module.exports = sendOTPEmail;
