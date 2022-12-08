import dotenv from "dotenv";
import { app } from "./app";
import { green } from "colors";

dotenv.config();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(green(`Server listen - http://localhost:${PORT}`))
);
