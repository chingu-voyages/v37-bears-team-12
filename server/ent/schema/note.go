package schema

import "entgo.io/ent"

// Note holds the schema definition for the Note entity.
type Note struct {
	ent.Schema
}

// Fields of the Note.
func (Note) Fields() []ent.Field {
	return nil
}

// Edges of the Note.
func (Note) Edges() []ent.Edge {
	return nil
}
