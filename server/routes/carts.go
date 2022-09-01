package routes

import (
	"waysbean_fian/handlers"
	"waysbean_fian/pkg/middleware"
	"waysbean_fian/pkg/mysql"
	"waysbean_fian/repositories"

	"github.com/gorilla/mux"
)

func CartRoutes(r *mux.Router) {
	cartRepository := repositories.RepositoryCart(mysql.DB)
	h := handlers.HandlerCart(cartRepository)

	r.HandleFunc("/carts", h.FindCarts).Methods("GET")
	r.HandleFunc("/carts-userid", middleware.Auth(h.FindCartsByUserID)).Methods("GET")
	r.HandleFunc("/cart/{id}", h.GetCart).Methods("GET")
	r.HandleFunc("/cart/{id}", h.UpdateCart).Methods("PATCH")
	r.HandleFunc("/cart", middleware.Auth(h.CreateCart)).Methods("POST")

}
