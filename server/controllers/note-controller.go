package controllers

import (
	"fmt"
	"log"
	"net/http"
	"notes-app/database"
	"notes-app/dto"
	"notes-app/ent"
	"notes-app/helper"
	"notes-app/service"

	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

type NoteController interface {
	CreateNote(c *gin.Context)
	UpdateNote(c *gin.Context)
	DeleteNote(c *gin.Context)
	FindNotes(c *gin.Context)
	FindNote(c *gin.Context)
}

type noteController struct {
	noteService service.NoteService
	jwtService  service.JWTService
}

// POST /notes
// Create new note
func (controller *noteController) CreateNote(c *gin.Context) {
	var input dto.CreateNoteInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Print(input)

	// Create note
	note, err := database.CLIENT.Note.
		Create().
		SetTitle(input.Title).
		SetContent(input.Content).
		Save(c)

	if err != nil {
		log.Fatalf("Failed creating a note: %v", err)
	}

	c.JSON(http.StatusOK, gin.H{"data": note})
}

// GET /notes
// Find all notes
func (controller *noteController) FindNotes(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")

	log.Println(authHeader)
	log.Println("we are here")

	//token, err := service.JWTService.ValidateToken(authHeader)
	//log.Println(token.Claims.(jwt.MapClaims)["sub"])

}

// GET /notes/:id
// Find a note
func (controller *noteController) FindNote(c *gin.Context) {

}

// PATCH /notes/:id
// Update a note
func (controller *noteController) UpdateNote(c *gin.Context) {

	var note ent.Note
	id, err := strconv.ParseUint(c.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("Failed tou get id", "No param id were found", helper.EmptyObj{})
		c.JSON(http.StatusBadRequest, response)
	}
	note.ID = id
	authHeader := c.GetHeader("Authorization")
	token, errToken := controller.jwtService.ValidateToken(authHeader)
	if errToken != nil {
		panic(errToken.Error())
	}
	claims := token.Claims.(jwt.MapClaims)
	userID := fmt.Sprintf("%v", claims["sub"])
	if controller.noteService.IsAllowedToEdit(userID, note.ID) {
		controller.noteService.UpdateNote(note)
		res := helper.BuildResponse(true, "Deleted", helper.EmptyObj{})
		c.JSON(http.StatusOK, res)
	} else {
		response := helper.BuildErrorResponse("You dont have permission", "You are not the owner", helper.EmptyObj{})
		c.JSON(http.StatusForbidden, response)
	}
	c.JSON(http.StatusOK, gin.H{"data": true})
}

// DELETE /notes/:id
// Delete a note
func (controller *noteController) DeleteNote(c *gin.Context) {
	var note ent.Note

	id, err := strconv.ParseUint(c.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("Failed tou get id", "No param id were found", helper.EmptyObj{})
		c.JSON(http.StatusBadRequest, response)
	}
	note.ID = id
	authHeader := c.GetHeader("Authorization")
	token, errToken := controller.jwtService.ValidateToken(authHeader)
	if errToken != nil {
		panic(errToken.Error())
	}
	claims := token.Claims.(jwt.MapClaims)
	userID := fmt.Sprintf("%v", claims["sub"])
	if controller.noteService.IsAllowedToEdit(userID, note.ID) {
		controller.noteService.DeleteNote(note)
		res := helper.BuildResponse(true, "Deleted", helper.EmptyObj{})
		c.JSON(http.StatusOK, res)
	} else {
		response := helper.BuildErrorResponse("You dont have permission", "You are not the owner", helper.EmptyObj{})
		c.JSON(http.StatusForbidden, response)
	}
	c.JSON(http.StatusOK, gin.H{"data": true})
}

func (controller *noteController) IsAllowedToEdit(userID string, noteID uint64) bool {

	// authHeader := c.GetHeader("Authorization")

	// log.Println(authHeader)
	// log.Println("we are here")

	// token, err := service.JWTService.ValidateToken(authHeader)

	// id := token.Claims.(jwt.MapClaims)["sub"]
	// log.Println(id)

	b := service.noteRepository.FindNote(noteID)
	id := fmt.Sprintf("%v", b.UserID)

	return userID == id

}
