package service

import (
	"notes-app/dto"
	"notes-app/ent"
	"notes-app/repository"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type NoteService interface {
	FindNotes(c *gin.Context, userID uuid.UUID, subject string) ([]*ent.Note, error)
	FindNoteByID(c *gin.Context, noteID uuid.UUID, userID uuid.UUID) (*ent.Note, error)
	CreateNote(c *gin.Context, input dto.CreateNoteInput, userID uuid.UUID) (*ent.Note, error)
	UpdateNote(c *gin.Context, input dto.UpdateNoteInput, noteID uuid.UUID, userID uuid.UUID) (*ent.Note, error)
	DeleteNote(c *gin.Context, noteID uuid.UUID, userID uuid.UUID) (string, error)
}

type noteService struct {
	noteRepository repository.NoteRepository
}

func NewNoteService(noteRepository repository.NoteRepository) NoteService {
	return &noteService{
		noteRepository: noteRepository,
	}
}

func (service *noteService) FindNotes(c *gin.Context, userID uuid.UUID, subject string) ([]*ent.Note, error) {
	return service.noteRepository.FindNotes(c, userID, subject)
}

func (service *noteService) FindNoteByID(c *gin.Context, noteID uuid.UUID, userID uuid.UUID) (*ent.Note, error) {
	return service.noteRepository.FindNoteByID(c, noteID, userID)
}

func (service *noteService) CreateNote(c *gin.Context, input dto.CreateNoteInput, userID uuid.UUID) (*ent.Note, error) {
	return service.noteRepository.CreateNote(c, input, userID)
}

func (service *noteService) UpdateNote(c *gin.Context, input dto.UpdateNoteInput, noteID uuid.UUID, userID uuid.UUID) (*ent.Note, error) {
	return service.noteRepository.UpdateNote(c, input, noteID, userID)
}

func (service *noteService) DeleteNote(c *gin.Context, noteID uuid.UUID, userID uuid.UUID) (string, error) {
	return service.noteRepository.DeleteNote(c, noteID, userID)
}
