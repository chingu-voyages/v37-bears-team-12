package entity

//Book struct represents books table in database
type Note struct {
	ID      uint64 `gorm:"primary_key:auto_increment" json:"id"`
	Title   string `gorm:"type:varchar(255)" json:"title"`
	Content string `gorm:"type:text" json:"content"`
	UserID  uint64 `gorm:"not null" json:"-"`
	User    User   `gorm:"foreignkey:UserID;constraint:onUpdate:CASCADE,onDelete:CASCADE" json:"user"`
}

type User struct {
	ID        uint64 `gorm:"primary_key:auto_increment" json:"id"`
	FirstName string `gorm:"type:varchar(255)" json:"first_name"`
	LastName  string `gorm:"type:varchar(255)" json:"last_name"`
	Email     string `gorm:"type:varchar(255)" json:"email"`
	Password  string `gorm:"type:varchar(255)" json:"-"`
	Notes     []Note `gorm:"foreignkey:UserID;constraint:onUpdate:CASCADE,onDelete:CASCADE" json:"notes"`
}
