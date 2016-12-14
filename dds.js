<script type="text/javascript">

// Object has days of the month as keys, and arrays 
// that contain the months that have those days.
days = {
	31 : [1, 3, 5, 7, 8, 10, 12],
	30 : [4, 6, 9, 11],
	28 : [2]
};

// Function to cycle through the days object
find_days = function(month) {
	if (month == 0) {
    // If the month is 0, they selected "MM" rather than an
    // actual month, so return false.
		return false;
	}
  var return_day;
	$.each(days, function(day, months) {
    // Loop through the days object, key->day
    // value-> months
		if ($.inArray(parseInt(month), months) > -1) {
      // Set return_day to the number of days in the month &
      // return false to break out of the loop.
			return_day = day;
			return false;
		}
	});
	return return_day;
}

$(document).ready(function() {
  // Change this value to your Month select box's id.
	$('#id_after_1').change(function() {
		var selected_month = $(this).val();
		day = find_days(selected_month);
    
    // Change this value to your Day select box's id.
		if ($('#id_after_0 option:last').val() < day) {
      // If the last option is less than the number of days in the month,
      // refill the select box with the correct number of options
			$('#id_after_0').empty();
			for (i = 0; i <= day; i++) {
				if (i == 0) {
					$('#id_after_0').append($('<option></option>').attr("value", i).text("DD"));
				}
				else {
          // 0 Padding
					if (i < 10) {
						i_str = "0" + i.toString();
					}
					else {
						i_str = i
					}
					$('#id_after_0').append($('<option></option>').attr("value", i).text(i_str));
				}
			}			
		}
		else {
      // If the last option is greater than the number of days in the month,
      // remove the options that are for more days.
			$('#id_after_0 option').each(function() {		
				if ($(this).val() > day) {
					$(this).remove();
				}
			});
		}
	});
});
</script>
