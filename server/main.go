package main

import (
	"notes-app/controllers"
	"notes-app/database"
	"notes-app/middleware"
	_ "notes-app/service"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Connect to database
	database.ConnectDatabase()

	noteRoutes := r.Group("/notes/", middleware.AuthorizeJWT(jwtService))
	{
		noteRoutes.GET("/", controllers.FindNotes)
		noteRoutes.GET("/:id", controllers.FindNote)
		noteRoutes.POST("/", controllers.CreateNote)
		noteRoutes.PATCH("/:id", controllers.UpdateNote)
		noteRoutes.DELETE("/:id", controllers.DeleteNote)
	}

	// Run the server
	r.Run()
}
