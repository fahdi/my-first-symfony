// Get the json from the controller
function GetListItems() {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/autocomplete/",
        contentType: "application/json; charset=utf-8",
        data: "{}",
        dataType: "json",
        success: function (result) {
            DisplayListItems(result);
        },
        "error": function (result) {
            var response = result.responseText;
            alert('Error loading: ' + response);
        }
    });
}

// Create list items and append them inside <ul> element
function DisplayListItems(list) {
    console.log(list);
     $.each(list, function(index, element) {
     var itemHTML = ["<li>",
     "<div>",
     "<div>",
     element.Title,
     "</div>",
     "<div>",
     element.Description,
     "</div>",
     "</div>",
     "</li>"].join('\n');
     $(".list > ul").append(itemHTML);
     });

}


$(function () {
    // Check for the text change to trigger the function
    $(".dep-des").on('keyup', debounce(function () { // currently being denounced for 350ms as it seemed right
        console.log("user typed");

        var searchterm = $(this).val().trim(); // clean up space
        searchterm = searchterm.replace(/\s+/g, ''); // useful in case keystroke was spacebar

        // Should trigger for both 3 or more characters, need testing
        if (searchterm.length >= 3) { //for checking 3 characters at-least just like opodo does
            console.log(", and the search term is 3 or more in length");
            GetListItems();
        }
    }, 350));

});


// (Taken from Underscore.js)

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};