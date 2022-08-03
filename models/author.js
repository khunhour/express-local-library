var mongoose = require("mongoose");
var Schema = mongoose.Schoema;

var AuthorSchema = new Schema({
	first_name: {
		type: String,
		required: true,
		maxLength: 100,
	},
	family_name: {
		type: String,
		required: true,
		maxLength: 100,
	},
	date_of_birth: { type: Date },
	date_of_death: { type: Date },
});

//Virtual for author's full name
AuthorSchema.virtual("name").get(() => {
	// To avoid errors in cases where an author does not have either a family name or first name
	// We want to make sure we handle the exception by returning an empty string for that case
	var fullname = "";
	if (this.first_name && this.family_name) {
		fullname = this.first_name + ", " + this.family_name;
	}
	if (!this.first_name || !this.family_name) {
		fullname = "";
	}
	return fullname;
});