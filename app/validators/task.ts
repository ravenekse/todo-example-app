import vine from '@vinejs/vine'

export const createTaskValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(6).maxLength(255),
        description: vine.string().optional(),
    })
)

export const updateTaskValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(6).maxLength(255),
        description: vine.string().nullable().optional(),
        is_done: vine.boolean().optional(),
    })
)
