var sessionUser = sessionStorage.getItem("email");

$(document).ready(function () {

    // Initialize Firebase

    var config = {
        apiKey: "AIzaSyDwvX6WztC5DIZ3fZaWG7O8z86qBrIndyk",
        authDomain: "te2timekeeper.firebaseapp.com",
        databaseURL: "https://te2timekeeper.firebaseio.com",
        projectId: "te2timekeeper",
        storageBucket: "te2timekeeper.appspot.com",
        messagingSenderId: "679714174028"
    };

    //Firebase.initializeApp( config );

    // Get a reference to the database service

    // Get a reference to the database service
    var users = firebase.database().ref("users/");

    users.orderByChild("userDisplayName").on("value", function (snapshot) {

        $("#userTable").empty();
        //Console.log(snapshot.val());
        snapshot.forEach(function (childSnapshot) {

            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            //Console.log(childKey);
            //console.log(childData);
            var $deleteButton = $("<i>");
            $deleteButton.addClass("fa fa-trash-o");
            $deleteButton.attr("aria-hidden", "true");
            $deleteButton.attr("id", childKey);
            $deleteButton.on("click", deleteUser);

            var $newRow = $("<tr>");
            var $newUserFlags = $("<td>");
            var $newUserActive = $("<td>");
            var $newUserDisplayName = $("<td>");
            var $newUserEmail = $("<td>");
            var $newUserRole = $("<td>");
            var $newLastLogin = $("<td>");
            var $newCreateDate = $("<td>");
            var $delBtnCell = $("<td>");

            $newUserDisplayName.text(childData.userDisplayName);
            $newUserEmail.text(childData.userEmail);
            $newUserRole.text(childData.userRole);
            $newLastLogin.text(childData.lastLoginDate);
            $newCreateDate.text(childData.entryDate);

            //Var hours = moment.duration(minAway, 'minutes').asHours();
            //var time = moment(hours, 'hours').format("HH:mm");

            $delBtnCell.append($deleteButton);

            $newRow.append($delBtnCell);
            $newRow.append($newUserFlags);
            $newRow.append($newUserActive);
            $newRow.append($newUserDisplayName);
            $newRow.append($newUserEmail);
            $newRow.append($newUserRole);
            $newRow.append($newLastLogin);
            $newRow.append($newCreateDate);

            $("#userTable").append($newRow);
        });
    });


    //Set up the initial Screen and hide the non used panels
    $("#userManager").hide();

    //Check to see if there is a logged in user otherwise don't display the full page.
    if (!sessionStorage.getItem("email")) {
        console.log("Checking the user credentials--- ");
        $(".panel").hide();
        console.log(sessionUser);
    } else {
        $(".panel").show();
        if (sessionStorage.getItem("userRole") != "Admin") {
            $("#adminMenu").hide();
        }
    }
    //Check to see if the logged on user is an admin before displaying the Admin Menu

    function getAppUserProfile() {
        //Get the app profile from the user that just logged in.
    }

    $("#signout").click(function () {
        console.log("Signing out");
        firebase.auth().signOut().then(function () {
            $("#user-name").text("You are now signed out... Please sign in to use the app");
            console.log("Signed Out");
            sessionStorage.clear();
        }, function (error) {
            console.error("Sign Out Error", error);
        });

    });

    $("#btnRefreshRestaurants").click(function () {
//

    });


    function deleteUser() {
        //Connect to the db
        console.log("Delete ID " + $(this).attr("id"));
        //Delete the user using the key from the DB
        var user = firebase.database().ref("users/" + $(this).attr("id"));
        user.remove();
    }

});