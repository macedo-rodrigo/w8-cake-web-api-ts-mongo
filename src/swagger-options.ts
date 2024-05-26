import { type SwaggerOptions } from "swagger-ui-express";

export const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node s16 W8 Cake Api",
      version: "1.0.0",
      description: "This is a simple CRUD API for a cake web",
      license: {
        name: "MIT",
        url: "http://mit.com",
      },
      contact: {
        name: "Rodri Macedo",
        url: "https://github.com/macedo_rodrigo",
        email: "rodri@example.com"
      }
    },
    server: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: [
    "./src/**/*.ts",
  ]
};