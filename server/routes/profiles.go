package routes

import (
	"waysbean_fian/handlers"
	"waysbean_fian/pkg/middleware"
	"waysbean_fian/pkg/mysql"
	"waysbean_fian/repositories"

	"github.com/gorilla/mux"
)

func ProfileRoutes(r *mux.Router) {
	profileRepository := repositories.RepositoryProfile(mysql.DB)
	h := handlers.HandlerProfile(profileRepository)

	r.HandleFunc("/profiles", h.FindProfiles).Methods("GET")
	r.HandleFunc("/profile/{id}", h.GetProfile).Methods("GET")
	r.HandleFunc("/profile-update/{id}", middleware.Auth(middleware.UploadFile(h.UpdateProfile))).Methods("PATCH")
	r.HandleFunc("/profileimage/{id}", middleware.Auth(h.GetProfileImage)).Methods("GET")
	r.HandleFunc("/profile", middleware.Auth(middleware.UploadFile(h.CreateProfile))).Methods("POST")
}
