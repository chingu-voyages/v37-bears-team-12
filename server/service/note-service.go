package service

import (
	"notes-app/dto"
	"notes-app/ent"
	"notes-app/repository"

	"github.com/gin-gonic/gin"
)

type NoteService interface {
	FindNotes(context *gin.Context) []*ent.Note
	FindNoteByID(context *gin.Context, noteID int) *ent.Note
	CreateNote(context *gin.Context, input dto.CreateNoteInput) string
	UpdateNote(context *gin.Context, input dto.UpdateNoteInput) string
}

type noteService struct {
	noteRepository repository.NoteRepository
}

func NewNoteService(noteRepository repository.NoteRepository) NoteService {
	return &noteService{
		noteRepository: noteRepository,
	}
}

func (service *noteService) FindNotes(c *gin.Context) []*ent.Note {
	return service.noteRepository.FindNotes(c)
}

func (service *noteService) FindNoteByID(c *gin.Context, noteID int) *ent.Note {
	return service.noteRepository.FindNoteByID(c, noteID)
}

func (service *noteService) CreateNote(context *gin.Context, input dto.CreateNoteInput) string {
	// // Note := entity.Note{}
	// // err := smapping.FillStruct(&Note, smapping.MapFields(&b))
	// // if err != nil {
	// // 	log.Fatalf("Failed map %v: ", err)
	// // }
	// // res := service.NoteRepository.InsertNote(Note)
	// service.noteRepository.CreateNode(b)
	// return nil

	return ""
}

func (service *noteService) UpdateNote(context *gin.Context, input dto.UpdateNoteInput) string {
	// // Note := entity.Note{}
	// // err := smapping.FillStruct(&Note, smapping.MapFields(&b))
	// // if err != nil {
	// // 	log.Fatalf("Failed map %v: ", err)
	// // }
	// // res := service.NoteRepository.UpdateNote(Note)
	// service.noteRepository.UpdateNote(b)
	return ""

}
