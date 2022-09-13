$(document).ready(() => {
    $("#signup-form").submit((e) => {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/signup",
            data: new FormData(document.querySelector("#signup-form")),
            contentType: false,
            processData: false,
            beforeSend: () => {
                $("#signup-btn").html(`<span class="spinner-border spinner-border-sm"> </span>&nbsp Creating Account.. Please Wait`);
                $("#signup-btn").attr("disabled", "disabled");
            },
            success: (response) => {
                $("#signup-btn").html(`Sign Up`);
                $("#signup-btn").removeAttr("disabled");
                //redirect to login
            },
            error: (response) => {
                $("#signup-btn").html(`Sign Up`);
                $("#signup-btn").removeAttr("disabled");
                const error = JSON.parse(response.responseJSON.text);
                if (!error.isCompanyCreated && error.message && error.message.field) {
                    $(`#signup-form .${error.message.field}`).addClass("border-danger");
                    $(`#signup-form .message-${error.message.field}`).html(`<span class='text-danger'>${error.message.label}</span>`);
                    $(`#signup-form .${error.message.field}`).on('input', function () {
                        $(`#signup-form .message-${error.message.field}`).html('');
                        $(this).removeClass('border-danger');
                    })
                }
                else {
                    $("#signup-form .main-message").html(`
                        <div class="alert alert-danger">
                            <strong>Success!</strong> Failed! Something Went Wrong...
                        </div>
                    `);
                }
                console.log(response);
                console.log(error);
            }
        })
    })


    $("#login-form").submit((e) => {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: new FormData(document.querySelector("#login-form")),
            contentType: false,
            processData: false,
            beforeSend: () => {
                $("#login-form .main-message").html("");
                $("#login-btn").html(`<span class="spinner-border spinner-border-sm"> </span>&nbsp Logging In.. Please Wait`);
                $("#login-btn").attr("disabled", "disabled");
            },
            success: (response) => {
                $("#login-btn").html(`Login`);
                $("#login-btn").removeAttr("disabled");
                console.log(response);
                //redirect to login
                if (response.isLogged) {
                    $("#login-form .main-message").html(`
                        <div class="alert alert-success">
                            <strong>Success!</strong> ${response.message}...
                        </div>
                    `);
                    window.location = "/profile";
                }
                else {
                    $("#login-form .main-message").html(`
                    <div class="alert alert-warning">
                            <strong> ${error.message}...</strong>
                        </div>
                    `)
                }
            },
            error: (response) => {
                $("#login-btn").html(`Login`);
                $("#login-btn").removeAttr("disabled");
                const error = response.responseJSON;
                if (error.message) {
                    $("#login-form .main-message").html(`
                    <div class="alert alert-danger">
                            <strong>Failed!</strong> ${error.message}...
                        </div>
                    `)
                }
                else {
                    $("#login-form .main-message").html(`
                        <div class="alert alert-danger">
                            <strong>Failed!</strong> Something Went Wrong...
                        </div>
                    `);
                }
                console.log(response);
            }
        })
    })
})

