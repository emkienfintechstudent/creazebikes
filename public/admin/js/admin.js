function updateStatus(object) {
    axios.post('/admin/update/status', object)
    
    .then(res => {
            // Xử lý phản hồi từ máy chủ nếu cần
        })
        .catch(err => {
            // Xử lý lỗi nếu có
        });
}

// Lặp qua tất cả các phần tử select có class là 'order-status-select'
document.querySelectorAll('.order-status-select').forEach(select => {
    // Gắn sự kiện change vào mỗi phần tử select
    select.addEventListener('change', function() {
        $('.alert-update-cart').css("display", "block");
							setTimeout(function () {
								$('.alert-update-cart').css("display", "none");
							}, 1000);
        // Lấy giá trị mới của trạng thái đơn hàng từ select
        const newStatus = this.value;
        console.log(newStatus);
        // Tạo đối tượng đơn hàng để gửi đi
        const order = {
            id: this.dataset.orderId,
            status: newStatus,
            table: 'carts'
        };
        console.log(order)
        // Gọi hàm để cập nhật trạng thái đơn hàng
        updateStatus(order)
    });
});

// Lặp qua tất cả các phần tử select có class là 'order-status-select'
document.querySelectorAll('.user-status-select').forEach(select => {
    // Gắn sự kiện change vào mỗi phần tử select
    select.addEventListener('change', function() {
        $('.alert-update-user').css("display", "block");
							setTimeout(function () {
								$('.alert-update-user').css("display", "none");
							}, 1000);
        // Lấy giá trị mới của trạng thái user  từ select
        const newStatus = this.value;
        // console.log(newStatus);
        // Tạo đối tượng người dùng để gửi đi
        const user = {
            id: this.dataset.userId,
            status: newStatus,
            table: 'users'
        };
        console.log(user)
        // Gọi hàm để cập nhật trạng thái nguời dùng
        updateStatus(user)
    });
});


function updateAdminRole(admin) {
    axios.post('/admin/admin/role', admin)
    
    .then(res => {
            // Xử lý phản hồi từ máy chủ nếu cần
        })
        .catch(err => {
            // Xử lý lỗi nếu có
        });
}
document.querySelectorAll('.user-role-select').forEach(select => {
    select.addEventListener('change', function() {
        $('.alert-update-role-admin').css("display", "block");
        setTimeout(function () {
            $('.alert-update-role-admin').css("display", "none");
        }, 1000);
        const newRole = this.value
        console.log(this.dataset)
        console.log(newRole)
        const admin = {
           adminId : this.dataset.adminId,
           role: newRole
        }
        updateAdminRole(admin)
    })
})

