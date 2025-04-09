// Xử lý đăng tin bất động sản
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra đăng nhập trước khi hiển thị form
    const loginPrompt = document.getElementById('loginPrompt');
    const addListingForm = document.getElementById('addListingForm');
    
    if (localStorage.getItem('userEmail')) {
        if (loginPrompt) loginPrompt.classList.add('d-none');
        if (addListingForm) addListingForm.classList.remove('d-none');
    } else {
        if (loginPrompt) loginPrompt.classList.remove('d-none');
        if (addListingForm) addListingForm.classList.add('d-none');
        return;
    }
    
    // Xử lý form đăng tin
    if (addListingForm) {
        addListingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newListing = {
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                price: parseInt(document.getElementById('price').value),
                area: parseInt(document.getElementById('area').value),
                type: document.getElementById('type').value,
                location: document.getElementById('location').value,
                image: document.getElementById('imageUrl').value || 'https://via.placeholder.com/300x200?text=Bất+Động+Sản',
                contact: document.getElementById('contact').value,
                createdBy: localStorage.getItem('userEmail'),
                createdAt: new Date().toISOString()
            };
            
            addListing(newListing);
        });
    }
});

function addListing(listingData) {
    fetch('http://localhost:3001/listings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showError('listingErrorMessage', data.error);
        } else {
            // Hiển thị thông báo thành công
            showSuccess('listingSuccessMessage', 'Đăng tin thành công!');
            
            // Reset form
            document.getElementById('addListingForm').reset();
            
            // Chuyển hướng sau 2 giây
            setTimeout(() => {
                window.location.href = 'listings.html';
            }, 2000);
        }
    })
    .catch(error => {
        console.error('Lỗi khi đăng tin:', error);
        showError('listingErrorMessage', 'Đã xảy ra lỗi khi đăng tin. Vui lòng thử lại sau.');
    });
}