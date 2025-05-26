import { readFile, writeFile } from "node:fs/promises"

const path = 'db/users.json'

export async function getUsers(hidePass = false) {
    const jsonData = await readFile(path, 'utf8')
    if (hidePass)
    {
        const users = JSON.parse(jsonData)
        users.forEach(user => user.pass = "******");
        return users;
    }
    else
        return JSON.parse(jsonData)
}

export async function addUser({email, pass}) {
    const newUser = 
    { email, pass, isAdmin: false, id: Math.random().toString(16).slice(2) }
    const users = [newUser, ...await getUsers()]
    await writeFile(path, JSON.stringify(users))
    return newUser
}

export async function deleteUserById(id) {
    const usersList = await getUsers()
    await writeFile(path, JSON.stringify(usersList.filter(user => user.id != id)))
    const newUsersList = await getUsers(true)
    return newUsersList
}

export async function checkUser(email, pass) {
    const usersList = await getUsers()
    const foundUser = usersList.filter(user => user.email == email && user.pass == pass)
    return foundUser
}