// Tải dữ liệu danh sách bất động sản
document.addEventListener('DOMContentLoaded', function() {
    fetchListings();
    
    // Thêm sự kiện tìm kiếm
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            fetchListings();
        });
    }
    
    // Thêm sự kiện sắp xếp
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            fetchListings();
        });
    }
    
    // Thêm sự kiện lọc theo loại
    const typeFilter = document.getElementById('typeFilter');
    if (typeFilter) {
        typeFilter.addEventListener('change', function() {
            fetchListings();
        });
    }
});

function fetchListings() {
    const container = document.getElementById('listingContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="text-center w-100">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Đang tải...</span>
            </div>
        </div>
    `;
    
    fetch('http://localhost:3001/listings')
        .then(response => response.json())
        .then(data => {
            // Lọc và sắp xếp dữ liệu
            let filteredData = filterData(data);
            renderListings(filteredData);
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu:', error);
            container.innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-danger">Không thể tải dữ liệu. Vui lòng thử lại sau.</p>
                </div>
            `;
        });
}

function filterData(data) {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const typeFilter = document.getElementById('typeFilter');
    
    let result = [...data];
    
    // Lọc theo từ khóa tìm kiếm
    if (searchInput && searchInput.value) {
        const searchTerm = searchInput.value.toLowerCase();
        result = result.filter(item => 
            (item.title && item.title.toLowerCase().includes(searchTerm)) || 
            (item.description && item.description.toLowerCase().includes(searchTerm)) ||
            (item.location && item.location.toLowerCase().includes(searchTerm))
        );
    }
    
    // Lọc theo loại bất động sản
    if (typeFilter && typeFilter.value) {
        result = result.filter(item => item.type === typeFilter.value);
    }
    
    // Sắp xếp
    if (sortSelect && sortSelect.value) {
        switch (sortSelect.value) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                result.sort((a, b) => b.id - a.id);
                break;
        }
    }
    
    return result;
}

function renderListings(listings) {
    const container = document.getElementById('listingContainer');
    
    if (listings.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p>Không tìm thấy bất động sản nào phù hợp.</p></div>';
        return;
    }
    
    container.innerHTML = '';
    
    listings.forEach(listing => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card h-100">
                <img src="${listing.image || 'https://via.placeholder.com/300x200?text=Bất+Động+Sản'}" class="card-img-top" alt="${listing.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${listing.title || 'Chưa có tiêu đề'}</h5>
                    <p class="card-text">${listing.description ? listing.description.substring(0, 100) + '...' : 'Chưa có mô tả'}</p>
                    <p class="card-text"><strong>Giá:</strong> ${formatCurrency(listing.price)} VNĐ</p>
                    <p class="card-text"><strong>Diện tích:</strong> ${listing.area || 'N/A'} m²</p>
                    <p class="card-text"><strong>Địa điểm:</strong> ${listing.location || 'Chưa có thông tin'}</p>
                    <p class="card-text"><small class="text-muted">Loại BĐS: ${getPropertyTypeName(listing.type)}</small></p>
                </div>
                <div class="card-footer">
                    <a href="#" class="btn btn-primary w-100" onclick="showListingDetails(${listing.id}); return false;">Xem chi tiết</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function getPropertyTypeName(type) {
    switch(type) {
        case 'apartment': return 'Căn hộ';
        case 'house': return 'Nhà riêng';
        case 'land': return 'Đất nền';
        case 'commercial': return 'BĐS thương mại';
        default: return 'Khác';
    }
}

function showListingDetails(id) {
    // Trong một ứng dụng thực tế, đây sẽ là một trang chi tiết
    // Nhưng để đơn giản, chúng ta chỉ hiển thị một cảnh báo
    alert('Tính năng xem chi tiết đang được phát triển!\nID Bất động sản: ' + id);
}