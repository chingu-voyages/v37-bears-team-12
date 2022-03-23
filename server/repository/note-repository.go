package repository

import (
	"context"
	"log"
	"notes-app/dto"
	"notes-app/ent"
	"notes-app/ent/note"
	"time"

	"github.com/gin-gonic/gin"
)

type NoteRepository interface {
	FindNotes(c *gin.Context) []*ent.Note
	FindNoteByID(c *gin.Context, noteId int) *ent.Note
	CreateNote(c *gin.Context, input dto.CreateNoteInput) *ent.Note
	UpdateNote(c *gin.Context, noteID int, input dto.UpdateNoteInput) *ent.Note
}

type noteConnection struct {
	connection *ent.Client
}

//NewNoteRepository creates an instance NoteRepository
func NewNoteRepository(dbConn *ent.Client) NoteRepository {
	return &noteConnection{
		connection: dbConn,
	}
}

func (db *noteConnection) FindNotes(c *gin.Context) []*ent.Note {
	notes, err := db.connection.Note.Query().All(c)

	if err != nil {
		log.Fatalf("Error occurred")
	}

	return notes
}

func (db *noteConnection) FindNoteByID(c *gin.Context, NoteID int) *ent.Note {
	note, _ := db.connection.Note.Query().
		Where(note.ID(NoteID)).
		First(context.Background())

	return note
}

func (db *noteConnection) CreateNote(c *gin.Context, input dto.CreateNoteInput) *ent.Note {
	note, err := db.connection.Note.Create().
		SetTitle(input.Title).
		SetContent(input.Content).
		Save(c)

	if err != nil {
		log.Fatalf("Failed creating a note: %v", err)
	}

	return note
}

func (db *noteConnection) UpdateNote(c *gin.Context, noteID int, input dto.UpdateNoteInput) *ent.Note {
	note, err := db.connection.Note.UpdateOneID(noteID).
		SetTitle(input.Title).
		SetContent(input.Content).
		SetSubject(input.Subject).
		SetUpdatedAt(time.Now()).
		Save(context.Background())

	print(note)
	print("HELLO WORLD")

	if err != nil {
		log.Fatalf("Failed updating a note: %v", err)
	}

	return note
}

// func DeleteNote(noteID int) string {

// 	note := database.CLIENT.Note.DeleteOneID(noteID).Exec(c)
// 	result := fmt.Sprintf("%v", note)

// 	return result
// }
