package api

import "errors"

var (
	ErrShowOnPageCodeExists = errors.New("error: show on page code already exists")
	ErrCodeNotFound         = errors.New("Podany kod nie istnieje.")
	ErrCodeUsed             = errors.New("Podany kod został już wyczerpany.")
	ErrCodeExpired          = errors.New("Podany kod wygasł.")
)
