package service

import (
	"fmt"

	"notes-app/dto"
	"notes-app/ent"
	"notes-app/entity"
	_ "notes-app/repository"
)

//NoteService is a ....
type NoteService interface {
	// Insert(b dto.NoteCreateDTO) entity.Note
	UpdateNote(b dto.UpdateNoteInput) entity.Note
	DeleteNote(b dto.UpdateNoteInput)
	FindNotes() []entity.Note
	FindNote(noteID uint64) entity.Note
	IsAllowedToEdit(userID string, noteID uint64) bool
}

type noteService struct {
	noteRepository repository.NoteRepository
}

//NewNoteService .....
func NewNoteService(noteRepository repository.NoteRepository) NoteService {
	return &noteService{
		noteRepository: noteRepository,
	}
}

func (service *noteService) CreateNote(b ent.Note) entity.Note {
	// Note := entity.Note{}
	// err := smapping.FillStruct(&Note, smapping.MapFields(&b))
	// if err != nil {
	// 	log.Fatalf("Failed map %v: ", err)
	// }
	// res := service.NoteRepository.InsertNote(Note)
	service.noteRepository.CreateNode(b)
	return nil
}

func (service *noteService) UpdateNote(b ent.Note) error {
	// Note := entity.Note{}
	// err := smapping.FillStruct(&Note, smapping.MapFields(&b))
	// if err != nil {
	// 	log.Fatalf("Failed map %v: ", err)
	// }
	// res := service.NoteRepository.UpdateNote(Note)
	service.noteRepository.Update(b)
	return nil

}

func (service *noteService) DeleteNote(noteID uint64) {
	service.noteRepository.DeleteNote(noteID)
	return nil
}

func (service *noteService) FindNotes() []entity.Note {
	return service.noteRepository.FindNotes()
}

func (service *noteService) FindNote(noteID uint64) entity.Note {
	return service.noteRepository.FindNote(noteID)
}

func (service *noteService) IsAllowedToEdit(userID string, noteID uint64) bool {
	b := service.noteRepository.FindNoteByID(noteID)
	id := fmt.Sprintf("%v", b.UserID)
	return userID == id
}
