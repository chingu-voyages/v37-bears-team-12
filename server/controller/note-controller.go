package controller

import (
	"net/http"
	"notes-app/service"

	"github.com/gin-gonic/gin"
)

type NoteController interface {
	FindNotes(c *gin.Context)
}

// type NoteController interface {
// CreateNote(c *gin.Context)
// UpdateNote(c *gin.Context)
// DeleteNote(c *gin.Context)
// FindNotes(c *gin.Context)
// FindNote(c *gin.Context)
// }

type noteController struct {
	noteService service.NoteService
	jwtService  service.JWTService
}

func NewNoteController(noteService service.NoteService, jwtService service.JWTService) NoteController {
	return &noteController{
		noteService: noteService,
		jwtService:  jwtService,
	}
}

// GET /notes
// Find all notes
func (controller *noteController) FindNotes(context *gin.Context) {
	// notes, err := controller.noteService.FindNotes(context)
	notes := controller.noteService.FindNotes(context)

	context.JSON(http.StatusOK, gin.H{"data": notes})
}
