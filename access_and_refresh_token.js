const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");

    async function fetchWithAuth(url, options = {}) {
        options.headers = options.headers || {};
        options.headers["Authorization"] = "Bearer " + access;

        let response = await fetch(url, options);

        if (response.status === 401 && refresh) {
            const refreshResponse = await fetch("your api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ refresh: refresh })
            });

            if (refreshResponse.ok) {
                const data = await refreshResponse.json();
                localStorage.setItem("access_token", data.access);
                options.headers["Authorization"] = "Bearer " + data.access;
                response = await fetch(url, options);
            } else {
                alert("Session expired. Please log in again.");
                window.location.href = "redirect location";
                return;
            }
        }

        return response;
    }