export const verificationEmail = ({ code }) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
</head>

<body style="margin:0; padding:0; background:#f4f4f4; font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">

        <table width="500px" 
          style="
            background:white;
            margin-top:40px;
            padding:30px;
            border-radius:10px;
          ">

          <tr>
            <td align="center">

              <h1 style="color:#333;">
                Task Management System
              </h1>

              <h2 style="color:#555;">
                Email Verification
              </h2>

              <p style="font-size:16px;color:#666;">
                Thank you for registering.
                Use the verification code below to verify your email.
              </p>


              <div style="
                margin:30px 0;
                padding:15px;
                background:#2563eb;
                color:white;
                font-size:30px;
                font-weight:bold;
                letter-spacing:5px;
                border-radius:8px;
              ">
                ${code}
              </div>


              <p style="color:#777;font-size:14px;">
                This code will expire soon.
                If you did not request this, please ignore this email.
              </p>


            </td>
          </tr>

          <tr>
            <td align="center">
              <hr>

              <p style="font-size:13px;color:#999;">
                © ${new Date().getFullYear()} Task Management System
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
};
