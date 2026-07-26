import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        const status = error.response.status;
        const originalRequest = error.config
        if (error.response) {
            if (status == 401 && !originalRequest._retry) {

                originalRequest._retry = true;

                const refreshToken = localStorage.getItem("refresh_token")

                try {

                    const res = await axios.post(
                        "https://api.escuelajs.co/api/v1/auth/refresh-token", {
                        refreshToken
                    });

                    const newAccesToken = res.data.acces_token;
                    localStorage.setItem("token", newAccesToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccesToken}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken")
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                }
                console.log("Ruxsat yoq yoki token eskirgan");
                localStorage.removeItem("token");
                window.location.href = "/login";
            }

            if (status == 404) {
                console.log("Soralgan malumot topilmadi");
            }

            if (status == 500) {
                console.log("Serverda ichki xatolk yuz berdi");
            }
        } else if (error.request) {
            console.log("Serverga ulanib bo'lmadi. Internetni tekshiring")
        } else {
            console.log("Xatolik", error.message)
        }
        return Promise.reject(error)
    }

);