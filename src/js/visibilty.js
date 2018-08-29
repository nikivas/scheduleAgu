/*показ расписание общее, и отдельно по расписанию, блочное расписание*/
$(document).on('click',".block_first", function () {
    var str = $(this).attr('id');
    str = str.substring(str.lastIndexOf("_") + 1, str.length);
    visibility_block('block_first_' + str, 'block_second_' + str, 'full_schedule_' + str);
    visibility_date('oneDate', 'twoDate');
    $('#date_learning').addClass('hide_schedule');
  });
  $(document).on('click','.block_second', function () {
    var str = $(this).attr('id');
    var str = str.substring(str.lastIndexOf("_") + 1, str.length);
    visibility_block('block_second_' + str, 'block_first_' + str, 'full_schedule_' + str);
    visibility_date('twoDate', 'oneDate');
    $('#date_learning').addClass('hide_schedule');
  });
  $(document).on('click','.full_schedule', function () {
    var str = $(this).attr('id');
    var str = str.substring(str.lastIndexOf("_") + 1, str.length);
    visibility_block('full_schedule_' + str, 'block_first_' + str, 'block_second_' + str);
    visibility_date('', 'oneDate');
    visibility_date('', 'twoDate');
    $('#date_learning').removeClass('hide_schedule');
  });
  
  export function visibility_date(oneDate, twoDate) {
    $("#" + twoDate).removeClass('view_schedule');
    $("#" + oneDate).removeClass('hide_schedule');
    $("#" + oneDate).addClass('view_schedule');
    $("#" + twoDate).addClass('hide_schedule');
  }
  
  export function visibility_block(oneBlock, twoBlock, threeBlock) {
    $("#" + oneBlock).css('color', 'black');
    $("#" + twoBlock).css('color', '#919397');
    $("#" + threeBlock).css('color', '#919397');
    $("#" + oneBlock + '_div').removeClass('hide_schedule');
    $("#" + twoBlock + '_div').removeClass('view_schedule');
    $("#" + threeBlock + '_div').removeClass('view_schedule');
    $("#" + oneBlock + '_div').addClass('view_schedule');
    $("#" + twoBlock + '_div').addClass('hide_schedule');
    $("#" + threeBlock + '_div').addClass('hide_schedule');
  }	