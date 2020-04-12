$(document).ready(function () {

    /*
    TODO:   The code below attaches a `keyup` event to `#number` text field.
            The code checks if the current number entered by the user in the
            text field does not exist in the database.

            If the current number exists in the database:
            - `#number` text field background color turns to red
            - `#error` displays an error message `Number already registered`
            - `#submit` is disabled

            else if the current number does not exist in the database:
            - `#number` text field background color turns back to `#E3E3E3`
            - `#error` displays no error message
            - `#submit` is enabled
    */
    $('#number').keyup(function () {
        // your code here
        let inputNum = $("#number").val();
        console.log("In keyup, inputnum: "+ inputNum);
        
        $.get("/getCheckNumber", {number: inputNum}, result=>{
            //Exists
            if (result){
                $("#number").css("background-color", "red");
                $("#error").html("Number already registered!");
                $("#submit").prop("disabled", true);
            }
            else {
                $("#number").css("background-color", "#E3E3E3");
                $("#error").html("");
                $("#submit").prop("disabled", false);
            }
        })
    });

    /*
    TODO:   The code below attaches a `click` event to `#submit` button.
            The code checks if both text fields are not empty. The code
            should communicate asynchronously with the server to save
            the information in the database.

            The new contact should be displayed immediately, and without
            refreshing the page, after the values are saved in the database.

            The name and the number fields are reset to empty values.
    */
    $('#submit').click(function () {
        // your code here
        let name = $("#name").val();
        let number = $("#number").val();

        if (name == ""){
            $("#name").css("background-color", "red");
            $("#error").html("Name must not be empty!");
            return false;
        }
        else {
            $("#name").css("background-color", "");
            $("#error").html("");
        }

        if (number == ""){
            $("#number").css("background-color", "red");
            $("#error").html("Number must not be empty!");
            return false;
        }
        else {
            $("#number").css("background-color", "");
            $("#error").html("");
        }

        $.get("/add", {name: name, number: number}, result=>{
            console.log("In get AJAX callback | result: ");
            console.table(result)
            $("#contacts").append(result);
            $("#name").prop("value", "");
            $("#number").prop("value", "");
        })


    });

    /*
    TODO:   The code below attaches a `click` event to `.remove` buttons
            inside the `<div>` `#contacts`.
            The code deletes the specific contact associated to the
            specific `.remove` button, then removes the its parent `<div>` of
            class `.contact`.
    */
    $('#contacts').on('click', '.remove', function () {
        // your code here
        let name = 
        $.get('/delete', {name: name, number: number}, result=>{
            if(result){
                console.log("Deleting closest")
                $(this).closest().remove()
            }
        })
    });

})
