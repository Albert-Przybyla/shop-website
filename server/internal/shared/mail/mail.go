package api

import (
	"fmt"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

// Funkcja pomocnicza do wysyłania e-maila przez SendGrid
func sendEmailWithSendGrid(to, subject, body string) error {
	from := mail.NewEmail("Your Name", "your-email@example.com")
	toEmail := mail.NewEmail("Recipient", to)
	message := mail.NewSingleEmail(from, subject, toEmail, body, body)

	client := sendgrid.NewSendClient("your-sendgrid-api-key")
	response, err := client.Send(message)
	if err != nil {
		return err
	}
	if response.StatusCode != 202 {
		return fmt.Errorf("failed to send email, status code: %d", response.StatusCode)
	}
	return nil
}
