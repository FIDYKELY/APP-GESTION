import { json } from "node:stream/consumers"
import { addProject, getProjects, deleteProjectById } from "../entities/projects.js"

export async function readProjects () {
    const projects = await getProjects(true)
    return projects
}

export async function createProject (req) {
    const projectToAdd = await json(req)
    const newProject = await addProject(projectToAdd)
    return newProject
}

export async function deleteProject (id) {
    const projects = await deleteProjectById(id)
    return projects
}