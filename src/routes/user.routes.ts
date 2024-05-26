/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for users
 * /user
 *   get:
 *     summary: get all users
 *     tags: [User]
 *     parameters:
 *       - in: query
 *       name: page
 *       schema:
 *         type: integer
 *         example: 10
 *         description: page
 *       - in: query
 *       name: limit
 *       schema:
 *         type: integer
 *         example: 1
 *         description: response limit
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  pagination:
 *                    type: object
 *                    $ref: '#/components/schemas/Pagination'
 *                  data:
 *                    type: array
 *                    $ref: '#/components/schemas/User'
 */

import express from "express";
// import { isAuth } from "../utils/auth.middleware";
import { userService } from "../domain/services/user.service";

export const userRouter = express.Router();

userRouter.get("/", userService.getUsers);
userRouter.get("/:id", userService.getUserById);
userRouter.get("/name/:name", userService.getUserByName);
userRouter.post("/register", userService.createUser);
// userRouter.delete("/:id", isAuth, userService.deleteUser);
// userRouter.put("/:id", isAuth, userService.updateUser);
userRouter.post("/login", userService.login);