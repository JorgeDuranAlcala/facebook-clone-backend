import { getUsersList } from './user-action'
//jest.mock("./user-action")
const users_list = [
    {
        username: "John Travolta",
        password: "123456"
    },
    {
        username: "Uma Fisher",
        password: "1234567"
    },
    {
        username: "Quentin Tarantino",
        password: "1234568"
    },
]
jest.mock("./user-action", () => {
    return {
            getUsersList: jest.fn().mockImplementation(
                (username: string) => (
                    Promise.resolve(
                        users_list.filter(v => v.username !== username)
                    )
                )
            )
    }
})

describe('User actions', () => {

    it("Should return a list of users", async () => {
        const currentUser = "Uma Fisher"
        const users = await getUsersList(currentUser)
        expect(getUsersList).toHaveBeenCalled()
        expect(getUsersList).toHaveBeenCalledTimes(1)
        expect(getUsersList).toHaveBeenCalledWith(currentUser)
        expect(getUsersList).toReturn()
        expect(users).toBeInstanceOf(Array)
        expect(users.length).not.toEqual(0)
        expect(users.length).toEqual(2)
    })

    it("Should return an Error if username is undefined", async () => {
        try {
            const currentUser = undefined
            await getUsersList(currentUser)
        } catch (error) {
            if(!(error instanceof Error)) return;
            expect(error.message).toMatch(/The username is undefined/i)
        }
    })

   
})
