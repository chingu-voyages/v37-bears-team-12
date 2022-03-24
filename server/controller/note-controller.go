package controller

import (
	"fmt"
	"log"
	"net/http"
	"notes-app/dto"
	"notes-app/service"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type NoteController interface {
	FindNotes(c *gin.Context)
	FindNoteByID(c *gin.Context)
	CreateNote(c *gin.Context)
	UpdateNote(c *gin.Context)
	DeleteNote(c *gin.Context)
	getUserIDByToken(token string) string
}

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
	authHeader := c.GetHeader("Authorization")
	subject, _ := c.GetQuery("subject")

	userID, paramErr := uuid.Parse(controller.getUserIDByToken(authHeader))
	if paramErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid param"})
	}

	notes := controller.noteService.FindNotes(c, userID, subject)

	c.JSON(http.StatusOK, gin.H{"data": notes})
}

func (controller *noteController) FindNoteByID(c *gin.Context) {
	noteID, err := uuid.Parse(c.Param("id"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid param"})
	}

	authHeader := c.GetHeader("Authorization")

	userID, paramErr := uuid.Parse(controller.getUserIDByToken(authHeader))
	if paramErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid param"})
	}

	note := controller.noteService.FindNoteByID(c, noteID, userID)

	c.JSON(http.StatusOK, gin.H{"data": note})
}

func (controller *noteController) CreateNote(c *gin.Context) {
	var input dto.CreateNoteInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	authHeader := c.GetHeader("Authorization")

	userID, paramErr := uuid.Parse(controller.getUserIDByToken(authHeader))
	if paramErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid param"})
	}

	note, err := controller.noteService.CreateNote(c, input, userID)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		c.JSON(http.StatusCreated, gin.H{"data": note})
	}
}

func (controller *noteController) UpdateNote(c *gin.Context) {

	// get noteID
	noteID, paramErr := uuid.Parse(c.Param("id"))

	if paramErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid param"})
	}

	var input dto.UpdateNoteInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//get userID
	authHeader := c.GetHeader("Authorization")

	userID, paramErr := uuid.Parse(controller.getUserIDByToken(authHeader))
	if paramErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid param"})
	}

	note, err := controller.noteService.UpdateNote(c, input, noteID, userID)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": note})
	}
}

func (controller *noteController) DeleteNote(c *gin.Context) {

	noteID, paramErr := uuid.Parse(c.Param("id"))

	if paramErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid param"})
	}

	authHeader := c.GetHeader("Authorization")

	userID, paramErr := uuid.Parse(controller.getUserIDByToken(authHeader))
	if paramErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid param"})
	}

	result := controller.noteService.DeleteNote(c, noteID, userID)

	if result == "<nil>" {
		c.JSON(http.StatusOK, gin.H{"data": "Note deleted successfully!"})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": "Note not found"})
	}
}

func (controller *noteController) getUserIDByToken(token string) string {
	aToken, err := controller.jwtService.ValidateToken(token)
	if err != nil {
		panic(err.Error())
	}
	claims := aToken.Claims.(jwt.MapClaims)
	id := fmt.Sprintf("%v", claims["sub"])
	log.Println(id)
	return id
}
