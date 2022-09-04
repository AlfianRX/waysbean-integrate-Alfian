package repositories

import (
	"waysbean_fian/models"

	"gorm.io/gorm"
)

type CartRepository interface {
	FindCarts() ([]models.Cart, error)
	FindCartsByUserID(userID int) ([]models.Cart, error)
	GetCart(ID int) (models.Cart, error)
	CreateCart(models.Cart) (models.Cart, error)
	UpdateCart(models.Cart) (models.Cart, error)
	UpdateeCart(Cart models.Cart) (models.Cart, error)
	DeleteCart(Cart models.Cart) (models.Cart, error)
}

func RepositoryCart(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindCarts() ([]models.Cart, error) {
	var carts []models.Cart
	err := r.db.Preload("Product").Find(&carts).Error

	return carts, err
}

func (r *repository) FindCartsByUserID(userID int) ([]models.Cart, error) {
	var carts []models.Cart
	err := r.db.Preload("Product").Find(&carts, "user_id = ?", userID).Error

	return carts, err
}

func (r *repository) GetCart(ID int) (models.Cart, error) {
	var cart models.Cart

	err := r.db.Preload("Product").First(&cart, ID).Error

	return cart, err
}

func (r *repository) CreateCart(cart models.Cart) (models.Cart, error) {
	err := r.db.Create(&cart).Error

	return cart, err
}

func (r *repository) UpdateCart(cart models.Cart) (models.Cart, error) {
	err := r.db.Save(&cart).Error

	return cart, err
}

func (r *repository) UpdateeCart(cart models.Cart) (models.Cart, error) {
	err := r.db.Save(&cart).Error

	return cart, err
}

func (r *repository) DeleteCart(cart models.Cart) (models.Cart, error) {
	err := r.db.Delete(&cart).Error

	return cart, err
}
