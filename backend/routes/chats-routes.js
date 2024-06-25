import { Router } from "express";
import {verifyToken} from '../utils/token-manager.js'
import { validate,chatCompletionValidator } from "../utils/validators.js";
import { generateChatCompletion } from "../controllers/chats-controller.js";
//protected api
const chatRoutes=Router()
chatRoutes.post('/new',validate(chatCompletionValidator),verifyToken,generateChatCompletion)

export default chatRoutes