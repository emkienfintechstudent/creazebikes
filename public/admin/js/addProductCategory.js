

$(document).ready(function () {
    $(".overlay").click(function () {
        $("#form-product-category").fadeOut();
        $(".overlay").fadeOut();
    });
});

$(document).ready(function () {
    $("#formButton").click(function () {
        $("#form-product-category").fadeIn();
        $(".overlay").fadeIn();
    });
    $('#form-product-category').submit(function (e) {
        e.preventDefault(); // Ngăn chặn gửi form mặc định
        var formData = $(this).serialize(); // Get data from the form
        var Data = {};

        formData.split('&').forEach(function (keyValue) {
            var pair = keyValue.split('=');
            Data[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        });

        // Manipulate the Data object to replace "+" with spaces
        Object.keys(Data).forEach(function (key) {
            Data[key] = Data[key].replace(/\+/g, ' '); // Replace all occurrences of '+' with space
        });
        console.log(Data);
   
        axios.post("/admin/add/productcategory", Data).then(res => {
                if (res.data.message === "Category already taken") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Username already taken",

                    });
                }else{

                    Swal.fire({
                        icon: 'success',
                        title: 'Profile updated',
                        showConfirmButton: false,
                        timer: 1500, // Thời gian hiển thị thông báo (milliseconds)
        
                    });
                    $("#form-user").fadeOut();
                    $(".overlay").fadeOut();
                }

            })
                .catch(err => {
                    console.log(err)
                })
        }
    )
    });

