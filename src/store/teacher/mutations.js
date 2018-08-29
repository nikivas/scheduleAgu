export function findTeacherClicked() {
    $("#schedule").empty();
    if (($("#log").val()) != '') {
        findScheduleOfTeacher($("#log").val(), true);
    }
    else {
        if ($("#birds").val() != '' && $("#birds").val().length >= 3) {
            var bird_name = $("#birds").val();
            var birds = JSON.parse(localStorage.getItem('birds'));
            var for_research_array = birds.filter(function (item) {
                if (item.fio.toLowerCase().includes(bird_name.toLowerCase())) {
                    return true;
                }
            });
            if (for_research_array.length != 0) {
                for_research_array.forEach(function (element, index) {
                    $("#search_teacher").prop('disabled', true);
                    $("#teacher_spinner").removeClass('hidden');
                    findScheduleOfTeacher(element.id, false);
                });
            }
            else {
                $("#schedule").append("Данные Отсутствуют");
            }
        }
    }
};
export function findScheduleOfTeacher(id_teacher, _scroll) {
    try {
        $("#search_teacher").prop('disabled', true);
        $("#search_teacher").text('Идет загрузка...');
        var save_teacher = $("#birds").val();
        if(save_teacher!='' && save_teacher.length>=3)
        {
            localStorage.setItem('my_liben_teacher', save_teacher);
            if (navigator.onLine) {
                $.ajax({
                    url: 'http://raspisanie.asu.edu.ru/teacher/getschedulejson/',
                    type: 'POST',
                    data: { id: id_teacher },
                    success: function (data) {
                        var result = JSON.parse(data);
                        if (!result.includes('отсутств')) {
                            localStorage.setItem(save_teacher, data);
                        }
                        $("#schedule").append(result);
                    },
                    complete: function () {
                        $("#spinnerTeacher").addClass('invisible');
                        $("#search_teacher").prop('disabled', false);
                        $("#search_teacher").text('ПОКАЗАТЬ');
                        $("#teacher_spinner").addClass('hidden');
                        if (_scroll == true) {
                            jQuery.scrollTo("#schedule", 1000);
                        }
                    },
                    error: function (err) {
                        var result = JSON.parse(localStorage.getItem(save_teacher));
                        result != null ? $("#schedule").append(result) : $("#schedule").append(err);
                        $("#search_teacher").prop('disabled', false);
                        $("#search_teacher").text('ПОКАЗАТЬ');
                    }
                });
            }
            else {
                var result = JSON.parse(localStorage.getItem(save_teacher));
                result != null ? $("#schedule").append(result)
                    : $("#schedule").append("<p>Отсутствует соединение с сервером</p>");
                $("#search_teacher").prop('disabled', false);
                jQuery.scrollTo("#schedule", 1000);
                $("#search_teacher").text('ПОКАЗАТЬ');
            }
        }
    }
    catch (e) {
        $("#schedule").append(e);
    }
}