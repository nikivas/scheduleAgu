export function ajaxStudent() {
    try {
        $("#studentButton1").prop("disabled", true);
        $("#message_info").text('Загрузка расписания');
        $("#spinnerFaculty").removeClass("invisible");
        $("#spinnerFaculty").addClass("visible");
        $("#schedule").empty();
        var grupovuha = $("input[name='grupovuha']");
        var checked_grupovuha = $("input[name='grupovuha']:checked");
        if (grupovuha.length != 0) {
            //var connection_state = navigator.connection.type;
            if (navigator.onLine) {
                if (checked_grupovuha.length != 0) {
                    checked_grupovuha.each(function (index, element) {
                        var key = this.value;
                        jQuery.ajax({
                            url: 'http://raspisanie.asu.edu.ru/student/schedule/' + key,
                            type: 'POST',
                            data:{mobile:'mobile'},
                            crossDomain: true,
                            async: true,
                            timeout:15000,
                            success: function (data) {
                                var result = jQuery.parseJSON(data);
                                $("#schedule").append(result);
                                localStorage.setItem(key, result);
                            },
                            complete: function () {
                                if (index == checked_grupovuha.length - 1) {
                                    jQuery.scrollTo("#schedule", 1000);
                                    $("#studentButton1").prop('disabled', false);
                                    $("#spinnerFaculty").addClass("invisible");
                                }

                            },
                            error: function (data) {
                                var result = localStorage.getItem(key);
                                if (result != null) {
                                    $("#schedule").append(result);
                                }
                            }
                        });
                    });
                }
                else {
                    grupovuha.each(function (index, val) {
                        var key = val.value;
                        jQuery.ajax({
                            url: 'http://raspisanie.asu.edu.ru/student/schedule/' + key,
                            type: 'POST',
                            crossDomain: true,
                            async: true,
                            timeout:15000,
                            success: function (data) {
                                var result = jQuery.parseJSON(data);
                                $("#schedule").append(result);
                                localStorage.setItem(key, result);
                            },
                            complete: function () {
                                if (index == grupovuha.length - 1) {
                                    $("#studentButton1").prop('disabled', false);
                                    $("#spinnerFaculty").addClass("invisible");
                                    jQuery.scrollTo("#schedule", 1000);
                                }
                            },
                            error: function () {
                                var result = localStorage.getItem(key);
                                if (result != null) { $("#schedule").append(result); }
                            }
                        });
                    });
                }
            }
            else {
                if (checked_grupovuha.length != 0) {
                    checked_grupovuha.each(function () {
                        var key = this.value;
                        var result = localStorage.getItem(key);
                        if (result != null) { $("#schedule").append(result); }
                        else {
                            $("#schedule").append("<p>Соединение с интернетом отсутсвует." +
                                "Локально расписание не сохраненно</p>");
                        }
                    });
                }
                else {
                    grupovuha.each(function (key, val) {
                        var key = val.value;
                        var result = localStorage.getItem(key);
                        if (result != null) { $("#schedule").append(result); }
                        else { $("#schedule").append("<p>Локально расписание не сохраненно</p>"); }

                    });
                }
                $("#studentButton1").prop('disabled', false);
                $("#spinnerFaculty").addClass("invisible");
                jQuery.scrollTo("#schedule", 1000);
            }
        }
        else {
            $("#schedule").append("<p>Расписание отсутсвует</p>");
            $("#studentButton1").prop('disabled', false);
            $("#spinnerFaculty").addClass("invisible");
            jQuery.scrollTo("#schedule", 1000);

        }
    }
    catch (ex) {
        $('#spinnerFaculty').addClass('invisible');
        $("#schedule").html(ex);
        $("#studentButton1").prop('disabled', 'false');
    }
}
export function findByGroupNameClicked() {
    $("#schedule2").empty();
    var groupName = $("#grup").val();
    groupName = groupName.replace('-', '');
    groupName = groupName.trim();
    groupName = groupName.toUpperCase();
    if (groupName != '') {
        findScheduleByGroupName(groupName);
    }
    return true;
};

export function findScheduleByGroupName(groupName) {
    try {
        var group = groupName;
        localStorage.setItem('grup_name', group);
        $("#studentButton2").prop('disabled', true);
        $("#spinnerFaculty").removeClass("invisible");
        $("#spinnerFaculty").addClass("visible");
        $("#message_info").text('Поиск расписания');
        if (navigator.onLine) {
            jQuery.ajax({
                url: 'http://raspisanie.asu.edu.ru/student/schedule/' + group,
                type: 'POST',
                data:{mobile:'mobile'},
                timeout:15000,
                success: function (data) {
                    var result = jQuery.parseJSON(data);
                    localStorage.setItem(group, result);
                    $("#schedule2").append(result);
                },
                complete: function () {
                    $("#spinnerFaculty").addClass("invisible");
                    jQuery.scrollTo("#schedule2", 1000);
                    $("#studentButton2").prop('disabled', false);
                },
                error: function () {
                    var result = localStorage.getItem(group);
                    if (result != null) { $("#schedule2").append(result); }
                    else {
                        $("#schedule2").append('Расписание не найдено. Отсутствует запись в кэше.');
                    }
                    $("#studentButton2").prop('disabled', false);
                }
            });
        }
        else {

            var selected_schedule = localStorage.getItem(group);
            if (selected_schedule != null) {
                $("#schedule2").append(selected_schedule);
            }
            else {
                $("#schedule2").append('Отсутствует Соединение с сервером. Отсутствует запись в кэше.');
            }
            $("#spinnerFaculty").addClass("invisible");
            jQuery.scrollTo("#schedule2", 1000);
            $("#studentButton2").prop('disabled', false);
        }
    }
    catch (ex) {
        $("#schedule2").append(ex);
    }
}
