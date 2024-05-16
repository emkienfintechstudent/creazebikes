

$(document).ready(function () {
    $(".overlay").click(function () {
        $("#form-product").fadeOut();
        $(".overlay").fadeOut();
    });
});

$(document).ready(function () {
    $("#formButton").click(function () {
        $("#form-product").fadeIn();
        $(".overlay").fadeIn();
    });
    $('#form-product').submit(function (e) {
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
   
        axios.post("/admin/add/product", Data).then(res => {
                if (res.data.message === "Product already taken") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Product already taken",

                    });
                }else if(res.data.message === "Success"){

                    Swal.fire({
                        icon: 'success',
                        title: 'Add Product Subcategory',
                        showConfirmButton: false,
                        timer: 1500, // Thời gian hiển thị thông báo (milliseconds)
        
                    });
                    $("#form-product").fadeOut();
                    $(".overlay").fadeOut();
                }

            })
                .catch(err => {
                    console.log(err)
                })
        }
    )
    });

