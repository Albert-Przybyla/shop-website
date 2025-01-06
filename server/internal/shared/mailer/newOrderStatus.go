package mailer

import (
	"bytes"
	"html/template"
	"log"
	"net/smtp"
	"server/internal/shared/model"
)

type NewOrderStatusEmail struct {
	Name        string
	OrderNumber string
	OrderDate   string
	TotalAmount float64

	Title       string
	SubTitle    string
	Article1    string
	Article2    string
	TrackingUrl *string
}

func (m *Mailer) SendNewOrderStatusEmail(to string, status model.Status, data NewOrderStatusEmail) error {

	switch status {
	case "verified":
		data.Title = "Dziękujemy za złożenie zamowienia!"
		data.SubTitle = "Dziękujemy za złożenie zamówienia w naszym sklepie. Poniżej znajdują się szczegóły Twojego zamówienia:"
		data.Article1 = "Twoje zamówienie zostanie przetworzone po zaksięgowaniu wpłaty na konto bankowe o numerze 1234 1234 1234 1234 1234 z tytulem " + data.OrderNumber + "."
		data.Article2 = "W razie jakichkolwiek pytań zapraszamy do kontaktu z naszym zespołem wsparcia."
	case "paid":
		data.Title = "Dziękujemy za płatność!"
		data.SubTitle = "Dziękujemy za dokonanie płatności za Twoje zamówienie. Poniżej znajdują się szczegóły zamówienia:"
		data.Article1 = "Twoje zamówienie jest w trakcie realizacji i zostanie wkrótce wysłane. Otrzymasz powiadomienie z numerem przesyłki, gdy zamówienie zostanie wysłane."
		data.Article2 = "W razie jakichkolwiek pytań zapraszamy do kontaktu z naszym zespołem wsparcia."
	case "shipped":
		data.Title = "Twoje zamówienie zostało wysłane!"
		data.SubTitle = "Z przyjemnością informujemy, że Twoje zamówienie zostało wysłane. Poniżej znajdują się szczegóły przesyłki:"
		if data.TrackingUrl != nil {
			data.Article1 = `Możesz śledzić swoją przesyłkę pod adresem: ` + *data.TrackingUrl + ` .`
		}
		data.Article2 = "Jeśli masz jakiekolwiek pytania dotyczące przesyłki, skontaktuj się z naszym zespołem wsparcia."
	case "completed":
		data.Title = "Dziękujemy za zakup!"
		data.SubTitle = "Dziękujemy za zakup w naszym sklepie. Twoje zamówienie zostało zrealizowane."
		data.Article1 = "Jeśli masz jakiekolwiek pytania dotyczące swojego zamówienia, skontaktuj się z naszym zespołem wsparcia."
	case "cancelled":
		data.Title = "Twoje zamówienie zostało anulowane!"
		data.SubTitle = "Poniżej znajdują się szczegóły anulowanego zamówienia:"
		data.Article1 = "Jeśli zamówienie zostało opłacone, przelew zwrotny otrzymasz wkrótce na Twoje konto bankowe."
		data.Article2 = "Jeśli masz jakiekolwiek pytania dotyczące swojego zamówienia, skontaktuj się z naszym zespołem wsparcia."
	}

	const emailTemplate = `
		<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Dziękujemy za złożenie zamówienia</title>
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
      .order-details {
        margin: 20px 0;
        background-color: #f9f9f9;
        border: 1px solid #dddddd;
        border-radius: 4px;
        padding: 10px;
        text-align: left;
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
        <h1>{{.Title}}</h1>
      </div>
      <div class="body">
        <p>Witaj <strong>{{.Name}}</strong>,</p>
        <p>{{.SubTitle}}</p>
        <div class="order-details">
          <p><strong>Numer zamówienia:</strong> {{.OrderNumber}}</p>
          <p><strong>Data zamówienia:</strong> {{.OrderDate}}</p>
          <p><strong>Suma:</strong> {{.TotalAmount}} PLN</p>
        </div>
        <p>
          {{.Article1}}
        </p>
        <p>
          {{.Article2}}
        </p>
      </div>
      <div class="footer">
        <p>© 2025 BlueElephant</p>
      </div>
    </div>
  </body>
</html>
`

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
		"Subject: Zmiana statusu zamówienia\r\n" +
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
