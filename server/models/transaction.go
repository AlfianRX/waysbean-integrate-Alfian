package models

import (
	"time"
)

type Transaction struct {
	ID        int64     `json:"id"`
	UserID    int       `json:"user_id"`
	User      User      `json:"user"`
	Status    string    `json:"status"`
	Total     int       `json:"total"`
	CartID    []int     `json:"cart_id" gorm:"-"`
	Cart      []Cart    `json:"product" gorm:"many2many:transaction_cart;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	CreatedAt time.Time `json:"created_at" gorm:"-"`
	UpdatedAt time.Time `json:"updated_at" gorm:"-"`
}

type TransactionCartRel struct {
	ID     int64 `json:"id"`
	UserId int   `json:"user_id"`
	Amount int   `json:"amount"`
}

type TransactionUserRel struct {
	ID     int64 `json:"id"`
	UserId int   `json:"user_id"`
}

func (TransactionCartRel) TableName() string {
	return "transactions"
}
func (TransactionUserRel) TableName() string {
	return "transactions"
}
