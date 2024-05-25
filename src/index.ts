import { app } from "./server";

const PORT = 8080;
export const appInstance = app.listen(PORT, () => {
  console.log(`Server levantado en el puerto ${PORT}`);
});
