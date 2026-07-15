

const BASE_URL = "https://api.escuelajs.co/api/v1"

export async function loginRequest(email, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        throw new Error("Something went wrong!")
    }

    return response.json()
}

export async function registerRequest(email, name, password, role = "customer", avatar = "https://api.escuelajs.co/api/v1/files/default-avatar.jpg") {
    const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            name,
            password,
            role,
            avatar,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Xatolik yuz berdi");
    }

    return await response.json();
}

export async function getProfile(token) {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });
    console.log(token)

    if (!response.ok) {
        throw new Error("Something went wrong!");
    }

    return response.json();
}
