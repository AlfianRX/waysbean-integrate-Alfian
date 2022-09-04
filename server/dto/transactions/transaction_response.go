package transactiondto

type TransactionResponse struct {
	ID     int64  `json:"id"`
	Total  int    `json:"total"`
	Status string `json:"status"`
	UserID int    `json:"user_id"`
}
