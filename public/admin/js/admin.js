
function updateStatus(object) {
    axios.post('/admin/update/status', object)
    
    .then(res => {
            // Xử lý phản hồi từ máy chủ nếu cần
        })
        .catch(err => {
            // Xử lý lỗi nếu có
        });
}
// subcategories - status
document.querySelectorAll('.status-select').forEach(select => {
    // Gắn sự kiện change vào mỗi phần tử select
    select.addEventListener('change', function() {
        Swal.fire({
            icon: 'success',
            title: 'Status update successfully',
            showConfirmButton: false,
            timer: 1500, // Thời gian hiển thị thông báo (milliseconds)

        });
        // Lấy giá trị mới của trạng thái user  từ select
        const newStatus = this.value;
        // console.log(newStatus);
        // Tạo đối tượng người dùng để gửi đi
        console.log(this.dataset) 
        console.log(Object.keys(this.dataset)[0]) 
        console.log(Object.values(this.dataset)[0]) 

        const object = {
            id: Object.values(this.dataset)[0],
            status: newStatus,
            table: Object.keys(this.dataset)[0]
        };
        console.log(object)
        // Gọi hàm để cập nhật trạng thái nguời dùng
        updateStatus(object)
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
        
        Swal.fire({
            icon: 'success',
            title: 'Role update successfully',
            showConfirmButton: false,
            timer: 1500, // Thời gian hiển thị thông báo (milliseconds)

        });
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


$(document).ready(function() {
    $('.form-edit-product').submit(function(e) {
        e.preventDefault(); // Ngăn chặn gửi form mặc định
        Swal.fire({
            icon: 'success',
            title: 'Product updated',
            showConfirmButton: false,
            timer: 1500, // Thời gian hiển thị thông báo (milliseconds)

        });
        
        var formData = $(this).serialize(); // Lấy dữ liệu từ form
        var Data = {};
        formData.split('&').forEach(function(keyValue) {
        var pair = keyValue.split('=');
      Data[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
     });
        console.log(Data);
        axios.post(`/admin/product/${Data.productId}/edit`, Data)
    
        .then(res => {
                // Xử lý phản hồi từ máy chủ nếu cần
            })
            .catch(err => {
                // Xử lý lỗi nếu có
            });
    });
});



document.querySelectorAll('#subCategorySelect').forEach(select => {
    // Gắn sự kiện change vào mỗi phần tử select
    select.addEventListener('change', function() {
    
        console.log(this.value)
        console.log(this.dataset)
        const newSubcategory = this.value;
        const product = {
            productId : this.dataset.product_id,
            Subcategory: newSubcategory
         }
        axios.post(`/admin/product/updateproductsubcategory`, product)
    
        .then(res => {
                // Xử lý phản hồi từ máy chủ nếu cần
            })
            .catch(err => {
                // Xử lý lỗi nếu có
            });
    });
});