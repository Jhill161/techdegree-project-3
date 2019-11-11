/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form Project
******************************************/
const $designDropdown = $('#design')
const $colorDropdown = $('#color')


// Use jQuery to put 'Name' input element into Focus State
$('#name').focus();

// Target 'other job role' and hide initially, using jQuery and Vanilla to practice
//$('#other_title').hide()
document.getElementById('other_title').style.display = 'none'; 

// T-SHIRT SECTION

// Update page to hide ' Select Theme' option, and display 'select theme option first' in color dropdown
$('#design option:first').hide()
$('#color').prepend('<option>Please Select a T-Shirt Theme</option>');   // Add option in jQuery to Designs
$('#color').val('Please Select a T-Shirt Theme');   // Set first option to this Val. Got lucky here guessed if would work


const $designOptions = $('#color option');
for (let i = 0; i <= $designOptions.length; i ++) {    // Loop to remove all options in Colors
    $('#color option').hide();
    //console.log(designOptions[i])
}

// ------------------------------------ Test ------------------------------
$('#color option:eq[1]').addClass('js puns');
$('#color option:eq[2]').addClass('js puns');
$('#color option:eq[3]').addClass('js puns');

//------------------------------------- End Test---------------------------
$designDropdown.change(function () {    // Event listener to check if 'js puns' is selected
    if ($('#design option:checked').val() == 'js puns') {    // Checks if 'js puns' is selected, uses .val() to get value of 
        $('#color option').show();                           // design, then compares to option value of 'js puns
        $('#color option:first').hide();                     // Hides 'Please Select a T-Shirt Theme option

        for (let i = 4; i <= $designOptions.length; i ++) {     // Loops to remove index of $designOptions after first 3
            $($designOptions[i]).hide();                        // Would break if options were changed, need alternative
           // console.log(i)
        }
        $('#color').val('cornflowerblue');                      // Sets to first option in 'js puns'
        //console.log($('#color').val())
    }
    if ($('#design option:checked').val() == 'heart js') {     // Checks if 'heart js' is selected
        $('#color option').show();
        $('#color option:first').hide();
        for (let i = 0; i <= 3; i ++) {     // Loops to remove index of $designOptions up until 'heart js' value indicies
            $($designOptions[i]).hide();                        // Would break if options were changed, need alternative
           // console.log(i)
        }
        $('#color').val('gold')                                 // Sets to first option in 'heart js'
    }
});


