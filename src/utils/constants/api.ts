import { Storage } from 'storage'

export const requestHeader = { Authorization: "Bearer " + Storage.getItem("accessToken") }