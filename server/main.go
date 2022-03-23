package main

import (
	"notes-app/controller"
	"notes-app/database"
	"notes-app/middleware"
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
	jwtService = service.NewJWTService()
	noteController := controller.NewNoteController(noteService, jwtService)

	noteRoutes := r.Group("/api/notes/", middleware.AuthorizeJWT(jwtService))
	{
		noteRoutes.GET("/", noteController.FindNotes)
		// noteRoutes.GET("/:id", controller.FindNote)
		// noteRoutes.POST("/", controller.CreateNote)
		// noteRoutes.PATCH("/:id", controller.UpdateNote)
		// noteRoutes.DELETE("/:id", controller.DeleteNote)
	}

	// Run the server
	r.Run()
}
