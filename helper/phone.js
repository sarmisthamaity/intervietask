const regexPhoneNumber = (mobilenumber) => {

	const regexPhoneNumber = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[456789]\d{9}|(\d[ -]?){10}\d$/; 
  
	if (String(mobilenumber).match(regexPhoneNumber)) {
		return mobilenumber;
	} else {
		return "invalid";
	}
};

module.exports = { 
    regexPhoneNumber 
};
