// App.js for Multi-API Dashboard

document.addEventListener("DOMContentLoaded", () => {
    const refreshAllBtn = document.getElementById("refresh-all-btn");
    const perfTimer = document.getElementById("perf-timer");

    // List of APIs and their content containers
    const apis = [
        {
            name: "Vietnam Info",
            url: "https://restcountries.com/v3.1/name/vietnam",
            containerId: "content-country",
            render: renderCountry,
            skeleton: getCountrySkeleton
        },
        {
            name: "Random Users",
            url: "https://randomuser.me/api/?results=3",
            containerId: "content-users",
            render: renderUsers,
            skeleton: getUsersSkeleton
        },
        {
            name: "Random Dog",
            url: "https://dog.ceo/api/breeds/image/random",
            containerId: "content-dog",
            render: renderDog,
            skeleton: getDogSkeleton
        }
    ];

    // --- Loading Skeleton Getters ---
    function getCountrySkeleton() {
        return `
            <div class="skeleton-widget">
                <div class="skeleton-box rect"></div>
                <div class="skeleton-box line" style="width: 50%"></div>
                <div class="skeleton-box line"></div>
                <div class="skeleton-box line" style="width: 70%"></div>
            </div>
        `;
    }

    function getUsersSkeleton() {
        return `
            <div class="skeleton-widget">
                <div style="display: flex; gap: 12px; align-items: center;">
                    <div class="skeleton-box circle"></div>
                    <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                        <div class="skeleton-box line" style="width: 40%"></div>
                        <div class="skeleton-box line" style="width: 60%"></div>
                    </div>
                </div>
                <div style="display: flex; gap: 12px; align-items: center; margin-top: 12px;">
                    <div class="skeleton-box circle"></div>
                    <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                        <div class="skeleton-box line" style="width: 45%"></div>
                        <div class="skeleton-box line" style="width: 55%"></div>
                    </div>
                </div>
                <div style="display: flex; gap: 12px; align-items: center; margin-top: 12px;">
                    <div class="skeleton-box circle"></div>
                    <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                        <div class="skeleton-box line" style="width: 35%"></div>
                        <div class="skeleton-box line" style="width: 65%"></div>
                    </div>
                </div>
            </div>
        `;
    }

    function getDogSkeleton() {
        return `
            <div class="skeleton-widget">
                <div class="skeleton-box rect" style="height: 250px;"></div>
            </div>
        `;
    }

    // --- Specific Widget Renderers ---
    function renderCountry(data, container) {
        const country = data[0];
        const name = country.name.common;
        const officialName = country.name.official;
        const flag = country.flags.svg;
        const capital = country.capital ? country.capital[0] : "N/A";
        const population = country.population.toLocaleString();
        const region = country.region;
        const languages = Object.values(country.languages).join(", ");

        container.innerHTML = `
            <div class="country-card">
                <div class="flag-container">
                    <img class="flag-img" src="${flag}" alt="Flag of ${name}">
                </div>
                <div class="country-details">
                    <h4 class="country-name">${name}</h4>
                    <div class="info-item">
                        <span class="info-label">Tên chính thức:</span>
                        <span class="info-val" style="font-size: 0.8rem; text-align: right;">${officialName}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Thủ đô:</span>
                        <span class="info-val">${capital}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Dân số:</span>
                        <span class="info-val">${population} người</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Châu lục:</span>
                        <span class="info-val">${region}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Ngôn ngữ:</span>
                        <span class="info-val" style="font-size: 0.85rem;">${languages}</span>
                    </div>
                </div>
            </div>
        `;
    }

    function renderUsers(data, container) {
        const users = data.results;
        let html = '<div class="users-list">';
        
        users.forEach(user => {
            const avatar = user.picture.medium;
            const name = `${user.name.first} ${user.name.last}`;
            const email = user.email;
            
            html += `
                <div class="user-item">
                    <img class="user-avatar" src="${avatar}" alt="${name}">
                    <div class="user-text">
                        <span class="user-name">${name}</span>
                        <span class="user-email">${email}</span>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }

    function renderDog(data, container) {
        const imageUrl = data.message;
        container.innerHTML = `
            <div class="dog-container">
                <img class="dog-img" src="${imageUrl}" alt="Random Dog">
            </div>
        `;
    }

    // --- Error State Renderer ---
    function renderError(index, message, container) {
        container.innerHTML = `
            <div class="error-state">
                <i class="fa-solid fa-circle-exclamation"></i>
                <p>Lỗi tải dữ liệu: ${message}</p>
                <button onclick="refreshWidget(${index})">Thử lại</button>
            </div>
        `;
    }

    // --- Individual Widget Loader ---
    window.refreshWidget = async (index) => {
        const apiConfig = apis[index];
        const container = document.getElementById(apiConfig.containerId);
        container.innerHTML = apiConfig.skeleton();

        try {
            const response = await fetch(apiConfig.url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const data = await response.json();
            apiConfig.render(data, container);
        } catch (error) {
            renderError(index, error.message, container);
        }
    };

    // --- Parallel Multi-API Loader ---
    const loadDashboard = async () => {
        const startTime = Date.now();
        perfTimer.textContent = "Đang tải dữ liệu...";
        perfTimer.style.color = "var(--text-muted)";
        perfTimer.style.backgroundColor = "rgba(255,255,255,0.05)";
        perfTimer.style.borderColor = "var(--border-color)";
        
        // Spin the refresh icon
        const refreshIcon = refreshAllBtn.querySelector("i");
        refreshIcon.classList.add("spinning");

        // 1. Show skeletons in all widgets
        apis.forEach(apiConfig => {
            document.getElementById(apiConfig.containerId).innerHTML = apiConfig.skeleton();
        });

        // 2. Fetch all concurrently using Promise.allSettled()
        const results = await Promise.allSettled(
            apis.map(apiConfig => 
                fetch(apiConfig.url).then(async (response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    return await response.json();
                })
            )
        );

        // 3. Process individual results
        results.forEach((result, index) => {
            const container = document.getElementById(apis[index].containerId);
            if (result.status === "fulfilled") {
                apis[index].render(result.value, container);
            } else {
                renderError(index, result.reason.message, container);
            }
        });

        // 4. Update performance timer
        const duration = Date.now() - startTime;
        perfTimer.textContent = `Dữ liệu tải trong ${duration} ms`;
        perfTimer.style.color = "var(--accent)";
        perfTimer.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
        perfTimer.style.borderColor = "rgba(16, 185, 129, 0.2)";
        
        // Stop icon spinning
        refreshIcon.classList.remove("spinning");
    };

    // Refresh all button trigger
    refreshAllBtn.addEventListener("click", loadDashboard);

    // Initial load
    loadDashboard();
});
