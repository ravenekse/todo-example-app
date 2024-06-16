import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'
import { createTaskValidator, updateTaskValidator } from '#validators/task'

export default class TasksController {
    async index({ response }: HttpContext) {
        const tasks = await Task.query()
            .orderBy('id', 'asc')
            .then((task) => task)

        return response.status(200).send({
            success: true,
            message: 'Successfully fetched list of task.',
            data: tasks,
        })
    }

    async store({ request, response }: HttpContext) {
        const validated = await request.validateUsing(createTaskValidator)

        if (await Task.query().where('title', validated.title).first()) {
            return response.status(400).send({
                success: false,
                message: 'There is a task with this title.',
            })
        }

        const task = await Task.create({
            title: validated.title,
            description: validated.description || null,
            is_done: false,
        })

        return response.status(200).send({
            success: true,
            message: 'Task successfully created.',
            data: task,
        })
    }

    async show({ params, response }: HttpContext) {
        const taskId = params.id
        const task = await Task.query().where('id', taskId).first()

        if (!task) {
            return response.status(404).send({
                success: false,
                message: 'The task with this ID does not exist.',
            })
        }

        return response.status(200).send({
            success: true,
            message: 'Task successfully fetched.',
            data: task,
        })
    }

    async update({ params, request, response }: HttpContext) {
        const taskId = params.id
        const validated = await request.validateUsing(updateTaskValidator)
        const task = await Task.query().where('id', taskId).first()

        if (!task) {
            return response.status(404).send({
                success: false,
                message: 'The task with this ID does not exist.',
            })
        }

        await task
            .merge({
                title: validated.title,
                description: validated.description || null,
                is_done: validated.is_done || false,
            })
            .save()

        return response.status(200).send({
            success: true,
            message: 'The task has been successfully updated.',
            data: task,
        })
    }

    async destroy({ params, response }: HttpContext) {
        const taskId = params.id
        const task = await Task.query().where('id', taskId).first()

        if (!task) {
            return response.status(404).send({
                success: false,
                message: 'The task with this ID does not exist.',
            })
        }

        await task.delete()

        return response.status(200).send({
            success: true,
            message: 'The task has been successfully deleted.',
        })
    }
}
