package repository

import (
	"context"
	"fmt"
	"log"
	"notes-app/dto"
	"notes-app/ent"
	"notes-app/ent/note"
	"reflect"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/google/uuid"
)

type NoteRepository interface {
	FindNotes(c *gin.Context, userID uuid.UUID, subject string) []*ent.Note
	FindNoteByID(c *gin.Context, noteId uuid.UUID, userID uuid.UUID) *ent.Note
	CreateNote(c *gin.Context, input dto.CreateNoteInput, userID uuid.UUID) (*ent.Note, error)
	UpdateNote(c *gin.Context, input dto.UpdateNoteInput, noteID uuid.UUID, userID uuid.UUID) (*ent.Note, error)
	DeleteNote(c *gin.Context, noteID uuid.UUID, userID uuid.UUID) string
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

func (db *noteConnection) FindNotes(c *gin.Context, userID uuid.UUID, subject string) []*ent.Note {
	fmt.Println("Getting note")
	fmt.Println(subject)

	if subject == "" {
		notes, err := db.connection.Note.Query().Where(note.UserID(userID)).All(c)

		if err != nil {
			log.Fatalf("Error occurred")
		}

		return notes
	} else {
		notes, err := db.connection.Note.Query().Where(note.And(
			note.UserID(userID),
			note.Subject(subject),
		)).All(c)

		if err != nil {
			log.Fatalf("Error occurred")
		}

		return notes
	}
}

func (db *noteConnection) FindNoteByID(c *gin.Context, noteID uuid.UUID, userID uuid.UUID) *ent.Note {
	note, _ := db.connection.Note.Query().
		Where(note.ID(noteID)).
		First(context.Background())

	return note
}

func (db *noteConnection) CreateNote(c *gin.Context, input dto.CreateNoteInput, userID uuid.UUID) (*ent.Note, error) {
	note, err := db.connection.Note.Create().
		SetID(uuid.New()).
		SetUserID(userID).
		SetTitle(input.Title).
		SetContent(input.Content).
		SetSubject(input.Subject).
		Save(c)

	return note, err
}

func (db *noteConnection) UpdateNote(c *gin.Context, input dto.UpdateNoteInput, noteID uuid.UUID, userID uuid.UUID) (*ent.Note, error) {
	note, err := db.connection.Note.UpdateOneID(noteID).
		SetTitle(input.Title).
		SetContent(input.Content).
		SetSubject(input.Subject).
		SetUpdatedAt(time.Now()).
		Save(context.Background())

	return note, err
}

func (db *noteConnection) DeleteNote(c *gin.Context, noteID uuid.UUID, userID uuid.UUID) string {
	note := db.connection.Note.DeleteOneID(noteID).Exec(c)

	if reflect.TypeOf(note) == nil {
		return fmt.Sprintf("%v", note)
	}

	result := fmt.Sprintf("%v", note.Error())

	return result
}
