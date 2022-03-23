package repository

import (
	"notes-app/dto"
	"notes-app/ent"
	"notes-app/ent/schema"
)

type NoteRepository interface {
	UpdateNote(n schema.Note) string
	FindNotes() string
	FindNote(noteId int) string
	CreateNote(input dto.CreateNoteInput) string
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

func (db *noteConnection) CreateNote(input dto.CreateNoteInput) string {

	// fmt.Print(input)

	// // Create note
	// note, err := db.connection.Note.
	// 	Create().
	// 	SetTitle(input.Title).
	// 	SetContent(input.Content)

	// if err != nil {
	// 	log.Fatalf("Failed creating a note: %v", err)
	// }

	// //c.JSON(http.StatusOK, gin.H{"data": note})
	// return note
	return ""
}

func (db *noteConnection) UpdateNote(b schema.Note) string {
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

func (db *noteConnection) FindNote(NoteID int) string {
	// var Note client.Note
	// db.connection.Preload("User").Find(&Note, NoteID)
	// return Note

	// id, err := strconv.Atoi(c.Param("id"))

	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "invalid param"})
	// }

	// note, _ := database.CLIENT.Note.Query().
	// 	Where(note.ID(id)).
	// 	First(context.Background())

	// c.JSON(http.StatusOK, gin.H{"data": note})
	return ""
}

func (db *noteConnection) FindNotes() string {
	// var Notes []entity.Note
	// db.connection.Preload("User").Find(&Notes)
	// return Notes

	// items, err := database.CLIENT.Note.Query().All(c)

	// if err != nil {
	// 	log.Fatalf("Error occurred")
	// }

	// return items
	return ""
}

// func DeleteNote(noteID int) string {

// 	note := database.CLIENT.Note.DeleteOneID(noteID).Exec(c)
// 	result := fmt.Sprintf("%v", note)

// 	return result
// }
