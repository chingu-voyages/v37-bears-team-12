package database

import (
	"context"
	"fmt"
	"log"
	"notes-app/ent"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var CLIENT *ent.Client

func ConnectDatabase() *ent.Client {
	godotenv.Load()
	DB_CONNECTION_STRING := os.Getenv("DB_CONNECTION_STRING")
	fmt.Println(DB_CONNECTION_STRING)
	// Init PostgreSQL
	client, err := ent.Open("postgres", DB_CONNECTION_STRING)

	if err != nil {
		panic(err)
	}

	// Run the auto migration tool.
	if err := client.Schema.Create(context.Background()); err != nil {
		log.Panicf("failed creating schema resources: %v", err)
	}

	return client
}
