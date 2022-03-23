package repository

import (
	"context"
	"fmt"
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
	CreateNote(c *gin.Context, input dto.CreateNoteInput) (*ent.Note, error)
	UpdateNote(c *gin.Context, noteID int, input dto.UpdateNoteInput) (*ent.Note, error)
	DeleteNote(c *gin.Context, noteID int) string
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

func (db *noteConnection) CreateNote(c *gin.Context, input dto.CreateNoteInput) (*ent.Note, error) {
	note, err := db.connection.Note.Create().
		SetTitle(input.Title).
		SetContent(input.Content).
		Save(c)

	return note, err
}

func (db *noteConnection) UpdateNote(c *gin.Context, noteID int, input dto.UpdateNoteInput) (*ent.Note, error) {
	note, err := db.connection.Note.UpdateOneID(noteID).
		SetTitle(input.Title).
		SetContent(input.Content).
		SetSubject(input.Subject).
		SetUpdatedAt(time.Now()).
		Save(context.Background())

	return note, err
}

func (db *noteConnection) DeleteNote(c *gin.Context, noteID int) string {

	note := db.connection.Note.DeleteOneID(noteID).Exec(c)
	result := fmt.Sprintf("%v", note)

	return result
}
