package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type CreateNoteInput struct {
	Title   string `json:"title" binding:"required"`
	Content string `json:"content" binding:"required"`
	UserID  int8   `json:"user_id" binding:"required"`
}

type UpdateNoteInput struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

// GET /notes
// Find all notes
func FindNotes(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"data": true})
}

// GET /notes/:id
// Find a note
func FindNote(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"data": true})
}

// POST /notes
// Create new note
func CreateNote(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"data": true})
}

// PATCH /notes/:id
// Update a note
func UpdateNote(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"data": true})
}

// DELETE /notes/:id
// Delete a note
func DeleteNote(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"data": true})
}
