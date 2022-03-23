package controller

import (
	"fmt"
	"net/http"
	"notes-app/dto"
	"notes-app/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

type NoteController interface {
	FindNotes(c *gin.Context)
	FindNoteByID(c *gin.Context)
	CreateNote(c *gin.Context)
	UpdateNote(c *gin.Context)
	DeleteNote(c *gin.Context)
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
	var input dto.CreateNoteInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Print(input)

	note, err := controller.noteService.CreateNote(c, input)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		c.JSON(http.StatusCreated, gin.H{"data": note})
	}
}

func (controller *noteController) UpdateNote(c *gin.Context) {

	noteID, paramErr := strconv.Atoi(c.Param("id"))

	if paramErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid param"})
	}

	var input dto.UpdateNoteInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	note, err := controller.noteService.UpdateNote(c, noteID, input)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": note})
	}
}

func (controller *noteController) DeleteNote(c *gin.Context) {

	noteID, paramErr := strconv.Atoi(c.Param("id"))

	if paramErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid param"})
	}

	result := controller.noteService.DeleteNote(c, noteID)

	if result == "<nil>" {
		c.JSON(http.StatusOK, gin.H{"data": "Note deleted successfully!"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": "Note not found"})
	}
}
