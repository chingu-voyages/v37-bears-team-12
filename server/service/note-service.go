package service

import (
	"notes-app/dto"
	"notes-app/ent"
	"notes-app/repository"

	"github.com/gin-gonic/gin"
)

type NoteService interface {
	FindNotes(c *gin.Context) []*ent.Note
	FindNoteByID(c *gin.Context, noteID int) *ent.Note
	CreateNote(c *gin.Context, input dto.CreateNoteInput) *ent.Note
	UpdateNote(c *gin.Context, noteID int, input dto.UpdateNoteInput) *ent.Note
	DeleteNote(c *gin.Context, noteID int) string
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

func (service *noteService) CreateNote(c *gin.Context, input dto.CreateNoteInput) *ent.Note {
	return service.noteRepository.CreateNote(c, input)
}

func (service *noteService) UpdateNote(c *gin.Context, noteID int, input dto.UpdateNoteInput) *ent.Note {
	return service.noteRepository.UpdateNote(c, noteID, input)
}

func (service *noteService) DeleteNote(c *gin.Context, noteID int) string {
	return service.noteRepository.DeleteNote(c, noteID)
}
