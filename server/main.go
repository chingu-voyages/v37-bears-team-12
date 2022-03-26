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

	r.GET("/notes", middleware.AuthorizeJWT(jwtService), noteController.FindNotes)
	r.GET("/notes/:id", middleware.AuthorizeJWT(jwtService), noteController.FindNoteByID)
	r.POST("/notes", middleware.AuthorizeJWT(jwtService), noteController.CreateNote)
	r.PUT("/notes/:id", middleware.AuthorizeJWT(jwtService), noteController.UpdateNote)
	r.DELETE("/notes/:id", middleware.AuthorizeJWT(jwtService), noteController.DeleteNote)

	// Run the server
	r.Run()
}
