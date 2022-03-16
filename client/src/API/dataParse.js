import { $host } from ".";

export const getCurrencyData = async () => {
    const response = await $host.get('/api/getData')
    return response.data
}