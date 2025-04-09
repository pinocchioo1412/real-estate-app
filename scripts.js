const API_URL = 'http://localhost:3001';

// Hàm để lấy dữ liệu bất động sản
async function fetchListings() {
    try {
        const response = await fetch(`${API_URL}/listings`);
        const data = await response.json();
        renderListings(data);
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
}

// Hàm để hiển thị dữ liệu bất động sản
function renderListings(listings) {
    const container = document.getElementById('listingsContainer');
    container.innerHTML = '';

    listings.forEach(listing => {
        const listingCard = document.createElement('div');
        listingCard.className = 'listing-card';

        listingCard.innerHTML = `
            <div class="listing-image">
                <img src="${listing.image}" alt="${listing.title}">
                <span class="listing-tag">${listing.tag}</span>
            </div>
            <div class="listing-content">
                <div class="listing-price">${listing.price}</div>
                <h3 class="listing-title">${listing.title}</h3>
                <div class="listing-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${listing.location}
                </div>
                <div class="listing-features">
                    <div class="feature">
                        <i class="fas fa-bed"></i>
                        ${listing.bedrooms} Phòng ngủ
                    </div>
                    <div class="feature">
                        <i class="fas fa-bath"></i>
                        ${listing.bathrooms} Phòng tắm
                    </div>
                    <div class="feature">
                        <i class="fas fa-vector-square"></i>
                        ${listing.area} m²
                    </div>
                </div>
            </div>
        `;
        container.appendChild(listingCard);
    });
}

// Gọi hàm để lấy dữ liệu khi trang được tải
document.addEventListener('DOMContentLoaded', fetchListings);

// Thêm sự kiện click vào nút tìm kiếm
document.querySelector('.search-btn').addEventListener('click', async (e) => {
    e.preventDefault();
    const keyword = document.querySelector('.search-input').value;
    try {
        const response = await fetch(`${API_URL}/search?keyword=${keyword}`);
        const data = await response.json();
        renderListings(data);
    } catch (error) {
        console.error('Error searching listings:', error);
    }
});
