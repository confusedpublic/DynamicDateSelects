# DynamicDateSelects
Dynamically change the number of days available to select when a user selects a month.

For example, selecting 02, February, reduces the number of days available to select to 28. Selecting 01, January, restores the number of days to select to 31.

# Examples
The main example involves a simple DD MM YYYY set of select boxes which dynamically update.

The further example is adjusted for the two select boxes that can be objected through creating one's own mutli-select widget for a date field in Django. The biggest hurdle here is that Django does not create nice IDs for this sort of manipulation by default.

# Requirements
jQuery

# To Do
Testing
