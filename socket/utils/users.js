export let users = []
export const addUser = (userID, socketID) => {
    const user = { userID, socketID }
    !users.some(user => user.userID === userID) && users.push(user)


}
export const removeUser = (socketID) => {
    users.filter(user => user.socketID !== socketID)
}
export const getUser = (userID) => {
    return users.find(user => user.userID === userID)

}