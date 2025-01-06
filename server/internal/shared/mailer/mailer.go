package mailer

import (
	"server/internal/shared/config"
)

type Mailer struct {
	from     string
	password string
	smtpHost string
	smtpPort string
}

// New inicjalizuje mailera z domyślnymi ustawieniami
func New() *Mailer {
	return &Mailer{
		from:     config.AppConfig.SMTPUser,
		password: config.AppConfig.SMTPPassword,
		smtpHost: config.AppConfig.SMTPHost,
		smtpPort: config.AppConfig.SMTPPort,
	}
}
