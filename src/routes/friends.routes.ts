import { Router } from "express";
import * as controller from "../controllers/friends.controller";
const router = Router();

router.post('/', controller.GetFriends)
router.post('/requestFriend', controller.FriendRequest)

export default router;