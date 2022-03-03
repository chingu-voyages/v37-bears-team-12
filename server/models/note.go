package models

type Note struct {
	ID        int8   `json:"id" gorm:"primary_key"`
	UserID    int8   `json:"user_id"`
	Title     string `json:"title"`
	Content   string `json:"content"`
	createdAt string `json:"created_at"`
	updatedAt string `json:"updated_at"`
}
