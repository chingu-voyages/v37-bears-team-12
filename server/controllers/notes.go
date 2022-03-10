package controllers

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"notes-app/database"
	"notes-app/ent/note"

	"strconv"

	"github.com/gin-gonic/gin"
)

type CreateNoteInput struct {
	Title   string `json:"title" binding:"required"`
	Content string `json:"content" binding:"required"`
}

type UpdateNoteInput struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

// GET /notes
// Find all notes
func FindNotes(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")

	log.Println(authHeader)
	log.Println("we are here")

	//token, err := service.JWTService.ValidateToken(authHeader)
	//log.Println(token.Claims.(jwt.MapClaims)["sub"])

	items, err := database.CLIENT.Note.Query().All(c)

	if err != nil {
		log.Fatalf("Error occurred")
	}

	c.JSON(http.StatusOK, gin.H{"data": items})
}

// GET /notes/:id
// Find a note
func FindNote(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid param"})
	}

	note, _ := database.CLIENT.Note.Query().
		Where(note.ID(id)).
		First(context.Background())

	c.JSON(http.StatusOK, gin.H{"data": note})
}

// POST /notes
// Create new note
func CreateNote(c *gin.Context) {
	var input CreateNoteInput

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

// PATCH /notes/:id
// Update a note
func UpdateNote(c *gin.Context) {
	id, paramErr := strconv.Atoi(c.Param("id"))

	if paramErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid param"})
	}

	var input CreateNoteInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	note, _ := database.CLIENT.Note.Update().
		SetTitle(input.Title).
		SetContent(input.Content).
		Where(note.ID(id)).
		Save(context.Background())

	c.JSON(http.StatusOK, gin.H{"data": note})
}

// DELETE /notes/:id
// Delete a note
func DeleteNote(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"data": true})
}
