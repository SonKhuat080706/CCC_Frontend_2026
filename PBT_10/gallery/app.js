// App.js for Infinite Scroll Gallery

document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.getElementById("gallery-grid");
    const loadTrigger = document.getElementById("load-trigger");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxAuthor = document.getElementById("lightbox-author");
    const lightboxClose = document.getElementById("lightbox-close");

    let page = 1;
    let isLoading = false;
    const limit = 20;

    // --- Lazy Loading Intersection Observer ---
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute("data-src");
                
                if (src) {
                    img.src = src;
                    img.addEventListener("load", () => {
                        img.classList.add("loaded");
                        // Remove placeholder skeleton after load completes
                        const skeleton = img.previousElementSibling;
                        if (skeleton && skeleton.classList.contains("placeholder-skeleton")) {
                            skeleton.style.opacity = "0";
                            setTimeout(() => skeleton.remove(), 300);
                        }
                    });
                }
                
                // Stop observing this image
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: "0px 0px 200px 0px" // Load slightly before they scroll into view
    });

    // --- Render Photos Helper ---
    const renderPhotos = (photos) => {
        photos.forEach(photo => {
            const id = photo.id;
            const author = photo.author;
            
            // Optimized thumb size for grid (400x300), original/larger size for lightbox
            const thumbUrl = `https://picsum.photos/id/${id}/400/300`;
            const fullUrl = `https://picsum.photos/id/${id}/1000/750`;

            const item = document.createElement("div");
            item.className = "gallery-item";
            item.innerHTML = `
                <div class="img-wrapper">
                    <div class="placeholder-skeleton"></div>
                    <img class="gallery-img" data-src="${thumbUrl}" alt="Photo by ${author}">
                    <div class="img-overlay">
                        <div class="img-info">
                            <span class="img-author">${author}</span>
                        </div>
                    </div>
                </div>
            `;

            // Open Lightbox on Click
            item.addEventListener("click", () => {
                lightboxImg.src = fullUrl;
                lightboxAuthor.textContent = `Tác phẩm của: ${author}`;
                lightbox.classList.add("active");
            });

            galleryGrid.appendChild(item);

            // Observe the image inside this card
            const img = item.querySelector(".gallery-img");
            lazyImageObserver.observe(img);
        });
    };

    // --- Load Photos from API ---
    const loadMorePhotos = async () => {
        if (isLoading) return;
        isLoading = true;
        loadTrigger.style.display = "flex";

        try {
            const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            
            if (data.length > 0) {
                renderPhotos(data);
                page++;
            } else {
                // No more photos left
                loadTrigger.innerHTML = `<span>Đã xem toàn bộ tác phẩm nghệ thuật.</span>`;
                infiniteScrollObserver.unobserve(loadTrigger);
            }
        } catch (error) {
            console.error("Lỗi khi load gallery:", error);
            // Show click-to-retry message inside trigger
            loadTrigger.innerHTML = `
                <button id="retry-btn" style="background: none; border: 1px solid var(--accent); color: var(--accent); padding: 8px 16px; border-radius: 8px; cursor: pointer; font-family: inherit;">
                    Lỗi tải ảnh. Click để tải lại
                </button>
            `;
            const retryBtn = document.getElementById("retry-btn");
            if (retryBtn) {
                retryBtn.addEventListener("click", () => {
                    loadTrigger.innerHTML = `
                        <div class="loader-circle"></div>
                        <span>Đang tải thêm tác phẩm nghệ thuật...</span>
                    `;
                    loadMorePhotos();
                });
            }
        } finally {
            isLoading = false;
        }
    };

    // --- Infinite Scroll Intersection Observer ---
    const infiniteScrollObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isLoading) {
            loadMorePhotos();
        }
    }, {
        rootMargin: "0px 0px 400px 0px" // Trigger loading earlier
    });

    // Start observing the load trigger
    infiniteScrollObserver.observe(loadTrigger);

    // --- Lightbox Control ---
    const closeLightbox = () => {
        lightbox.classList.remove("active");
        setTimeout(() => {
            lightboxImg.src = ""; // Clean up source
        }, 300);
    };

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("active")) {
            closeLightbox();
        }
    });
});
