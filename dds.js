// Change these values to your day, month and year select ids
var day_select = '#day';
var month_select = '#month';
var year_select = '#year';

// Don't alter these variables.
var day_select_option = day_select + ' option';
var day_select_last_option = day_select_option + ':last';
var day_select_selected = day_select_option + ':selected';


// Object has days of the month as keys, and arrays 
// that contain the months that have those days.
days = {
	31 : [1, 3, 5, 7, 8, 10, 12],
	30 : [4, 6, 9, 11]
};

// Every leap year from 1900 - 2100
leap_years = [1900, 1904, 1908, 1912, 1916, 1920, 1924, 1928, 1932, 1936, 1940, 1944, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040, 2044, 2048, 2052, 2056, 2060, 2064, 2068, 2072, 2076, 2080, 2084, 2088, 2092, 2096]

is_leap_year = function(year) {
	if ($.inArray(parseInt(year), leap_years) > -1) {
		return true;
	}
	else {
		return false;
	}
}

// Function to cycle through the days object
find_days = function(month) {
	if (month == 0) {
    // If the month is 0, they selected "MM" rather than an
    // actual month, so return false.
		return false;
	}
	else if ((parseInt(month) == 2) && (is_leap_year($(year_select).val()) == true)) {
		console.log("Leap year, so feb = 29");
		return_day = 29;
	}
	else if ((parseInt(month) == 2) && (is_leap_year($(year_select).val()) == false)) {
		console.log("Not a leap year, so feb = 28");
		return_day = 28;
	}
	else {
		$.each(days, function(day, months) {
	    // Loop through the days object, key->day
	    // value->months
			if ($.inArray(parseInt(month), months) > -1) {
			// Set return_day to the number of days in the month &
			// return false to break out of the loop.
				return_day = day;
				return false;
			}
		});
	}
	
	return return_day;
}

// Function to alter the day selection's option tags
alter_days = function(day) {

	if (parseInit($(day_select_last_option).val()) < day) {
        // If the last option is less than the number of days in the month,
        // refill the select box with the correct number of options
		selected_day = $(day_select_selected).val();
		$(day_select).empty();
		for (i = 0; i <= day; i++) {
			if (i == 0) {
				$(day_select).append($('<option></option>').attr("value", i).text("DD"));
			}
			else {
      			// 0 Padding
				if (i < 10) {
					i_str = "0" + i.toString();
				}
				else {
					i_str = i;
				}
				if (i == selected_day) {
					$(day_select).append($('<option></option>').attr({"value": i, "selected": "selected"}).text(i_str));
				}
				else {
					$(day_select).append($('<option></option>').attr("value", i).text(i_str));
				}
			}
		}			
	}
	else {
	// If the last option is greater than the number of days in the month,
	// remove the options that are for more days.
		$(day_select_option).each(function() {		
			if (parseInt($(this).val()) > day) {
				$(this).remove();
			}
		});
	}
}

$(document).ready(function() {
  	
	$(month_select).change(function() {
		var selected_month = $(this).val();
		
		day = find_days(selected_month);
		
		alter_days(day);
	});
	
	$(year_select).change(function() {
		var selected_month = $(month_select).val();
		
		day = find_days(selected_month);
		
		if (day !== false) {
			alter_days(day);
		}
	})
});
