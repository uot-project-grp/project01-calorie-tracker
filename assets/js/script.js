/* Toggling for when dropbox is clicked */
function myFunction() {
    document.getElementById("#").classList.toggle("show");
  }
  
  /* Closing the dropdown menu if the user clicks outside of it */
  window.onclick = function(event) {
    if (!event.target.matches('.nav')) {
      var dropdowns = document.getElementsByClassName("nav");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }