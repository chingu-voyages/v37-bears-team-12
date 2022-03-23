package main

import (
	"notes-app/controller"
	"notes-app/database"
	"notes-app/ent"
	"notes-app/middleware"
	"notes-app/repository"
	"notes-app/service"

	"github.com/gin-gonic/gin"
)

var (
	db *ent.Client = database.ConnectDatabase()

	noteRepository repository.NoteRepository = repository.NewNoteRepository(db)
	jwtService     service.JWTService        = service.NewJWTService()

	noteService service.NoteService = service.NewNoteService(noteRepository)

	noteController controller.NoteController = controller.NewNoteController(noteService, jwtService)
)

func main() {

	r := gin.Default()

	// Connect to database
	database.ConnectDatabase()

	noteRoutes := r.Group("/notes/", middleware.AuthorizeJWT(jwtService))
	{
		noteRoutes.GET("/", noteController.FindNotes)
		noteRoutes.GET("/:id", noteController.FindNoteByID)
		noteRoutes.POST("/", noteController.CreateNote)
		noteRoutes.PUT("/:id", noteController.UpdateNote)
		noteRoutes.DELETE("/:id", noteController.DeleteNote)
	}

	// Run the server
	r.Run()
}
