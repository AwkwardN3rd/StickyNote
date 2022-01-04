let i = 0;
let c = 0;
/***************** Creates new Sticky *****************/
  function createSticky(){
      let colors=["#db8c8b","#daac8a","#d9cd88","#a5da88","#89dab2","#89d9d3","#8b9edb","#998adb","#ba8adb"];
      
      i++;
      let newSticky = document.createElement('div'); //this creates a div element called mydiv
      newSticky.id = "mydiv" + i; // First div container
      

      let newStickyHeader = document.createElement('div'); // this creates a div element called myheader
      newStickyHeader.innerHTML="<h2>Click to Move<h2>" // div Header 
      newStickyHeader.id = "myheader" + i; // sets id
      newStickyHeader.addEventListener("mousedown",dragSticky)

     let newStickyContent = document.createElement('p'); // this creates the p tag under the header that is editable
      newStickyContent.innerText="edit text" // editable text under header
      newStickyHeader.id = "myText" + i;
      newStickyContent.contentEditable = true;
      newStickyContent.addEventListener("click", editSticky);

      let closeable = document.createElement("span"); //this is the delete button
      closeable.id = "closeable";
      closeable.innerHTML = "<a href='#'>&times;</a>";

      newSticky.appendChild(closeable);
      newStickyHeader.appendChild(newStickyContent);
      newSticky.appendChild(newStickyHeader);
      document.body.appendChild(newSticky); //appending the whole div element to the doc
      
      c++
      if (c <= colors.length-1){
        document.getElementById("mydiv" + i).style.backgroundColor = colors[c];
        }
      else{
        c = 0;
      }
      closeable.onclick = function() { //this is a delete function, by click the small x on the note you can delete it
        newSticky.parentNode.removeChild(newSticky);
      }
    }
/***************** Saves and loads the page *****************/
/* Saves the pages whole html, stringifies it then puts it in local storage */
  function savePage(){
    let data = document.documentElement.innerHTML 
    let string = JSON.stringify(data);
    localStorage.setItem('notes',string);
  }
/* grabs object from local storage, parses it and pushes it to the window */
  function loadPage(){
    let datapull = localStorage.getItem('notes');
    let page = JSON.parse(datapull);
    document.write(page);
  }
/***************** Clears local storage *****************/
  function clearStorage(){
    confirm("Careful! This will delete everything, do you wish to continue?")
    if(confirm == false){
      window.localStorage.removeItem('notes');
    }
  }
/***************** Makes notes editable *****************/
  function editSticky(e){
    e.target.focus();

  }
/***************** Grants acsess the dragElement function *****************/
  function dragSticky(e) {
      dragElement(document.getElementById("mydiv" + i));
  }

  /***************** Make the DIV element draggable *****************/

  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + i + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + i + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
