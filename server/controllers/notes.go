package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rahmanfadhil/gin-bookstore/models"
)

type CreateBookInput struct {
	Title  string `json:"title" binding:"required"`
	Author string `json:"author" binding:"required"`
}

type UpdateBookInput struct {
	Title  string `json:"title"`
	Author string `json:"author"`
}

// GET /notes
// Find all notes
func FindNotes(c *gin.Context) {
	var notes []models.Note
	models.DB.Find(&notes)

	c.JSON(http.StatusOK, gin.H{"data": notes})
}
