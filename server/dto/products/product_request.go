package productsdto

type CreateProductRequest struct {
	Title string `json:"title" gorm:"type: varchar(255)"`
	Price int    `json:"price" gorm:"type: int"`
	Desc  string `json:"desc" gorm:"type: varchar(255)"`
	Stock int    `json:"stock" gorm:"type: int"`
	Image string `json:"image" gorm:"type: varchar(255)"`
}

type UpdateProductRequest struct {
	Title string `json:"title" gorm:"type: varchar(255)"`
	Price int    `json:"price" gorm:"type: int"`
	Desc  string `json:"desc" gorm:"type: varchar(255)"`
	Stock int    `json:"stock" gorm:"type: int"`
	Image string `json:"image" gorm:"type: varchar(255)"`
}
