

$(document).ready(function () {
    $(".overlay").click(function () {
        $("#form-admin").fadeOut();
        $(".overlay").fadeOut();
    });
});

$(document).ready(function () {
    $("#formButton").click(function () {
        $("#form-admin").fadeIn();
        $(".overlay").fadeIn();
    });
    $('#form-admin').submit(function (e) {
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
        var birthDate = Data.birth_date; // Example birth date

        // Regular expression to match the dd/mm/yyyy format
        var dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        if (dateRegex.test(birthDate)) {
            console.log('Birth date is in the correct format (dd/mm/yyyy).');
            Swal.fire({
                icon: 'success',
                title: 'Profile updated',
                showConfirmButton: false,
                timer: 1500, // Thời gian hiển thị thông báo (milliseconds)

            });
            axios.post("/admin/add/admin", Data).then(res => {
                if (res.data.message === "Username already taken") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Username already taken",

                    });
                }else{
                    $("#form-admin").fadeOut();
                    $(".overlay").fadeOut();
                }

            })
                .catch(err => {
                    console.log(err)
                })
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "saved account failedly, date of birth is not in correct format",

            });
        }

    });
});
