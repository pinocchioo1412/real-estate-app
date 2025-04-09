// Kiểm tra và hiển thị thông tin đăng nhập
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});

// Kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
    const userEmail = localStorage.getItem('userEmail');
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('userInfo');
    const userEmailElement = document.getElementById('userEmail');
    
    if (userEmail) {
        // Người dùng đã đăng nhập
        if (authButtons) authButtons.classList.add('d-none');
        if (userInfo) {
            userInfo.classList.remove('d-none');
            userEmailElement.textContent = userEmail;
        }
        
        // Thêm sự kiện đăng xuất
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                localStorage.removeItem('userEmail');
                window.location.href = 'index.html';
            });
        }
    } else {
        // Người dùng chưa đăng nhập
        if (authButtons) authButtons.classList.remove('d-none');
        if (userInfo) userInfo.classList.add('d-none');
        
        // Kiểm tra trang đăng tin và hiển thị thông báo nếu chưa đăng nhập
        const loginPrompt = document.getElementById('loginPrompt');
        const addListingForm = document.getElementById('addListingForm');
        
        if (loginPrompt && addListingForm) {
            loginPrompt.classList.remove('d-none');
            addListingForm.classList.add('d-none');
        }
    }
}

// Hàm định dạng tiền tệ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount);
}

// Hiển thị thông báo lỗi
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('d-none');
        
        // Tự động ẩn sau 5 giây
        setTimeout(() => {
            errorElement.classList.add('d-none');
        }, 5000);
    }
}

// Hiển thị thông báo thành công
function showSuccess(elementId, message) {
    const successElement = document.getElementById(elementId);
    if (successElement) {
        successElement.textContent = message;
        successElement.classList.remove('d-none');
        
        // Tự động ẩn sau 5 giây
        setTimeout(() => {
            successElement.classList.add('d-none');
        }, 5000);
    }
}