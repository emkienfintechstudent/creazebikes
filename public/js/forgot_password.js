$(document).ready(function () {
    $('.forgot_password').submit(function (e) {
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

        axios.post("/user/login/password", Data).then(res => {
            if (res.data.message == "email do not match") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Email do not match",
                });
            }else{
                Swal.fire({
                    icon: 'success',
                    title: 'New password is sent to your email, check it!',
                    showConfirmButton: false,
                    timer: 2500, // Thời gian hiển thị thông báo (milliseconds)
    
                });
            }
        }).catch(err => {
            console.error(err);
        });
    });
});