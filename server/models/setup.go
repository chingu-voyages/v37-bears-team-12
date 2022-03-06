package models

import (
	"context"
	"fmt"
	"log"
	"os"

	"entgo.io/ent/examples/fs/ent"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var CLIENT *ent.Client

func ConnectDatabase() {
	godotenv.Load()
	DB_CONNECTION_STRING := os.Getenv("DB_CONNECTION_STRING")
	fmt.Println(DB_CONNECTION_STRING)
	// Init PostgreSQL
	client, err := ent.Open("postgres", DB_CONNECTION_STRING)

	if err != nil {
		log.Fatal(err)
		return
	}

	CLIENT = client

	// Run the auto migration tool
	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("Failed when creating schema resources: %v", err)
	}
}
