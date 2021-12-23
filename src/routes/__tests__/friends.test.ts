import mongoose from 'mongoose';
import supertest, { SuperTest } from 'supertest'
import { app } from '../../app'
import { IUser, UserModel } from '../../models/user';
import { setup } from '../../../utils/test-setup';
import { loginUser, registerUser } from './auth.test';
let request: supertest.SuperTest<supertest.Test> = supertest(app);

const BASE_URL = "/api/v1/friends"
const database_name = "endpoint-testing"

setup.setupDB()

describe("/friend", () => {
    let token: String;
    let user: IUser;
    beforeEach(async () => {
        await registerUser()
        const login_res = await loginUser()
        token = login_res.body.token
        user = login_res.body.user
    })

    test('GET /friends - should return a list of friends', async () => {
        const friend_res = await request
                                        .get(BASE_URL)
                                        .set("Cookie", [`token=${token}`])
        expect(friend_res.statusCode).toEqual(200)
        expect(friend_res.body.friends).toBeInstanceOf(Array)   
    })

    describe("POST - /requestFriend", () => {
        let fred: IUser;
        let fredToken: string;
        beforeEach(async () => {
            const register_res = await registerUser({
                username: 'freddy',
                password: '1234',
                userImg: 'img-url'
            })
            fred = register_res.body.user
            fredToken = register_res.body.token
        })
        test('should make a friend request to any user', async () => {
            const friend_res = await request
                                            .post(`${BASE_URL}/requestFriend`)
                                            .set("Cookie", [`token=${token}`])
                                            .send({
                                                user_requested: fred
                                            })

            expect(friend_res.statusCode).toEqual(200)
            expect(friend_res.body.message).toMatch(/friend request sent/i) 
        })

    })

    describe("POST - /acceptRequest", () => {

        let fred: IUser;
        let fredToken: string;
        beforeEach(async () => {
            const register_res = await registerUser({
                username: 'freddy',
                password: '1234',
                userImg: 'img-url'
            })
            fred = register_res.body.user
            fredToken = register_res.body.token
        })

        
        test('should accept a friend request from a user', async () => {
        const friend_res = await request
                                        .post(`${BASE_URL}/acceptRequest`)
                                        .set("Cookie", [`token=${fredToken}`])
                                        .send({
                                            friend_requester: user
                                        })
                expect(friend_res.statusCode).toEqual(200)
                expect(friend_res.body.message).toMatch(/users are friends now/i) 
        })
                                    
    })
        
})