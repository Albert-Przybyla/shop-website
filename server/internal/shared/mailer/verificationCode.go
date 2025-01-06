package mailer

import (
	"bytes"
	"html/template"
	"log"
	"net/smtp"
)

type VerificationEmail struct {
	Name string
	Code string
}

func (m *Mailer) SendVerificationCode(to string, data VerificationEmail) error {
	const emailTemplate = `
		<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Kod weryfikacyjny do zalogowania</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        color: #333333;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        padding: 20px;
      }
      .header {
        background-color: #5271ff;
        color: #ffffff;
        text-align: center;
        padding: 10px 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .body {
        padding: 20px;
        text-align: center;
      }
      .body p {
        font-size: 16px;
        line-height: 1.5;
      }
      .code {
        display: inline-block;
        background-color: #f9f9f9;
        border: 1px solid #dddddd;
        padding: 10px 20px;
        margin: 20px 0;
        font-size: 20px;
        font-weight: bold;
        color: #333333;
        border-radius: 4px;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #888888;
        padding-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Kod weryfikacyjny</h1>
      </div>
      <div class="body">
        <p>Witaj <strong>{{.Name}}</strong>,</p>
        <p>Twój kod weryfikacyjny to:</p>
        <div class="code">{{.Code}}</div>
        <p>Jeśli nie prosiłeś(-aś) o ten kod, po prostu zignoruj tę wiadomość.</p>
      </div>
      <div class="footer">
        <p>© 2025 BlueElephant</p>
      </div>
    </div>
  </body>
</html>`

	tmpl, err := template.New("email").Parse(emailTemplate)
	if err != nil {
		return err
	}

	var body bytes.Buffer
	err = tmpl.Execute(&body, data)
	if err != nil {
		return err
	}

	message := []byte("To: " + to + "\r\n" +
		"Subject: Kod weryfikacyjny\r\n" +
		"Content-Type: text/html; charset=UTF-8\r\n" +
		"\r\n" + body.String())

	auth := smtp.PlainAuth("", m.from, m.password, m.smtpHost)
	err = smtp.SendMail(m.smtpHost+":"+m.smtpPort, auth, m.from, []string{to}, message)
	if err != nil {
		return err
	}

	log.Printf("Email sent to %s", to)
	return nil
}
