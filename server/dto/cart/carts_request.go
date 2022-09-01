package cartsdto

type CreateCartRequest struct {
	Qty       int `json:"qty" gorm:"type: int"`
	SubTotal  int `json:"subtotal" validate:"required"`
	ProductID int `json:"product_id" form:"product_id" validate:"required"`
}

type UpdateCartRequest struct {
	TransactionID int `json:"transaction_id"`
}
