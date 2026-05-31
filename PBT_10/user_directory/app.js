// App.js for User Directory CRUD

// --- Global State ---
let allUsers = [];

// --- API Layer ---
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);
        if (!response.ok) {
            throw new Error(`Lấy danh sách thất bại: HTTP ${response.status}`);
        }
        return await response.json();
    },
    
    async getUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`);
        if (!response.ok) {
            throw new Error(`Lấy thông tin chi tiết thất bại: HTTP ${response.status}`);
        }
        return await response.json();
    },
    
    async createUser(data) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) {
            throw new Error(`Thêm thành viên thất bại: HTTP ${response.status}`);
        }
        return await response.json();
    },
    
    async updateUser(id, data) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) {
            throw new Error(`Cập nhật thông tin thất bại: HTTP ${response.status}`);
        }
        return await response.json();
    },
    
    async deleteUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Xóa thành viên thất bại: HTTP ${response.status}`);
        }
        return true; // JSONPlaceholder returns empty object {} on delete
    }
};

// --- UI Layer ---
const ui = {
    usersGrid: document.getElementById("users-grid"),

    renderUsers(users) {
        this.usersGrid.innerHTML = "";
        if (users.length === 0) {
            this.usersGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
                    <i class="fa-regular fa-folder-open" style="font-size: 3rem; margin-bottom: 12px;"></i>
                    <p>Không tìm thấy thành viên nào khớp với tìm kiếm.</p>
                </div>
            `;
            return;
        }

        users.forEach(user => {
            const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : "U";
            const card = document.createElement("div");
            card.className = "user-card";
            card.setAttribute("data-id", user.id);
            card.innerHTML = `
                <div class="user-header">
                    <div class="user-avatar">${initials}</div>
                    <div class="user-title">
                        <span class="user-name">${user.name}</span>
                        <span class="user-email">${user.email}</span>
                    </div>
                </div>
                <div class="user-details">
                    <div class="detail-row">
                        <i class="fa-solid fa-phone"></i>
                        <span class="detail-text">${user.phone || 'N/A'}</span>
                    </div>
                    <div class="detail-row">
                        <i class="fa-solid fa-globe"></i>
                        <span class="detail-text">${user.website || 'N/A'}</span>
                    </div>
                </div>
                <div class="user-actions">
                    <button class="edit-btn" onclick="handleEditUser(${user.id})">
                        <i class="fa-solid fa-pen-to-square"></i> Sửa
                    </button>
                    <button class="delete-btn" onclick="handleDeleteUser(${user.id})">
                        <i class="fa-solid fa-trash-can"></i> Xóa
                    </button>
                </div>
            `;
            this.usersGrid.appendChild(card);
        });
    },
    
    showLoading() {
        this.usersGrid.innerHTML = "";
        for (let i = 0; i < 6; i++) {
            const skeleton = document.createElement("div");
            skeleton.className = "skeleton-card";
            skeleton.innerHTML = `
                <div class="user-header">
                    <div class="skeleton-avatar"></div>
                    <div class="user-title">
                        <div class="skeleton-text title"></div>
                        <div class="skeleton-text subtitle"></div>
                    </div>
                </div>
                <div class="user-details">
                    <div class="skeleton-text detail"></div>
                    <div class="skeleton-text detail" style="width: 60%"></div>
                </div>
                <div class="user-actions">
                    <div class="skeleton-text button"></div>
                    <div class="skeleton-text button"></div>
                </div>
            `;
            this.usersGrid.appendChild(skeleton);
        }
    },
    
    hideLoading() {
        // Handled automatically by rendering the new content
    },
    
    showError(message) {
        this.showToast(message, "toast-error");
    },
    
    showSuccess(message) {
        this.showToast(message, "toast-success");
    },

    showToast(message, typeClass) {
        const container = document.getElementById("toast-container");
        const toast = document.createElement("div");
        toast.className = `toast ${typeClass}`;
        
        let icon = `<i class="fa-solid fa-circle-check"></i>`;
        if (typeClass === "toast-error") {
            icon = `<i class="fa-solid fa-circle-exclamation"></i>`;
        }

        toast.innerHTML = `
            ${icon}
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Remove toast after 4s
        setTimeout(() => {
            toast.classList.add("fade-out");
            toast.addEventListener("animationend", () => {
                toast.remove();
            });
        }, 4000);
    }
};

// --- DOM elements and Controllers ---
const userModal = document.getElementById("user-modal");
const userForm = document.getElementById("user-form");
const modalTitle = document.getElementById("modal-title");
const searchInput = document.getElementById("search-input");

const openModal = () => userModal.classList.add("active");
const closeModal = () => {
    userModal.classList.remove("active");
    userForm.reset();
    document.getElementById("user-id").value = "";
};

// Open model on add click
document.getElementById("add-user-btn").addEventListener("click", () => {
    modalTitle.textContent = "Thêm thành viên mới";
    openModal();
});

// Close modal triggers
document.getElementById("close-modal-btn").addEventListener("click", closeModal);
document.getElementById("cancel-btn").addEventListener("click", closeModal);
userModal.addEventListener("click", (e) => {
    if (e.target === userModal) closeModal();
});

// Load Users initially
const loadUsers = async () => {
    ui.showLoading();
    try {
        allUsers = await api.getUsers();
        ui.renderUsers(allUsers);
    } catch (error) {
        ui.showError(error.message);
    }
};

// Add / Edit submission
userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const userIdInput = document.getElementById("user-id").value;
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const phone = document.getElementById("user-phone").value;
    const website = document.getElementById("user-website").value;
    
    const userData = { name, email, phone, website };
    
    try {
        if (userIdInput) {
            // Update mode
            const id = parseInt(userIdInput);
            ui.showSuccess("Đang gửi yêu cầu cập nhật...");
            closeModal();

            await api.updateUser(id, userData);
            
            // Update client-side state
            const index = allUsers.findIndex(u => u.id === id);
            if (index !== -1) {
                allUsers[index] = { ...allUsers[index], ...userData };
                ui.renderUsers(filterUsersBySearch(searchInput.value));
            }
            ui.showSuccess("Cập nhật thành viên thành công!");
        } else {
            // Create mode
            ui.showSuccess("Đang gửi yêu cầu tạo mới...");
            closeModal();

            const newUser = await api.createUser(userData);
            
            // Generate a random ID > 10 for client-side state mapping
            newUser.id = allUsers.length > 0 ? Math.max(...allUsers.map(u => u.id)) + 1 : 11;
            
            // Add client-side state
            allUsers.unshift(newUser);
            ui.renderUsers(filterUsersBySearch(searchInput.value));
            ui.showSuccess("Thêm thành viên thành công!");
        }
    } catch (error) {
        ui.showError(error.message);
    }
});

// Edit Button Action
window.handleEditUser = async (id) => {
    const user = allUsers.find(u => u.id === id);
    if (!user) {
        ui.showError("Không tìm thấy dữ liệu cục bộ.");
        return;
    }
    
    modalTitle.textContent = "Chỉnh sửa thành viên";
    document.getElementById("user-id").value = user.id;
    document.getElementById("user-name").value = user.name || "";
    document.getElementById("user-email").value = user.email || "";
    document.getElementById("user-phone").value = user.phone || "";
    document.getElementById("user-website").value = user.website || "";
    
    openModal();
};

// Delete Button Action
window.handleDeleteUser = async (id) => {
    const user = allUsers.find(u => u.id === id);
    if (!user) return;
    
    const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa thành viên "${user.name}"?`);
    if (!confirmDelete) return;
    
    try {
        // Wait, JSONPlaceholder only allows delete requests on IDs <= 10. If we created a client-side user with ID > 10,
        // calling DELETE /users/11 will return 404. Let's handle mock delete safely.
        if (id <= 10) {
            await api.deleteUser(id);
        }
        
        allUsers = allUsers.filter(u => u.id !== id);
        ui.renderUsers(filterUsersBySearch(searchInput.value));
        ui.showSuccess("Đã xóa thành viên thành công!");
    } catch (error) {
        ui.showError(error.message);
    }
};

// Search Filter Helper
const filterUsersBySearch = (query) => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return allUsers;
    return allUsers.filter(user => 
        (user.name && user.name.toLowerCase().includes(cleanQuery)) || 
        (user.email && user.email.toLowerCase().includes(cleanQuery))
    );
};

// Search Keyup
searchInput.addEventListener("input", (e) => {
    const filtered = filterUsersBySearch(e.target.value);
    ui.renderUsers(filtered);
});

// Init
loadUsers();
