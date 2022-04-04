type Param = {
    email: string
    password: string,
}

export const loginUser = async (credentials: Param) => {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}
