const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Olesia:1agSlY9gUgwrYhJ9@cluster0.k8ltqbw.mongodb.net/my-contacts?retryWrites=true&w=majority";
//1agSlY9gUgwrYhJ9

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
