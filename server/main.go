package main

import (
	"github.com/rahmanfadhil/gin-bookstore/controllers"
	"github.com/rahmanfadhil/gin-bookstore/models"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Connect to database
	models.ConnectDatabase()

	// Routes
	r.GET("/notes", controllers.FindNotes)
	r.GET("/notes/:id", controllers.FindNote)
	r.POST("/notes", controllers.CreateNote)
	// r.PATCH("/books/:id", controllers.UpdateBook)
	// r.DELETE("/books/:id", controllers.DeleteBook)

	// Run the server
	r.Run()
}
