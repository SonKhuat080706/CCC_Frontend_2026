// App.js for Weather App - SkyGlance

document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const cityInput = document.getElementById("city-input");
    const weatherCard = document.getElementById("weather-card");
    const historyTags = document.getElementById("history-tags");

    // Weather Code Mapping to Descriptions and FontAwesome Icons
    const weatherMap = {
        0: { desc: "Trời quang đãng", icon: "fa-sun", color: "#f59e0b" },
        1: { desc: "Hầu như quang đãng", icon: "fa-cloud-sun", color: "#fbbf24" },
        2: { desc: "Ít mây", icon: "fa-cloud-sun", color: "#cbd5e1" },
        3: { desc: "Nhiều mây", icon: "fa-cloud", color: "#94a3b8" },
        45: { desc: "Có sương mù", icon: "fa-smog", color: "#64748b" },
        48: { desc: "Sương mù đóng băng", icon: "fa-smog", color: "#475569" },
        51: { desc: "Mưa phùn nhẹ", icon: "fa-cloud-rain", color: "#60a5fa" },
        53: { desc: "Mưa phùn vừa", icon: "fa-cloud-rain", color: "#3b82f6" },
        55: { desc: "Mưa phùn nặng hạt", icon: "fa-cloud-showers-heavy", color: "#2563eb" },
        56: { desc: "Mưa phùn buốt nhẹ", icon: "fa-snowflake", color: "#93c5fd" },
        57: { desc: "Mưa phùn buốt mạnh", icon: "fa-snowflake", color: "#60a5fa" },
        61: { desc: "Mưa rào nhẹ", icon: "fa-cloud-sun-rain", color: "#60a5fa" },
        63: { desc: "Mưa vừa", icon: "fa-cloud-rain", color: "#3b82f6" },
        65: { desc: "Mưa to", icon: "fa-cloud-showers-heavy", color: "#1d4ed8" },
        66: { desc: "Mưa buốt nhẹ", icon: "fa-snowflake", color: "#93c5fd" },
        67: { desc: "Mưa buốt nặng", icon: "fa-snowflake", color: "#3b82f6" },
        71: { desc: "Tuyết rơi nhẹ", icon: "fa-snowflake", color: "#e2e8f0" },
        73: { desc: "Tuyết rơi vừa", icon: "fa-snowflake", color: "#f1f5f9" },
        75: { desc: "Tuyết rơi dày", icon: "fa-snowflake", color: "#ffffff" },
        77: { desc: "Tuyết hạt", icon: "fa-snowflake", color: "#f8fafc" },
        80: { desc: "Mưa rào nhẹ", icon: "fa-cloud-sun-rain", color: "#60a5fa" },
        81: { desc: "Mưa rào vừa", icon: "fa-cloud-rain", color: "#3b82f6" },
        82: { desc: "Mưa rào rất to", icon: "fa-cloud-showers-water", color: "#1e3a8a" },
        85: { desc: "Mưa tuyết nhẹ", icon: "fa-snowflake", color: "#cbd5e1" },
        86: { desc: "Mưa tuyết dày", icon: "fa-snowflake", color: "#f1f5f9" },
        95: { desc: "Giông bão", icon: "fa-cloud-bolt", color: "#fbbf24" },
        96: { desc: "Giông kèm mưa đá nhẹ", icon: "fa-cloud-bolt", color: "#fbbf24" },
        99: { desc: "Giông kèm mưa đá mạnh", icon: "fa-cloud-bolt", color: "#f59e0b" }
    };

    // Load History from LocalStorage
    let searchHistory = JSON.parse(localStorage.getItem("weather_history")) || [];

    // Render History Tags
    const renderHistory = () => {
        historyTags.innerHTML = "";
        if (searchHistory.length === 0) {
            historyTags.innerHTML = `<span style="font-size: 0.85rem; color: var(--text-muted);">Chưa có lịch sử</span>`;
            return;
        }
        searchHistory.forEach(city => {
            const tag = document.createElement("button");
            tag.className = "history-tag";
            tag.innerHTML = `<i class="fa-solid fa-clock-rotate-left"></i> ${city}`;
            tag.addEventListener("click", () => {
                cityInput.value = city;
                fetchWeather(city);
            });
            historyTags.appendChild(tag);
        });
    };

    // Save search term to LocalStorage
    const saveToHistory = (city) => {
        // Format city name (Capitalize first letters)
        const formattedCity = city.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        
        // Remove duplicate if exists
        searchHistory = searchHistory.filter(item => item.toLowerCase() !== formattedCity.toLowerCase());
        
        // Add to front of array
        searchHistory.unshift(formattedCity);
        
        // Limit to 5
        if (searchHistory.length > 5) {
            searchHistory.pop();
        }
        
        localStorage.setItem("weather_history", JSON.stringify(searchHistory));
        renderHistory();
    };

    // State Renderers
    const showLoading = () => {
        weatherCard.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Đang tải dữ liệu thời tiết...</p>
            </div>
        `;
    };

    const showError = (message) => {
        weatherCard.innerHTML = `
            <div class="error-state">
                <i class="fa-solid fa-circle-exclamation"></i>
                <h3>Đã xảy ra lỗi</h3>
                <p>${message}</p>
            </div>
        `;
    };

    const showWeather = (weatherData, city, country) => {
        const temp = Math.round(weatherData.temperature_2m);
        const feel = Math.round(weatherData.apparent_temperature);
        const humidity = weatherData.relative_humidity_2m;
        const wind = weatherData.wind_speed_10m;
        const code = weatherData.weather_code;
        const isDay = weatherData.is_day;
        
        const mapped = weatherMap[code] || { desc: "Thời tiết không xác định", icon: "fa-cloud", color: "#94a3b8" };
        
        // Determine sun or moon for general weather codes
        let iconName = mapped.icon;
        if (code === 0) {
            iconName = isDay ? "fa-sun" : "fa-moon";
        } else if (code === 1 || code === 2) {
            iconName = isDay ? "fa-cloud-sun" : "fa-cloud-moon";
        }

        weatherCard.innerHTML = `
            <div class="success-state">
                <div class="location-info">
                    <h2 class="city-name">${city}</h2>
                    <span class="country-name">${country}</span>
                </div>
                
                <div class="weather-main">
                    <i class="fa-solid ${iconName} weather-icon-large" style="color: ${mapped.color}"></i>
                    <div class="temperature-display">
                        ${temp}<span class="temp-unit">°C</span>
                    </div>
                    <div class="weather-description">${mapped.desc}</div>
                </div>

                <div class="weather-details-grid">
                    <div class="detail-item">
                        <i class="fa-solid fa-temperature-half"></i>
                        <div class="detail-info">
                            <span class="detail-label">Cảm giác</span>
                            <span class="detail-value">${feel}°C</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fa-solid fa-droplet"></i>
                        <div class="detail-info">
                            <span class="detail-label">Độ ẩm</span>
                            <span class="detail-value">${humidity}%</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fa-solid fa-wind"></i>
                        <div class="detail-info">
                            <span class="detail-label">Gió</span>
                            <span class="detail-value">${wind} km/h</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fa-solid fa-circle-info"></i>
                        <div class="detail-info">
                            <span class="detail-label">Mã vĩ độ</span>
                            <span class="detail-value">${isDay ? "Ban ngày" : "Ban đêm"}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    // Main API Calling Function
    const fetchWeather = async (cityName) => {
        if (!navigator.onLine) {
            showError("Bạn đang ngoại tuyến. Vui lòng kiểm tra lại kết nối mạng!");
            return;
        }

        showLoading();

        try {
            // Step 1: Geocoding API
            const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
            const geoResponse = await fetch(geoUrl);
            
            if (!geoResponse.ok) {
                throw new Error("Không thể kết nối tới dịch vụ tìm kiếm vị trí.");
            }

            const geoData = await geoResponse.json();
            
            if (!geoData.results || geoData.results.length === 0) {
                throw new Error(`Không tìm thấy thành phố "${cityName}". Vui lòng thử lại!`);
            }

            const location = geoData.results[0];
            const { latitude, longitude, name: foundName, country } = location;

            // Step 2: Weather API
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=auto`;
            const weatherResponse = await fetch(weatherUrl);

            if (!weatherResponse.ok) {
                throw new Error("Không thể kết nối tới dịch vụ thời tiết.");
            }

            const weatherData = await weatherResponse.json();

            if (!weatherData.current) {
                throw new Error("Không có dữ liệu thời tiết hiện tại cho vị trí này.");
            }

            // Render details
            showWeather(weatherData.current, foundName, country);
            saveToHistory(cityName);

        } catch (error) {
            showError(error.message || "Đã xảy ra lỗi không xác định.");
        }
    };

    // Event Listeners
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    // Initial render of history
    renderHistory();
});
