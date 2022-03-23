package controller

import (
	"net/http"
	"notes-app/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

type NoteController interface {
	FindNotes(c *gin.Context)
	FindNoteByID(c *gin.Context)
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
func (controller *noteController) FindNotes(c *gin.Context) {
	notes := controller.noteService.FindNotes(c)

	c.JSON(http.StatusOK, gin.H{"data": notes})
}

func (controller *noteController) FindNoteByID(c *gin.Context) {
	noteID, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid param"})
	}

	note := controller.noteService.FindNoteByID(c, noteID)

	c.JSON(http.StatusOK, gin.H{"data": note})
}

func (controller *noteController) CreateNote(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{"data": ""})
}

func (controller *noteController) UpdateNote(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{"data": ""})
}
