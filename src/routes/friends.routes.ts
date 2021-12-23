import { Router } from "express";
import passport from "passport";
import * as controller from "../controllers/friends.controller";
const router = Router();

router.get('/', passport.authenticate("jwt", { session: false }) , controller.GetFriends)
router.post('/requestFriend', passport.authenticate("jwt", { session: false }),  controller.FriendRequest)
router.post('/acceptRequest', passport.authenticate("jwt", { session: false }), controller.AcceptFriendRequest)

export default router;