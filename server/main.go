package main

import (
	"notes-app/database"
	"notes-app/repository"
	"notes-app/service"

	"github.com/gin-gonic/gin"
)

var jwtService service.JWTService = service.NewJWTService()

func main() {
	r := gin.Default()

	// Connect to database
	db := database.ConnectDatabase()

	noteRepository := repository.NewNoteRepository(db)
	noteService := service.NewNoteService(noteRepository)

	// noteRoutes := r.Group("/notes/", middleware.AuthorizeJWT(jwtService))
	// {
	// 	noteRoutes.GET("/", controller.FindNotes)
	// 	noteRoutes.GET("/:id", controller.FindNote)
	// 	noteRoutes.POST("/", controller.CreateNote)
	// 	noteRoutes.PATCH("/:id", controller.UpdateNote)
	// 	noteRoutes.DELETE("/:id", controller.DeleteNote)
	// }

	// Run the server
	r.Run()
}
