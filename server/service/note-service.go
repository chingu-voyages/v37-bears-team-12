package service

import (
	"notes-app/dto"
	"notes-app/ent/schema"
	"notes-app/repository"
)

type NoteService interface {
	Update(input dto.UpdateNoteInput) string
	FindAll() string
	FindByID(noteID int) string
}

type noteService struct {
	noteRepository repository.NoteRepository
}

func NewNoteService(noteRepository repository.NoteRepository) NoteService {
	return &noteService{
		noteRepository: noteRepository,
	}
}

func (service *noteService) Create(b schema.Note) string {
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

func (service *noteService) Update(input dto.UpdateNoteInput) string {
	// // Note := entity.Note{}
	// // err := smapping.FillStruct(&Note, smapping.MapFields(&b))
	// // if err != nil {
	// // 	log.Fatalf("Failed map %v: ", err)
	// // }
	// // res := service.NoteRepository.UpdateNote(Note)
	// service.noteRepository.UpdateNote(b)
	return ""

}

func (service *noteService) FindAll() string {
	// return service.noteRepository.FindNotes()

	return ""
}

func (service *noteService) FindByID(noteId int) string {
	// return service.noteRepository.FindNote(noteId)
	return ""
}
