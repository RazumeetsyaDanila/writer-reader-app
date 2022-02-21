import {$authHost} from "./index";

export const get_all_messages = async () => {
    const {data} = await $authHost.get('api/reader/get_all_messages', {})
    return data
}