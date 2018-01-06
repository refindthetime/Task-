//Sign up page, "submit profile" opens the Home Page "Task ++"(only if we have time to html)

//Home Page Task++ --------------------------
	//MANAGE TASKS
		//onclick to opens modal **with passcode?**
			//modal contents
				//CURRENT DATE PRINT
				//user tabs(to select which child to add task to)
				//add new user
				//table linked to firebase(to append tasks)
				//add task +(onclick to show add task form with apply button)
					//apply appends table with new task and adds task to user profile through firebase)
				//  close button onclick (will close the modal)
				


	


//Thongvun's
// var tBoo = false;

//html js
$( document ).ready(function(){
	$(".button-collapse").sideNav();
//for the modal
	 $('.modal').modal();
//thongvun test
// if (tBoo == true) {
// 	createLastNameLi();
// }

})
// lines 26-30 can go//////////

//task form - dropdown btns
$(document).ready(function() {
	$('select').material_select();
});

//task form - time picker
$('.timepicker').pickatime({
	default: 'now', // Set default time: 'now', '1:30AM', '16:30'
	fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
	twelvehour: true, // Use AM/PM or 24-hour format
	donetext: 'OK', // text for done-button
	cleartext: 'Clear', // text for clear-button
	canceltext: 'Cancel', // Text for cancel-button
	autoclose: false, // automatic close timepicker
	ampmclickable: true, // make AM PM clickable
	aftershow: function(){} //Function for after opening timepicker
});


//task form - date picker
$('.datepicker').pickadate({
	selectMonths: true, // Creates a dropdown to control month
	selectYears: 15, // Creates a dropdown of 15 years to control year,
	today: 'Today',
	clear: 'Clear',
	close: 'Ok',
	closeOnSelect: false // Close upon selecting a date,
});


// $(document).ready(function() {
// 	$('#wrapper').hide();
// });

//show add task forms on button click...still not working
$('.modal-trigger').on('click', function() {
	$('#add-task-wrapper').hide();
})

var addTask;

$('.addTaskBtn').on('click', function() {
	console.log("clicked");
	if(!addTask) {
		$('.personTaskInfo').hide();
		$('.add-task-wrapper').show();
		addTask = true;
	} else if(addTask) {
		$('.personTaskInfo').show();
		$('.add-task-wrapper').hide();
		addTask = false;
	}
});

$("#applyTask").on("click", function(event) {
	$(".add-task-wrapper").hide();
	$(".personTaskInfo").show();
});






	//profile child 
		//firebase link to add tasks from parent modal to child card div
		//including check box that displays congrats gif.
		

	//profile child
	





















// // open parent model on homepage
// $('...').on('click', function(){
// 	//open modal
// 	//tabs and other text shoud be html coded in
// 	//print to page a table of tasks added through firebase below
// })



// Initialize Firebase. using wunc.inc's gmail account
  var config = {
    apiKey: "AIzaSyC_Mml0KH_ufwPGoCj9idwXceIQqnmTihQ",
    authDomain: "task-d136a.firebaseapp.com",
    databaseURL: "https://task-d136a.firebaseio.com",
    projectId: "task-d136a",
    storageBucket: "task-d136a.appspot.com",
    messagingSenderId: "720922787934"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


//----------------Adding tasks to the task list


//when the modal is open and user selects add task
$('#addTask').on('click', function(){
	//task input panel is now .show()
	$('#taskPanel').show();
});


//User has entered in text for a new task and clicks apply. changes are registerest and pushed to firebase and back to html page
$('#applyTask').on("click", function (event) {
	event.preventDefault(); 

	// Grabs user input
	var userNames = [];
	var taskName = $("#userTaskDescription").val().trim();
	var taskReward = $("#userTaskReward").val().trim();
	var taskTimeDueBy = $("#userTaskTimeDueBy").val().trim();
	var taskDateDueBy = $("#userTaskDateDueBy").val().trim();
	for (var i = 0; i < $('select[name="userName"]').val().length; i++) {
		userNames.push($('select[name="userName"]').val()[i].trim())
	}
	//var userName = $('select[name="userName"]').val()[0].trim();
	//console.log($('select[name="userName"]').val())

		console.log(userNames);
	// Create object to hold task data this links to firebase as the data in firebase is in object format
	for (var i = 0; i < userNames.length; i++) {
		var newTask = {
		user: userNames[i],
		name: taskName,
		reward: taskReward,
		timeDueBy: taskTimeDueBy,
		dateDueBy: taskDateDueBy
	};

	// Uploads task data to the database. pushes task data into the object above
	database.ref().push(newTask);

	  $('#' + userNames[i] +' > tbody').append("<tr><td><i class='material-icons lef'>check_box_outline_blank</i>" + taskName + "</td><td>" + newTask.dateDueBy  + " @ " + newTask.timeDueBy +  "</td></tr>");
	}
	

	// // test to make sure it works
	// console.log("User Name: " + newTask.user);
	// console.log("Task Name: " + newTask.name);
	// console.log("Task Reward: " + newTask.reward);
	// console.log("Task Due By: " + newTask.timeDueBy);
	// console.log("Task date: " + newTask.dateDueBy)

	// Clears all of the input boxes
	$('select[name="userName"]').val("");
	$("#userTaskDescription").val("");
	$("#userTaskReward").val("");
	$("#userTaskTimeDueBy").val("");
	$("#userTaskDateDueBy").val("");
});



//-------Create Firebase event for adding tasks to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function (snapshot) {

	console.log(snapshot.val());

	// Store user task input data into a variable. This is for firebase.
	var taskName = snapshot.val().name;
	var taskReward = snapshot.val().reward;
	var taskDueBy = snapshot.val().timeDueBy;
	var dateDueBy = snapshot.val().dateDueBy;

	// test to make sure it works
	console.log(taskName);
	console.log(taskReward);
	console.log(taskDueBy);



//add reload to keep data on cards here


	$('#parent > tbody').append("<tr><td><i class='material-icons lef'>check_box_outline_blank</i> " + taskName + "</td><td>" + taskReward + "</td><td>" +

	dateDueBy + " @ " + taskDueBy + "</td><td>");
});

//------ click check boxes
$('body').on('click', '#checkbox', function() {
	var state = $(this).attr('checkState');
	if (state === 'un-checked') {
		$(this).replaceWith("<i class='material-icons left' checkState='checked' id='checkbox'>check_box</i>");
	} else {
		$(this).replaceWith("<i class='material-icons left' checkState='un-checked' id='checkbox'>check_box_outline_blank</i>")
	}

});

/**********************************************/
/*************child-modal.html*****************/
/**********************************************/
function displayGif() {
	event.preventDefault();
	var queryURL = "https://api.giphy.com/v1/gifs/q5J2HfnH8mCvS?api_key=dc6zaTOxFJmzC";


	$.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

    	var gifData = response.data;
    	var gifDiv = $("<div class='gifDiv'>");
    	var pImg = $("<img class='gif'>");
    	pImg.attr("src", gifData.images.downsized_medium.url);

    	gifDiv.append(pImg);
    	console.log(gifData);

    	$("#marcia").append(gifDiv);

    	setTimeout(function() {gifDiv.remove()}, 3000);

    });
}

$(".good-job-gif").on("click", function(event) {

	if($(this).text() === "check_box_outline_blank") {
		$(this).text("check_box")
		displayGif();
	} else {
		$(this).text("check_box_outline_blank");
	}
});



// *****Sign-Up Javascript - Thongvun's Don't touch
// Firebase event
    database.ref().on('child_added', function(childSnapshot){

    var theChild = childSnapshot.val();
    var displayFirstName = childSnapshot.val().dbFirstName;
    var displayLastName = childSnapshot.val().dbLastName;
    var displayEmail = childSnapshot.val().dbEmail;
    var displayPassword = childSnapshot.val().dbPassword;

});//End database.ref.on

//Sign-Up Button
$("#btnSignUp").on("click", function() {
	event.preventDefault();

    var signFirstName = $('#first-name').val().trim();
    var signLastName = $('#last-name').val().trim();
	var signEmail = $('#txt-email').val().trim();
	// var signLastName = $('#IMG').val().trim(); UPDATE LATER FOR SAVED IMG?
	var signPassword = $('#txt-password').val().trim();
	
    //Clears previous values
	$(this).closest('form').find("input[type=text], textarea").val("");
	$("#txt-email").val("");
	$("#txit-password").val("");

    // Database push
    database.ref().push({
        dbFirstName: signFirstName,
        dbLastName: signLastName,
        dbEmail: signEmail,
        dbPassword: signPassword
	});
	
	//Goes to user page
	// tboo = true;
	window.location.href='user-page.html';


// <a class='dropdown-button btn' href='#' data-activates='dropdown1'><i class="material-icons right">keyboard_arrow_down</i>Brady Family</a>

});//End sign-up button listener

//Thongvuns
// function createLastNameLi() {
// 	var displayLastName = signLastName;
// 	var jQueryLi = "<a class='dropdown-button btn' href='#' data-activates='dropdown1'><i class='material-icons right'>" + "keyboard_arrow_down" + "</i>" + displayLastName + " " + "Family" + "</a>";

// 	$('#jLastName').append(jQueryLi);

// }

	








/**********************************************/
/****************create card*******************/
/**************create user tab*****************/
/**********************************************/

function createCard() {
	event.preventDefault();
	var idFirst = $("#first_name").val();
	var idLast = $("#last_name").val();

	var divWrapper = $("<div class='col s12 m6 l4'>");
	var divCard = $("<div class='card'>");
	var divCardImg = $("<div class='card-image waves-effect waves-block waves-light'><img class='activator' src='assets/image/brady_marcia.png'></div>");
	var divContent = $("<div class='card-content'><span id='add-name' class='card-title activator text-darken-4'>" + idFirst + " " + idLast + "<i class='material-icons right' id='childMold'>add</i></span></div>");
	var divCardReveal = $("<div class='card-reveal'>");
	var spanCardTitle = $("<span class='card-title text-darken-4'>" + idFirst + "'s Tasks:" + "<i class='material-icons right'>close</i></span>")
	var table = $("<table id=" + idFirst + " class='table'><thead><tr><th class='task'><span>Task:</span></th><th>Due By:</th></tr></thead><tbody></tbody></table>");

	divCardReveal.append(spanCardTitle).append(table);
	divCard.append(divCardImg).append(divContent).append(divCardReveal);
	divWrapper.append(divCard);

	$("#cardCreate").append(divWrapper);

};




function addUserTab() {
	event.preventDefault();
	var idFirst = $("#first_name").val();
	var tabLi = $("<li class='tab col s3'><a href=" + idFirst + " " + "id=" + idFirst + " " + "</a>" + idFirst + "</li>");
	var divTable = $("<div id =" + idFirst + " class='col s12'>");
	var table = $("<table class='parent-task-table' id="+ idFirst + "><thead><tr><th>Description</th><th>Points</th><th>Status</th><th>Edit</th></tr></thead><tbody></tbody></table>");
	var addClassBtn = $("<hr><a class='waves-effect waves-light btn add-task addTaskBtn' id='addTaskBtn'><i class='material-icons left'>add</i>Add Task</a>");
	var select = $("<li class><span><input type='checkbox'><label></label>"+ idFirst + "</span></li>");
	var option = $("<option value=" + idFirst + ">" + idFirst + "</option>");

	$(".tabs").prepend(tabLi);
	divTable.prepend(table);
	table.append(addClassBtn);
	$(".personTaskInfo").append(divTable);
	$("#selectUser").append(option);
	$('select').material_select();

}

$("#submitUser").on("click", function() {
	createCard();
	addUserTab(); 
});

 $('.dropdown-button').dropdown('close');

  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });

    
/**********************************************/
/**************end create card*****************/
/************end create user tab***************/
/**********************************************/


// // *****Firebase Authentication
// //Get Elements
//     const first-name = document.getElementById('first-name');
//     const last-name = document.getElementById('last-name');
// 	const txt-email = document.getElementById('txt-email');
// 	const txt-password = document.getElementById('txt-password');

// 	const btnLogIn = document.getElementById('btnLogIn');
// 	const btnSignIn = document.getElementById('btnSignIn');
// 	const btnLogOut = document.getElementById('btnLogOut');

// //Log in Event
// 	btnLogIn.addEventListener('click', e=> {
// 		//Get email and pass
// 		const email = txt-email.value;
// 		const pass = txt-password.value;
// 		const auth = firebase.auth();
// 		//Sign In
// 		const promise = auth.signInWithEmailAndPassword(email, pass);
// 		promise.catch(e => console.log(e.message));
// 	});

// 	//Sign up Event
// 	btnSignIn.addEventListener('click', e=> {
// 		//Get email and pass
// 		const email = txt-email.value;
// 		const pass = txt-password.value;
// 		const auth = firebase.auth();
// 		//Sign In
// 		const promise = auth.createUserWithEmailAndPassword(email, pass);
// 		promise.catch(e => console.log(e.message));
// 	});

// 	//Logout button
// 	btnLogOut.addEventListener('click', e => {
// 		firebase.auth().signOut();
// 	});

// 	//Add a realtime listener
// 	firebase.auth().onAuthStateChanged(firebase => {
// 		if (firebase) {
// 			btnLogOut.classList.remove('hide');
// 		} else {
// 			btnLogOut.classList.add('hide');
// 		}
// 	});




// links the hardcoded html files "+" button to open child-modal.html...cant get it to work on created cards yet;
$("#childMold").on("click", function() {
	event.preventDefault();
	window.location.href='child-modal.html'});











//what still doesn't work:
//The giphy no longer appears on the child-modal.html see line 430 for how to get there from user page
//adding a new user creates an add task button and new table on every tab every single time. 
//also the add task button that gets created doesn't actually work and isn't css'd correctly(sorry josh)
//signing up takes you straight to the brady bunch page contrary to what last name you inserted on the sign up page
//when a new task is created it pushes to the hard-coded table and starts to code to the new user's tab
//on the plus side, if a new task is only added to marcia it will not appear on the new user's tab-table!

//that's all I can think of for now, I've done all I can do for now. However, the new card generates and stores
//the user's tasks and pushes them to the card and the initial parent table(not the newly created one)