/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form Project
******************************************/

/***** GOING FOR EXCEEDS EXPECTATIONS, PLEASE RETURN NEEDS WORK IF DOES NOT MEET EXCEEDS *****/
/***** ZIP CODE INPUT HAS THE REAL TIME VALIDATION ERROR DISPLAYING, CVV HAS THE CONDITIONAL VALIDATION *****/

const $designDropdown = $('#design')
const $colorDropdown = $('#color')
const $createTotal = $('.activities').append('<p>Total Cost: $</p>');
const $activities = $('.activities input');
const $paymentSelect = $('#payment');
let $totalCost = 0;


// Use jQuery to put 'Name' input element into Focus State
$('#name').focus();


// JOB ROLE SECTION

// Target 'other job role' input box and hide initially, using jQuery and Vanilla to practice

//$('#other_title').hide()
document.getElementById('other_title').style.display = 'none'; 
const $otherRole = $('#title')
$otherRole.change(function (event) {                        // Event listener to check for 'other' job title selected/hide box
if ($('#title option[value="other"]').is(':checked')) {     // If other is checked, shows input box, else hides
    console.log('checked')
    $('#other_title').show();
} else $('#other_title').hide();
});


// T-SHIRT SECTION

// Update page to hide ' Select Theme' option, and display 'select theme option first' in color dropdown
$('#design option:first').hide()
$('#color').prepend('<option>Please Select a T-Shirt Theme</option>');   // Add option in jQuery to Designs
$('#color').val('Please Select a T-Shirt Theme');   // Set first option to this Val. Got lucky here guessed if would work
$('#color').hide();                                 // Hide select  by default, shows once Theme is selected

const $designOptions = $('#color option');
for (let i = 0; i <= $designOptions.length; i ++) {    // Loop to remove all options in Colors
    $('#color option').hide();
    //console.log(designOptions[i])
};

const $punOptions = $('#color option').filter(function( index ) {           // Variables to store Theme options
    return this.innerHTML.includes('Puns')
  });

const $nonPunOptions = $('#color option').filter(function( index ) {
    return !this.innerHTML.includes('Puns')
  });
  


$designDropdown.change(function () {    // Event listener to check if 'js puns' is selected
    $('#color').show();
    if ($('#design option:checked').val() == 'js puns') {    // Checks if 'js puns' is selected, uses .val() to get value of 
        $('#color option').show();                           // design, then compares to option value of 'js puns
        $('#color option:first').hide();                     // Hides 'Please Select a T-Shirt Theme option
        $($punOptions).show();
        $($nonPunOptions).hide();
        // for (let i = 4; i <= $designOptions.length; i ++) {     // Loops to remove index of $designOptions after first 3
        //     $($designOptions[i]).hide();                        // WILL break if options were changed, need alternative
        //    // console.log(i)
        // }
        $('#color').val('cornflowerblue');                      // Sets to first option in 'js puns'

    };
    if ($('#design option:checked').val() == 'heart js') {     // Checks if 'heart js' is selected
        $('#color option').show();
        $($nonPunOptions).show();
        $($punOptions).hide();
        $('#color option:first').hide();                        // Hides Select Theme Option
        // for (let i = 0; i <= 3; i ++) {          // Loops to remove index of $designOptions up until 'heart js' value indicies
        //     $($designOptions[i]).hide();         // WILL break if options were changed or in different order, need alternative
        //    // console.log(i)
        // }
        $('#color').val('tomato')                                 // Sets to first option in 'heart js'
    };
});


// ACTIVITY SECTION


$activities.change(function (event) {
    let $clicked = $(event.target) //$('input:checked')
    //console.log($clicked)
    let $cost = parseInt($clicked.attr('data-cost').slice(-3));   // Parses string to an int removing the $ with slice.
   // console.log($cost)
    if ($clicked.is(':checked')) {
        $totalCost += $cost;
    } else $totalCost -= $cost;
    //console.log($totalCost)
    $('.activities p').text('Total Cost: $ ' + $totalCost)      // Appends total cost to paragraph created above, $createTotal

    let $date = $clicked.attr('data-day-and-time')
    //console.log($date)
    
    for (let i = 0; i <= $activities.length; i ++) {        // Loop to check if checkbox clicked has conflicting time with other
        let $dateConflict = $activities[i];                 // events and disables those events if so.
        //console.log($dateSeleted)
        if ($($clicked).attr('data-day-and-time') == $($dateConflict).attr('data-day-and-time') && 
            $($clicked) !== $dateConflict) {
                if ($($clicked).is(':checked')) {
                    $($dateConflict).attr('disabled', true);
                    $($clicked).attr('disabled', false);
                } else
                    //$($dateSeleted).is(':checked') 
                    $($dateConflict).attr('disabled',  false);
            };
    };
});

// PAYMENT SECTION

$('#payment option:first').hide();
$('#payment').val('Credit Card');
$('#paypal').hide()
$('#bitcoin').hide();
$('#payment').change(function (event) {
    if ($('#payment option:checked').val() == 'Credit Card') {
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();   
    } else if ($('#payment option:checked').val() == 'PayPal') {
            $('#paypal').show();
            $('#credit-card').hide();
            $('#bitcoin').hide();
    } else if ($('#payment option:checked').val() == 'Bitcoin') {
        $('#bitcoin').show();
        $('#credit-card').hide();
        $('#paypal').hide();
    };

});

// VALIDATION SECTION

const nameValidation = () => {                  // Validate name
    const regex = /[a-zA-Z]/;
    const name = $('#name').val();
    const result = regex.test(name);
    if (result == false) {
        const nameSpan = "<span id='nameSpan'>Please enter a name.</span>";
        $('#nameSpan').hide();
        $('#name').after(nameSpan);
       // $('.col-6').append(nameSpan).css('color', 'red');
        return regex.test(name);
        // console.log() 
    } else $('#nameSpan').hide(); return true;
};

const emailValidation = () => {                 // Validate email address
    const regex = /^[^@]+@[^@.]+\.[a-z]+$/i;
    const name = $('#mail').val();
    const result = regex.test(name);
    if (result == false) {
        const mailSpan = "<span id='mailSpan'>Please enter a valid email, ex: John@gmail.com.</span>";
        $('#mailSpan').hide();
        $('#mail').after(mailSpan);
       // $('.col-6').append(mailSpan).css('color', 'red');
        return regex.test(name);
        // console.log()  
    } else $('#mailSpan').hide(); return true;
};

const activityValidation = () => {              // Validate if at least 1 checkbox is selected
    if ($('input[type="checkbox"]:checked').length <= 0 ) {
        const activitySpan = "<span id='activitySpan'>You must select at least ONE activity.</span>";
        $('#activitySpan').hide();
       $('.activities').after(activitySpan);
       //$('.col-6').append(activitySpan).css('color', 'red');
        //console.log() 
        return false;   
    } else $('#activitySpan').hide(); return true;
};

const creditValidation = () => {                // Validate credit card input 13-16 nums, ONLY if credit card option is seleted
    if ($('#payment').val('Credit Card')) {
        const regex = /^\d{13,16}$/;
        const name = $('#cc-num').val();
        const result = regex.test(name);
        if (result == false) {
            const creditSpan = "<span id='creditSpan'>Please enter a valid credit card number between 13-16 digits.</span>";
            $('#creditSpan').hide();
            $('#cc-num').after(creditSpan);
            //$('.col-6').append(creditSpan).css('color', 'red');
            return regex.test(name);
            // console.log() 
        } else $('#creditSpan').hide(); return true;
    };
};

const zipValidation = () => {           //  Only validated if credit card is selected payment type
    if ($('#payment').val('Credit Card')) {
        const regex = /^\d{5}$/;
        const name = $('#zip').val();
        const result = regex.test(name);
        if (result == false) {
            const zipSpan = "<span id='zipSpan'>Please enter a valid Zipcode containing 5 digits.</span>";
            $('#zipSpan').hide();
            $('#zip').after(zipSpan);
            //$('.col-6').append(zipSpan).css('color', 'red');
            return regex.test(name);
            // console.log()   
        } else $('#zipSpan').hide(); return true; 
    };           
};
// Realtime Zipcode Validation Error Output
$('#zip').on('input', function (event) {
    if ($('#zip').val().length < 5) {
        const zipSpan = "<span id='zipSpan'>Please enter a valid Zipcode containing 5 digits.</span>";
        $('#zipSpan').hide()
        $('#zip').after(zipSpan);
        //$('#zip').css('border-color', 'red')
        console.log('working')
    }else $('#zipSpan').hide();//$('#zip').css('outline', '#15638a');
});

const cvvValidation = () => {           //  Only validated if credit card is selected payment type.  **HAS CONDITIONAL ERROR**
    if ($('#payment').val('Credit Card')) {
        const regex = /^\d{3}$/;
        const name = $('#cvv').val();
        const result = regex.test(name);
        const regexAlt = /^\d{1,2}$|^\d{4,}/;
        if (result == false) {
            if (regexAlt.test(name)) {
                const cvvSpan = "<span id='cvvSpan'>Your CVV must contain EXACTLY three digits.</span>";
                $('#cvvSpan').hide();
                $('#cvv').after(cvvSpan);
                //$('.col-6').append(cvvSpan).css('color', 'red');
            } else if ($('#cvv').val() == "") {
                const cvvSpanAlt = "<span id='cvvSpan'>You must enter a CVV number.</span>";
                $('#cvvSpan').hide()
                $('#cvv').after(cvvSpanAlt);
               //$('.col-6').append(cvvSpanAlt).css('color', 'red');
            }
            return regex.test(name);
            // console.log()   
        } else $('#cvvSpan').hide(); return true;   
    };            
};

const submitValidation = () => {                // BROKEN AT THE MOMENT
    if ($('#payment').val('Credit Card')) {
        if (creditValidation() == true &&
            zipValidation() == true &&
            cvvValidation() == true)
        //         return true;
        // }else return false;

    if (nameValidation() == true &&
        emailValidation() == true &&
        activityValidation() == true) {
            return true;
        }else return false;
    }
}
$('form button').on('submit', function (event) {
    if (submitValidation() == false) {
        event.preventDefault();
    }

});

