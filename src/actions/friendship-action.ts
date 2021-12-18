import { IUser, UserModel } from "../models/user";

export async function requestFriendship(user_requesting: IUser, user_requested: IUser): Promise<void> {
    try {
        
        const res = await UserModel.bulkWrite([
            {
                updateOne: {
                    "filter": {"_id": user_requesting._id},
                    "update": {
                        $push: {
                            "friends": {
                                user: user_requested,
                                status: "requested"
                            }
                        }
                    }
                }
            },
            {
                updateOne: {
                    "filter": {"_id": user_requested._id},
                    "update": {
                        $push: {
                            "friends": {
                                user: user_requesting,
                                status: "pending"
                            }
                        }
                    }
                }
            }
        ])

        if(res.modifiedCount === 2) {
            return ;
        }
    } catch(err) {
        if(!(err instanceof Error)) return;
        throw err
    }
}

export async function acceptRequest(user_one: IUser, user_two: IUser) {
 
    try {
        const res = await UserModel.bulkWrite([
            {
                updateOne: {
                    "filter": {"_id": user_one._id},
                    "update": {
                        $push: {
                            "friends": {
                                user: user_two,
                                status: "accepted"
                            }
                        }
                    }
                }
            },
            {
                updateOne: {
                    "filter": {"_id": user_two._id},
                    "update": {
                        $push: {
                            "friends": {
                                user: user_one,
                                status: "accepted"
                            }
                        }
                    }
                }
            }
        ])
        if(res.modifiedCount === 2) {
            return ;
        }
    } catch(err) {
        if(!(err instanceof Error)) return;
        throw err
    }
}

export async function getFriendsList(user_id: string) {
    try {
        const user = await UserModel.findById(user_id);
        if(!user) throw new Error("user does not exist");
        return user.friends
    } catch (error) {
        throw error
    }
}