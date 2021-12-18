import supertest from 'supertest'
import { app } from '../../app'
import { setup } from '../../../utils/test-setup';
let request: supertest.SuperTest<supertest.Test> = supertest(app);

const BASE_URL = "/api/v1"
const database_name = "endpoint-testing"

jest.setTimeout(1200000)

setup.setupDB()


export const generalParams = {
    username: "John", 
    password: "1234", 
    userImg: "img-url"
}
export async function registerUser(params: typeof generalParams = generalParams)
{
    return await request
            .post(`${BASE_URL}/auth/register`)
            .send(params)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201)
}

export async function loginUser(
    params: Omit<typeof generalParams, "userImg"> = generalParams, 
)
{
    return await request
                    .post(`${BASE_URL}/auth/login`)
                    .send(params)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
}

describe('/auth', () => {
        it('POST - /register should register a user and responds with json', async () => {
                try {
                    const res = await registerUser()
                    expect(res.statusCode).toEqual(201)
                    expect(res.body.message).toMatch(/Successfuly/)
                    expect(res.body.user).toBeDefined()
                    //done()
                } catch(err) {
                    if(err instanceof Error) throw err
                }
        })  
})
describe("/login", () => {
        beforeEach(async () => {
            await registerUser()
        })
        it('POST /login - should responds with a bad request', async () => {
            try {
                const params = {
                    username: "John", 
                    password: "12345", 
                }
               // await registerUser()
                const res =  await request
                        .post(`${BASE_URL}/auth/login`)
                        .send(params)
                        .set("Accept", "application/json")
                        .expect("Content-Type", /json/)
                expect(res.statusCode).toEqual(400)
                expect(res.body.error).toMatch(/Invalid password/i)
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
               // await registerUser()
                const res = await loginUser(params)

                expect(res.body.message).toMatch(/logged in/)
                expect(res.statusCode).toEqual(200)
                expect(res.body.user.username).toEqual(params.username)
                //done()
            } catch(err) {
                if(err instanceof Error) throw err
            }
        })

        
})
    
describe("/profile", () => {

    beforeEach(async () => {
        await registerUser()
    })

    it("GET - /profile", async () => {
        const params = {
            username: "John", 
            password: "1234", 
        }
      //  await registerUser()
        try {

                const login_res = await loginUser(params)
               // console.log(login_res)
                const res =  await request
                                    .get(`${BASE_URL}/auth/profile`)
                                    .set("Cookie", [`token=${login_res.body.token}`])
                                    .set("Accept", "application/json")
                                    .expect("Content-Type", /json/)
                expect(res.statusCode).toEqual(200)
                expect(res.body.success).toBeTruthy()
                expect(res.body.data).toBeDefined()
        } catch(err) {
            throw err
        }
    })
    it("GET - /profile should send 401 unauthorized / access denied", async () => {
        const params = {
            username: "John", 
            password: "1234", 
        }
       // await registerUser()
        await loginUser(params)
        const res =  await request
                    .get(`${BASE_URL}/auth/profile`)
                    .expect(401)
        expect(res.text).toMatch(/unauthorized/i)
    })

})