const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give pasword as argument");
  process.exit(1);
}

const password = process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4];

const url = `mongodb+srv://mtuann51:${password}@clusterfullstack.d3uargd.mongodb.net/Phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", PersonSchema);

const person = new Person({
  name: personName,
  number: personNumber,
});
if (personName && personNumber) {
  person.save().then((result) => {
    console.log(`added ${personName} number ${personNumber} to the phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
