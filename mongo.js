const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.3e7ytvo.mongodb.net/persons?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: name,
  number: number,
  id: Math.floor(Math.random() * 10000),
});

person.save().then((result) => {
  console.log(`added ${name} number ${number} to phonebook`);
  Person.find({}).then((result) => {
    console.log("phonebook:")
    result.forEach((persons) => {
      console.log(persons.name + " " + persons.number);
    });
    mongoose.connection.close();
  });
});
