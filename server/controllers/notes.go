package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rahmanfadhil/gin-bookstore/models"
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
	var notes []models.Note
	models.DB.Find(&notes)

	c.JSON(http.StatusOK, gin.H{"data": notes})
}

// GET /notes/:id
// Find a note
func FindNote(c *gin.Context) {
	// Get model if exist
	var note models.Note
	if err := models.DB.Where("id = ?", c.Param("id")).First(&note).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": note})
}

// POST /notes
// Create new note
func CreateNote(c *gin.Context) {
	// Validate input
	var input CreateNoteInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create note
	note := models.Note{Title: input.Title, Content: input.Content, UserID: input.UserID}
	models.DB.Create(&note)

	c.JSON(http.StatusOK, gin.H{"data": note})
}

// PATCH /notes/:id
// Update a note
func UpdateNote(c *gin.Context) {
	// Get model if exist
	var note models.Note
	if err := models.DB.Where("id = ?", c.Param("id")).First(&note).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// Validate input
	var input UpdateNoteInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	models.DB.Model(&note).Updates(models.Note{Title: input.Title, Content: input.Content})

	// ERROR: Note is updated in DB but not returning data in response which leads to infinite response time for some reason
	c.JSON(http.StatusOK, gin.H{"data": note})
}
