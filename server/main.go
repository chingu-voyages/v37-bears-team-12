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
	db         *ent.Client        = database.ConnectDatabase()
	jwtService service.JWTService = service.NewJWTService()

	noteController controller.NoteController = controller.NewNoteController(noteService, jwtService)
	noteService    service.NoteService       = service.NewNoteService(noteRepository)
	noteRepository repository.NoteRepository = repository.NewNoteRepository(db)
)

func main() {

	r := gin.Default()

	r.Use(middleware.CORSMiddleware())
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
