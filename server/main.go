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

	// Run the server
	r.Run()
}
