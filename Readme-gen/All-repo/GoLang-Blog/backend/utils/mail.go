package utils

import (
	"fmt"
	"net/smtp"
	"os"
	"sync"
)

func MailSender(sender string, otp int, wg *sync.WaitGroup) {
	defer wg.Done() // Ensure that wg.Done() is called regardless of success or failure

	from := os.Getenv("MAIL_ID")
	pass := os.Getenv("MAIL_PASS")
	if from == "" || pass == "" {
		fmt.Println("Environment variables MAIL_ID or MAIL_PASS are not set.")
		os.Exit(1)
	}
	to := sender
	host := "smtp.gmail.com"
	port := "587"
	
	message := fmt.Sprintf(`
		<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            background-color: #f5f5f5;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            padding: 32px 24px;
            text-align: center;
        }

        .header h1 {
            font-size: 28px;
            font-weight: 600;
            margin: 0;
            letter-spacing: -0.5px;
        }

        .content {
            padding: 32px 24px;
        }

        .content p {
            margin-bottom: 16px;
            font-size: 16px;
        }

        .otp-box {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 24px;
            margin: 24px 0;
            text-align: center;
        }

        .otp {
            font-size: 32px;
            font-weight: bold;
            color: #4f46e5;
            letter-spacing: 4px;
            margin: 16px 0;
        }

        .links {
            padding: 24px;
            background: #f8fafc;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }

        .links a {
            display: inline-block;
            padding: 12px 24px;
            margin: 8px;
            background: white;
            color: #4f46e5;
            text-decoration: none;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
        }

        .links a:hover {
            background: #4f46e5;
            color: white;
            transform: translateY(-2px);
        }

        .footer {
            padding: 24px;
            text-align: center;
            color: #64748b;
            font-size: 14px;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
        }

        .footer p {
            margin-bottom: 8px;
        }

        @media (max-width: 640px) {
            .container {
                margin: 20px;
                border-radius: 8px;
            }

            .header {
                padding: 24px 16px;
            }

            .header h1 {
                font-size: 24px;
            }

            .content {
                padding: 24px 16px;
            }

            .links a {
                display: block;
                margin: 8px 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Our Blog Platform!</h1>
        </div>
        <div class="content">
            <p>Hello there! 👋</p>
            <p>We're thrilled to have you join our community of writers and thinkers. Our platform is designed to give you the freedom to express yourself authentically.</p>
            <div class="otp-box">
                <p>Your One-Time Password (OTP):</p>
                <p class="otp">%d</p>
                <p><strong>⏰ Important:</strong> This OTP will expire in 10 minutes for security purposes.</p>
            </div>
            <p>Get ready to start sharing your thoughts with the world!</p>
        </div>
        <div class="links">
            <a href="https://github.com/MIshraShardendu22" target="_blank">Visit the Creator - GitHub</a>
            <a href="https://www.linkedin.com/in/shardendumishra22/" target="_blank">Visit the Creator - LinkedIn</a>
        </div>
        <div class="footer">
            <p>With creativity and passion,<br>The Blog Team</p>
            <p>If you didn't request this email, please ignore it.</p>
        </div>
    </div>
</body>
</html>
	`, otp)

	body := []byte("Subject: Welcome to Our Blog Platform\nMIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n" + message)
	auth := smtp.PlainAuth("", from, pass, host)
	err := smtp.SendMail(host+":"+port, auth, from, []string{to}, body)
	if err != nil {
		fmt.Println("Error While Sending Mail:", err)
		os.Exit(1)
	}
	fmt.Println("Mail Sent Successfully")
}

func SendEmailFast(email string, otp int) {
	var wg sync.WaitGroup
	wg.Add(1)
	go MailSender(email, otp, &wg)
	wg.Wait()
}