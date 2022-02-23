import {$authHost} from "./index";

export const message_create = async (message, user_id) => {
    const {data} = await $authHost.post('api/writer/message_create', {message, user_id})
    return data
}

export const messages_get = async (user_id) => {
    const {data} = await $authHost.post('api/writer/messages_get', {user_id})
    return data
}

export const messages_delete = async (message_id) => {
    const {data} = await $authHost.post('api/writer/message_delete', {message_id})
    return data
}

export const messages_update = async (message_id, new_text) => {
    const {data} = await $authHost.post('api/writer/message_update', {message_id, new_text})
    return data
}