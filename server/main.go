package main

import (
	"notes-app/controllers"
	"notes-app/database"
	"notes-app/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Connect to database
	database.ConnectDatabase()

	// Routes
	r.GET("/notes", middleware.AuthorizeJWT(controllers.FindNotes))
	r.GET("/notes/:id", middleware.AuthorizeJWT(controllers.FindNote))
	r.POST("/notes", middleware.AuthorizeJWT(controllers.CreateNote))
	r.PATCH("/notes/:id", middleware.AuthorizeJWT(controllers.UpdateNote))
	r.DELETE("/notes/:id", middleware.AuthorizeJWT(controllers.DeleteNote))

	// Run the server
	r.Run()
}
