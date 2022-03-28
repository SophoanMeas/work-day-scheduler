const currentTime = moment().hours(); // get window time
const currentDate = moment().format("dddd, MMMM, Do"); // get current date 

$(document).ready(function() {

    // add color code to task section depending on the current time
    function addTasks() {

        $(".hour").each(function() {
            hour = parseInt($(this).attr("id"));
            // console.log(hour)

            if (currentTime > hour) {
                $(this).siblings().addClass("past"); // add class "pass" to change text area to grey
            } else if (currentTime === hour) {
                $(this).siblings().addClass("present"); // add class "present" to change text area to red
            } else {
                $(this).siblings().addClass("future"); // add class "pass" to change text area to green
            }
        })
    }

    var saveTasks = function(time, task) {
        localStorage.setItem(time, task) //Saves data in localStorage
    };

    function delayTime() { // set delay timer to 1.5ms
        const delay = 1500;
        setTimeout(function() {
                $(".adding-tasks").remove(); // remove the msg header after user click on the save button
            },
            delay);
    }

    function getTasks() { // get data from local storage

        $(".hour").each(function() {
            const hour = $(this).text();
            const savedTasks = localStorage.getItem(hour);
//             console.log(hour)
            if (savedTasks !== null & savedTasks != '') {
                $(this).siblings(".task").val(savedTasks)
            }
        })
    }

    $(".saveBtn").on("click", function() { // assigned an evenlistener to the save buttons, 
        let time = $(this).siblings().text(); // gets the text from the html
        let task = $(this).siblings(".task").val(); // gets the user task input from the html

        saveTasks(time, task);

        if (task === '') {
            $("#currentDay").append(`<p class='adding-tasks'>Task(s) cleared from Calendar ${currentDate}`)
            delayTime()
        } else {
            $("#currentDay").append(`<p class='adding-tasks'>Task(s) added to Calendar ${currentDate}`)
                // delay 
            delayTime()
        }

    });

    addTasks();
    getTasks();

})
