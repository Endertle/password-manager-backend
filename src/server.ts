import express, { Request } from "express";
import cors from "cors";

import { SERVER } from "./config";
import sequelize from "./database/connection";

// routes imports
import user from "./routes/userRoute";
import password from "./routes/passwordRoute";

const app = express();

// logging
app.use((req: Request, _, next) => {
  console.log(req.method, req.path);
  next();
});

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/users", user);
app.use("/api/v1/passwords", password);

sequelize
  .sync()
  .then(() => {
    app.listen(SERVER.PORT, () => {
      console.log(
        `connected to database and listening to port ${SERVER.PORT}.`,
      );
    });
  })
  .catch((err) => console.error(err));
