package repository

import (
	"notes-app/ent/schema"
	_ "notes-app/ent/schema"
	"notes-app/entity"

)

//NoteRepository is a ....
type NoteRepository interface {
	
	UpdateNote(n ent.Note) n ent.Note
	DeleteNote(noteId uint64, userId uint64) n ent.Note 
	FindNotes() []ent.Note
	FindNote(NoteID uint64) *ent.Note
}

type noteConnection struct {
	connection *ent.Client
}



//NewNoteRepository creates an instance NoteRepository
func NewNoteRepository() NoteRepository {
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

	// Run the auto migration tool.
	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}
	return &noteConnection{
		connection: client,
	}
}

func (db *noteConnection) CreateNote(b entity.Note) entity.Note {
	var input CreateNoteInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Print(input)

	// Create note
	note, err := db.connection.CLIENT.Note.
		Create().
		SetTitle(input.Title).
		SetContent(input.Content).
		Save(c)

	if err != nil {
		log.Fatalf("Failed creating a note: %v", err)
	}

	//c.JSON(http.StatusOK, gin.H{"data": note})
	return note
}

func (db *noteConnection) UpdateNote(b entity.Note) entity.Note {
	id, paramErr := strconv.Atoi(c.Param("id"))

	if paramErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid param"})
	}

	var input UpdateNoteInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	note, _ := db.connection.CLIENT.Note.Update().
		SetTitle(input.Title).
		SetContent(input.Content).
		Where(note.ID(id)).
		Save(context.Background())

	// c.JSON(http.StatusOK, gin.H{"data": note})
	return note
}

func (db *noteConnection) DeleteNote(b entity.Note) {
	db.connection.Delete(&b)
}

func (db *noteConnection) FindNote(NoteID uint64) entity.Note {
	// var Note client.Note
	// db.connection.Preload("User").Find(&Note, NoteID)
	// return Note

	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid param"})
	}

	note, _ := database.CLIENT.Note.Query().
		Where(note.ID(id)).
		First(context.Background())

	c.JSON(http.StatusOK, gin.H{"data": note})
}

func (db *NoteConnection) FindNotes() []entity.Note {
	// var Notes []entity.Note
	// db.connection.Preload("User").Find(&Notes)
	// return Notes


	items, err := database.CLIENT.Note.Query().All(c)

	if err != nil {
		log.Fatalf("Error occurred")
	}

	c.JSON(http.StatusOK, gin.H{"data": items})
}
