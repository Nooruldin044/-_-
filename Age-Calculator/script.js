    document.getElementById('ageCalculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let dobInput = document.getElementById('dob').value;
    let dob = new Date(dobInput);
    let today = new Date();
    let ageYears = today.getFullYear() - dob.getFullYear();
    let monthDiff = today.getMonth() - dob.getMonth();
    let dayDiff = today.getDate() - dob.getDate();
    
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      ageYears--;
      monthDiff += 12;
    }
    
    let ageMonths = monthDiff;
    let ageDays = dayDiff < 0 ? today.getDate() + (new Date(today.getFullYear(), today.getMonth(), 0).getDate()) - dob.getDate() : dayDiff;
    
    document.getElementById('result').innerText = "Your age is " + ageYears + " years, " + ageMonths + " months, and " + ageDays + " days.";
  });