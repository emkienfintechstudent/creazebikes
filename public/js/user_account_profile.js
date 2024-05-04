$(document).ready(function () {
    $('.form_save_user_profile').submit(function (e) {
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
            axios.post("/user/account/profile/save", Data).then(res => {
                
               user_name.innerText  = res.data.name
            })
            .catch(err => {
            })
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "saved account failedly,Date of birth is not in correct format",

              });
        }
        
    });
});