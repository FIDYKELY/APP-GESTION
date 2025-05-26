import { json } from "node:stream/consumers"
import { addUser, getUsers, deleteUserById, checkUser } from "../entities/users.js"

export async function readUsers () {
    const users = await getUsers(true)
    return users
}

export async function createUser (req) {
    const userToAdd = await json(req)
    const newUser = await addUser(userToAdd)
    return newUser
}

export async function deleteUser (id) {
    const users = await deleteUserById(id)
    return users
}

export async function checkUserLogin (email, pass) {
    const user = await checkUser(email, pass)
    return user
}