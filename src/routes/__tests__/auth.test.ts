import mongoose from 'mongoose';
import supertest, { SuperTest } from 'supertest'
import { app } from '../../app'
import { IUser, UserModel } from '../../models/user';
import { setup } from '../../../utils/test-setup';
let request: supertest.SuperTest<supertest.Test> = supertest(app);

const BASE_URL = "/api/v1"
const database_name = "endpoint-testing"

setup.setupDB(database_name)
jest.setTimeout(10000)

async function registerUser()
{
    const params = {
        username: "John", 
        password: "1234", 
        userImg: "img-url"
    }
    return await request
            .post(`${BASE_URL}/auth/register`)
            .send(params)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201)
}

async function loginUser(params: any, expectedStatus: number)
{
    return await request
                    .post(`${BASE_URL}/auth/login`)
                    .send(params)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(expectedStatus)
}

describe('/auth', () => {
        it('POST - /register should register a user and responds with json', async () => {
                try {
                    const res = await registerUser()
                    expect(res.statusCode).toEqual(201)
                    expect(res.body.message).toMatch(/Successfuly/)
                    expect(res.body.New_user).toBeDefined()
                    //done()
                } catch(err) {
                    if(err instanceof Error) throw err
                }
        })  
        describe("/login", () => {
            it('POST /login - should responds with a bad request', async () => {
                try {
                    const params = {
                        username: "John", 
                        password: "12345", 
                    }
                    await registerUser()
                    const res =  await request
                            .post(`${BASE_URL}/auth/login`)
                            .send(params)
                            .set("Accept", "application/json")
                            .expect("Content-Type", /json/)
                            .expect(400)
                    expect(res.statusCode).toEqual(400)
                    expect(res.body.error).toMatch(/Invalid password/)
                    //done()
                } catch(err) {
                    if(err instanceof Error) throw err
                }
            })
            it('POST /login - should be able to login a user', async () => {
                try {
                    const params = {
                        username: "John", 
                        password: "1234", 
                    }
                    await registerUser()
                    const res = await loginUser(params, 200)

                    expect(res.body.message).toMatch(/logged in/)
                    expect(res.body.user.username).toEqual(params.username)
                    //done()
                } catch(err) {
                    if(err instanceof Error) throw err
                }
            })

            it("GET - /profile", async () => {
                const params = {
                    username: "John", 
                    password: "1234", 
                }
                await registerUser()
                const login_res = await loginUser(params, 200)
                const res =  await request
                            .get(`${BASE_URL}/auth/profile`)
                            .set("Cookie", [`token=${login_res.body.token}`])
                            .set("Accept", "application/json")
                            .expect("Content-Type", /json/)
                            .expect(200)
                expect(res.body.success).toBeTruthy()
                expect(res.body.data).toBeDefined()
            })
            it("GET - /profile should send 401 unauthorized / access denied", async () => {
                const params = {
                    username: "John", 
                    password: "1234", 
                }
                await registerUser()
                const login_res = await loginUser(params, 200)
                const res =  await request
                            .get(`${BASE_URL}/auth/profile`)
                            .expect(401)
                expect(res.text).toMatch(/unauthorized/i)
            })

        })
})
