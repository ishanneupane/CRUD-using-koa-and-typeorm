import app from "./app/app";
import databaseConnection from "./database/database.connection";
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
databaseConnection.initialize()
  .then(() => {
    console.log("Connected to database");
    // console.log(databaseConnection);
  })
  .catch(console.error);
