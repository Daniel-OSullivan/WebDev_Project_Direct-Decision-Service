
//validation for contact form
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;
// required fields from the form 
  const fields = {
    //im getting the values from the form inputs by using the getElementById method
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    email: document.getElementById('email'),
    reason: document.getElementById('reason'),
    message: document.getElementById('paragraphBox'),
  };
  //email validation 
  const emailIsValid = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());  

//this function sets the error message and styles for invalid fields
  const setError = (el, text) => {
    //if the element does not exist, return
    if (!el) return;
    //gets the error element assigned to each input field
    const err = document.getElementById(`${el.id}Error`);
    //sets the error message text
    if (err) err.textContent = text;
    el.classList.add('invalid');
    //sets aria-invalid attribute for accessibility
    el.setAttribute('aria-invalid', 'true');
  };

  //this function clears the error message and styles for valid fields
  const clearError = (el) => {
    //if the element does not exist, it will return
    if (!el) return;
    const err = document.getElementById(`${el.id}Error`);
    //if the error elements exists, it will clear the text 
    if (err) err.textContent = '';
    el.classList.remove('invalid');
    //removes aria-invalid attribute for accessibility
    el.removeAttribute('aria-invalid');
  };

  // clear error on input/change
  Object.values(fields).forEach(f => {
    //if the field does not exist, return
    if (!f) return;
    //determine the event type based on the element type.
    const evt = f.tagName.toLowerCase() === 'select' ? 'change' : 'input'; // the select elements use 'change' event
    //add event listener to clear error when user interacts with the field
    f.addEventListener(evt, () => clearError(f)); // clears error on user input 
  });

//form submit event listener
  form.addEventListener('submit', (e) => {
    let firstInvalid = null;

    //check validation for each field 
    //if invalid, set error message and focus on the first invalid field
    //here its checking for the first name and checks if its valid 
    //if the first name is less than 2 letters it will set an error message
    if (!fields.firstName || fields.firstName.value.trim().length < 2) {
      //sets the error message for first name field
      setError(fields.firstName, 'Please enter your first name (min 2 chars).');
      firstInvalid = firstInvalid || fields.firstName;
    }
    //here its checking for the last name and checks if its valid 
    //if the last name is less than 2 letters it will set an error message
    if (!fields.lastName || fields.lastName.value.trim().length < 2) {
      setError(fields.lastName, 'Please enter your last name (min 2 chars).');
      firstInvalid = firstInvalid || fields.lastName;
    }
    //here its checking for the email and checks if its valid
    if (!fields.email || !emailIsValid(fields.email.value)) {
      //error message if the email is invalid
      setError(fields.email, 'Please enter a valid email address.');
      firstInvalid = firstInvalid || fields.email;
    }
    //here its checking if the reason dropdown menu has been selected
    if (!fields.reason || !fields.reason.value) {
      //error message if it has not been selected
      setError(fields.reason, 'Please select a reason for contacting us.');
      firstInvalid = firstInvalid || fields.reason;
    }
    //if the message field is less than 10 letters it will raise an error message
    if (!fields.message || fields.message.value.trim().length < 10) {
      //error message for the message field
      setError(fields.message, 'Please enter a message (min 10 chars).');
      firstInvalid = firstInvalid || fields.message;
    }

    //if there is any invalid field, prevent form submission and focus on the first invalid field
    if (firstInvalid) {
      e.preventDefault();
      firstInvalid.focus();//here its focusing on the first invalid field 
      return;
    }

    // stopping users from double submitting the form
    const btn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Submitting...'; }
    // allow normal submit (or replace with fetch/ajax)
  });
});