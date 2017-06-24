var zipCode = "";
var isValidZip = "";

$('#btnGoZipCode').on('click', function(){
	zipCode = $('#name-input').val();
	isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);

	if(isValidZip){
		
	}else{
		alert(zipCode + " is not a valid zip code");
	}
});

