function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById("shhh").classList.toggle("shhh");
  
  }
  
  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }
  
  var symptomList = new Set()
  
  symptomList.add('hello')
  
  function a(){
    alert('added')
  }
  
  function addDisease(symptom) {
    if(!(symptomList.has(symptom))){
      symptomList.add(symptom)
      a()
      renderButtons()
    } 
  }
  
  function renderButtons(){
    const container = document.getElementById('symptomList')
    container.innerHTML = ''
    symptomList.forEach((symptom) =>{
      const button = document.createElement('button')
      button.innerHTML = symptom
      button.className += 'btn btn-warning symp-btn'
      button.onclick = () =>{
        symptomList.delete(symptom)
        renderButtons()
      }
      container.appendChild(button)
      
    })
  }
  
  function sendSymptomInfo(){
    alert('hi')
    // const request = new XMLHttpRequest()
    // request.open('POST',`/symptoms/${JSON.stringify(symptomList)}`)
    // request.send()
  }