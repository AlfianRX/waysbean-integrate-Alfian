package cartsdto

type CreateCartRequest struct {
	Qty       int `json:"qty" gorm:"type: int"`
	SubTotal  int `json:"subtotal" validate:"required"`
	ProductID int `json:"product_id" form:"product_id" validate:"required"`
}

type UpdateCart struct {
	ID       int    `json:"id"`
	Qty      int    `json:"qty"`
	SubTotal int    `json:"subtotal"`
	Status   string `jsom:"status"`
}

type UpdateCartRequest struct {
	TransactionID int `json:"transaction_id"`
}
