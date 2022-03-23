package dto

type CreateNoteInput struct {
	Title   string `json:"title" binding:"required"`
	Content string `json:"content" binding:"required"`
	Subject string `json:"subject"`
}

type UpdateNoteInput struct {
	Title   string `json:"title"`
	Content string `json:"content"`
	Subject string `json:"subject"`
}
