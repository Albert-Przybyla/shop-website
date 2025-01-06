package database

import (
	"fmt"
	"log"
	model "server/internal/shared/model"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func (p *Postgres) CreateAdmin(req *model.CreateAdmin) (*model.CreateElementResponse, error) {
	userExists, err := p.adminExists(req.Email)
	if err != nil {
		return nil, err
	}

	if userExists {
		return nil, fmt.Errorf("admin with email %s already exists", req.Email)
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %v", err)
	}

	admin := model.Admin{
		Email:     req.Email,
		Password:  string(hashedPassword),
		FirstName: req.FirstName,
		LastName:  req.LastName,
	}
	res := p.db.Create(&admin)

	if res.Error != nil {
		return nil, res.Error
	}

	return &model.CreateElementResponse{
		Id: admin.Id,
	}, nil
}

func (p *Postgres) adminExists(email string) (bool, error) {
	var admin model.Admin
	res := p.db.Model(&model.Admin{}).Where("email = ?", email).First(&admin)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return false, nil
		}
		return false, res.Error
	}

	return true, nil
}

func (p *Postgres) GetAdminByEmail(email string) (*model.Admin, error) {
	var user model.Admin
	res := p.db.Model(&model.Admin{}).Where("email = ?", email).First(&user)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return nil, res.Error
		}
		return nil, res.Error
	}
	return &user, nil
}

func (s *Postgres) createDefaultAdmin() error {
	var count int64
	err := s.db.Model(&model.Admin{}).Count(&count).Error
	if err != nil {
		return err
	}

	if count == 0 {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte("password123"), bcrypt.DefaultCost)
		if err != nil {
			return fmt.Errorf("failed to hash password: %v", err)
		}
		defaultAdmin := model.Admin{
			Email:     "admin@admin.pl",
			Password:  string(hashedPassword),
			FirstName: "Admin",
			LastName:  "Admin",
		}

		if err := s.db.Create(&defaultAdmin).Error; err != nil {
			return err
		}
		log.Println("Default admin created successfully.")
	} else {
		log.Println("Admin already exists.")
	}

	return nil
}

func (p *Postgres) GetAdminById(id string) (*model.Admin, error) {
	var admin model.Admin
	res := p.db.Model(&model.Admin{}).Where("id = ?", id).First(&admin)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return nil, res.Error
		}
		return nil, res.Error
	}
	return &admin, nil
}

func (p *Postgres) GetAdmins() ([]model.Admin, error) {
	var admins []model.Admin
	res := p.db.Find(&admins)
	if res.Error != nil {
		return nil, res.Error
	}
	return admins, nil
}
