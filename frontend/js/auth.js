// Xử lý đăng nhập và đăng ký
document.addEventListener('DOMContentLoaded', function() {
    // Form đăng nhập
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            login(email, password);
        });
    }
    
    // Form đăng ký
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                showError('regErrorMessage', 'Mật khẩu xác nhận không khớp!');
                return;
            }
            
            register(email, password);
        });
    }
});

function login(email, password) {
    fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showError('errorMessage', data.error);
        } else {
            // Lưu thông tin đăng nhập
            localStorage.setItem('userEmail', email);
            
            // Chuyển hướng về trang chủ
            window.location.href = 'index.html';
        }
    })
    .catch(error => {
        console.error('Lỗi đăng nhập:', error);
        showError('errorMessage', 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
    });
}

function register(email, password) {
    fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showError('regErrorMessage', data.error);
        } else {
            // Hiển thị thông báo thành công
            showSuccess('regSuccessMessage', 'Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
            
            // Reset form
            document.getElementById('registerForm').reset();
            
            // Chuyển hướng sau 2 giây
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    })
    .catch(error => {
        console.error('Lỗi đăng ký:', error);
        showError('regErrorMessage', 'Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.');
    });
}