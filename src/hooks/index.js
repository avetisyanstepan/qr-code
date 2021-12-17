import store2 from "store2"

export const userIsAuthenticated = () => {
    const token = store2.get('firebaseToken')
    if(token) {
        return true
    }
    return false
}