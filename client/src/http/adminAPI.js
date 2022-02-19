import {$authHost, $host} from "./index";

export const admin_registration = async (login, password, role) => {
    const {data} = await $host.post('api/user/registration', {login, password, role})
    return data
}

export const get_users = async () => {
    const {data} = await $authHost.get('api/admin/users' )
    return data
}

export const delete_user = async (login) => {
    const {data} = await $authHost.post('api/admin/delete', {login} )
    return data
}