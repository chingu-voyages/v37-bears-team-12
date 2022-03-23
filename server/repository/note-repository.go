package repository

import (
	"context"
	"log"
	"notes-app/dto"
	"notes-app/ent"
	"notes-app/ent/note"
	"notes-app/entity/model"

	"github.com/gin-gonic/gin"
)

type NoteRepository interface {
	FindNotes(c *gin.Context) []*ent.Note
	FindNoteByID(c *gin.Context, noteId int) *ent.Note
	CreateNote(c *gin.Context, input dto.CreateNoteInput) *ent.Note
	UpdateNote(c *gin.Context, n model.Note) string
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
	// var Notes []entity.Note
	// db.connection.Preload("User").Find(&Notes)
	// return Notes

	// items, err := database.CLIENT.Note.Query().All(c)

	// if err != nil {
	// 	log.Fatalf("Error occurred")
	// }

	// return items

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
	note, err := db.connection.Note.
		Create().
		SetTitle(input.Title).
		SetContent(input.Content).
		Save(c)

	if err != nil {
		log.Fatalf("Failed creating a note: %v", err)
	}

	return note
}

func (db *noteConnection) UpdateNote(c *gin.Context, b model.Note) string {
	// id, paramErr := strconv.Atoi(c.Param("id"))

	// if paramErr != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "invalid param"})
	// }

	// var input UpdateNoteInput

	// if err := c.ShouldBindJSON(&input); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// note, _ := db.connection.CLIENT.Note.Update().
	// 	SetTitle(input.Title).
	// 	SetContent(input.Content).
	// 	Where(note.ID(id)).
	// 	Save(context.Background())

	// // c.JSON(http.StatusOK, gin.H{"data": note})
	// return note
	return ""
}

// func DeleteNote(noteID int) string {

// 	note := database.CLIENT.Note.DeleteOneID(noteID).Exec(c)
// 	result := fmt.Sprintf("%v", note)

// 	return result
// }
