package database

import (
	"fmt"
	"waysbean_fian/models"
	"waysbean_fian/pkg/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.Cart{},
		&models.Product{},
		&models.Profile{},
		&models.User{},
		&models.Transaction{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")

}
