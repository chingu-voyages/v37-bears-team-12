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

	"github.com/google/uuid"
)

type NoteRepository interface {
	FindNotes(c *gin.Context, userID uuid.UUID, subject string) ([]*ent.Note, error)
	FindNoteByID(c *gin.Context, noteId uuid.UUID, userID uuid.UUID) (*ent.Note, error)
	CreateNote(c *gin.Context, input dto.CreateNoteInput, userID uuid.UUID) (*ent.Note, error)
	UpdateNote(c *gin.Context, input dto.UpdateNoteInput, noteID uuid.UUID, userID uuid.UUID) (*ent.Note, error)
	DeleteNote(c *gin.Context, noteID uuid.UUID, userID uuid.UUID) (string, error)
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

func isValidSubject(subject string) bool {
	switch subject {
	case "biology", "calculus", "history", "physics", "english":
		return true
	}

	return false
}

func (db *noteConnection) FindNotes(c *gin.Context, userID uuid.UUID, subject string) ([]*ent.Note, error) {
	fmt.Println("Getting note")
	fmt.Println(subject)

	if subject == "" {
		notes, err := db.connection.Note.Query().Where(note.UserID(userID)).All(c)

		if err != nil {
			log.Fatalf("Error occurred")
		}

		return notes, nil
	} else if isValidSubject(subject) {
		notes, err := db.connection.Note.Query().Where(note.And(
			note.UserID(userID),
			note.Subject(subject),
		)).All(c)

		if err != nil {
			log.Fatalf("Error occurred")
		}
		return notes, nil
	} else {
		return nil, fmt.Errorf("Invalid subject")
	}

}

func (db *noteConnection) FindNoteByID(c *gin.Context, noteID uuid.UUID, userID uuid.UUID) (*ent.Note, error) {
	fmt.Println("Getting note by ID")
	fmt.Println(noteID)

	note, err := db.connection.Note.Query().
		Where(note.ID(noteID)).
		First(context.Background())
	if err != nil {
		return nil, err
	} else {
		if note.UserID == userID {
			return note, nil
		} else {
			return nil, nil
		}
	}
}

func (db *noteConnection) CreateNote(c *gin.Context, input dto.CreateNoteInput, userID uuid.UUID) (*ent.Note, error) {

	if isValidSubject(input.Subject) {

		note, err := db.connection.Note.Create().
			SetID(uuid.New()).
			SetUserID(userID).
			SetTitle(input.Title).
			SetContent(input.Content).
			SetSubject(input.Subject).
			Save(c)

		return note, err
	} else {
		return nil, fmt.Errorf("Invalid subject")
	}
}

func (db *noteConnection) UpdateNote(c *gin.Context, input dto.UpdateNoteInput, noteID uuid.UUID, userID uuid.UUID) (*ent.Note, error) {

	fmt.Println("EDIT NOTE")
	foundNote, _ := db.connection.Note.Query().Where(note.ID(noteID)).First(context.Background())

	if foundNote.UserID == userID {
		if isValidSubject(input.Subject) {
			note, err := db.connection.Note.UpdateOneID(noteID).
				SetTitle(input.Title).
				SetContent(input.Content).
				SetSubject(input.Subject).
				SetUpdatedAt(time.Now()).
				Save(context.Background())

			return note, err
		} else {
			return nil, fmt.Errorf("Invalid subject")
		}

	} else {
		return foundNote, fmt.Errorf("You are not authorized to edit this note")
	}

}

func (db *noteConnection) DeleteNote(c *gin.Context, noteID uuid.UUID, userID uuid.UUID) (string, error) {

	fmt.Println("DELETE NOTE")
	foundNote, _ := db.connection.Note.Query().Where(note.ID(noteID)).First(context.Background())
	if foundNote.UserID == userID {
		db.connection.Note.DeleteOneID(noteID).Exec(c)

		return "Note deleted successfully", nil
	} else {
		return "You are not authorized to delete this note", fmt.Errorf("You are not authorized to delete this note")
	}

}
