export const createRef = (input) => {
    const userNameRef = input.map((user)=>{
        return user.username
    })
    return userNameRef
}