import axios from "axios";
export const BaseURL = "https://furniflex-backend-production.up.railway.app/api";

export const api = axios.create({
    baseURL: BaseURL,
    timeout: 10000,
    headers: {
        "X-Custom-Header": "foobar",
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// https://furniflex-backend-production.up.railway.app
// http://localhost:5000


// Add a request interceptor
api.interceptors.request.use(
    (request) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            request.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Parse the token get from the localestorage.
const Parse = (token: any) => {
    if (token) {
        const tokenPayload = JSON.parse(token);
        return tokenPayload;
    }
    return null;
};

// Add a response interceptor
api.interceptors.response.use(
    (response) => response, // Directly return successful responses.
    async (error) => {
        //console.log("The error line 40 is:", error);
        const originalRequest = error.config;
        if (error.response.status === 420 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
            try {
                const refreshToken = localStorage.getItem("refreshToken"); // Get the refresh token as a string
                console.log("Refresh Token localestorage:", refreshToken);

                if (refreshToken) {
                    // Make a request to your auth server to refresh the token.
                    const response = await axios.post(
                        `${BaseURL}/users/refresh-token`,
                        {
                            refreshToken: Parse(refreshToken),
                        },
                        { withCredentials: true }
                    );
                    console.log("Response after Refreshing:", response);

                    const { accessToken } = response.data.data;

                    // Store the new access and refresh tokens.
                    localStorage.setItem("accessToken", accessToken);
                    console.log("New Access Token:", accessToken);

                    // Update the authorization header with the new access token.
                    api.defaults.headers.common["Authorization"] =
                        `Bearer ${accessToken}`;

                    return api(originalRequest); // Retry the original request with the new access token.
                }
            } catch (refreshError) {
                // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
                console.log("Token refresh failed:", refreshError);
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error); // For all other errors, return the error as is.
    }
);
