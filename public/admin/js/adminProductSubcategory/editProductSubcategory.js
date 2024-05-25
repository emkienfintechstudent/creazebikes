$(document).ready(function() {
    $('.form-edit-product-subcategory').submit(function(e) {
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
        axios.post(`/admin/productsubcategory/${Data.id}/edit`, Data)
    
        .then(res => {
                // Xử lý phản hồi từ máy chủ nếu cần
            })
            .catch(err => {
                // Xử lý lỗi nếu có
            });
    });
});