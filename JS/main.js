var siteName = document.getElementById("bookmarkName") ; 
var siteLink = document.getElementById("bookmarkURL") ; 
var allBook = [] ; 

if (localStorage.getItem("sitesContainer") !== null ) {
  allBook = JSON.parse(localStorage.getItem("sitesContainer"));
  display() ; 
}



function clearErrorContainer() {
  var inputElement = document.getElementById("Error") ; 
  inputElement.classList.remove("d-auto") ; 
  inputElement.classList.add("d-none") ; 
}

function ValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
} ; 

var errorBox = 
`` ; 

function addBook(){
  
  var book = {
    id : siteName.value , 
    link : siteLink.value , 
  }
  

  if ( book.id.length >= 3 && ValidURL(book.link)){
    allBook.push(book) ; 
    localStorage.setItem("sitesContainer", JSON.stringify(allBook));
    restartSetting() ;  
    display() ;
    console.log(allBook);
    
  }else{
    var inputElement = document.getElementById("Error") ; 
    inputElement.classList.remove("d-none") ; 
    inputElement.classList.add("d-auto") ; 
  }
}

function restartSetting() {
  siteName.value = null ; 
  siteLink.value = null ; 
  siteName.classList.add("form-control-invalid");
  siteName.classList.remove("form-control-valid");
  siteLink.classList.add("form-control-invalid");
  siteLink.classList.remove("form-control-valid");
}

function display(){
  var catoona = `` ; 

  for ( var i =0 ; i < allBook.length ; i++ ){
    catoona += `<tr>
        <td>${i + 1}</td>
        <td>${allBook[i].id}</td>
        <td>
          <a href="${allBook[i].link}" target="_blank">
            <button class="btn btn-visit">
              <i class="fa-solid fa-eye pe-2"></i>
              Visit
            </button>
          </a>
        </td>
        <td>
          <button onclick="deleteBook(${i})" class="btn btn-delete">
            <i class="fa-solid fa-trash-can pe-2"></i>
            Delete
          </button>
        </td>
      </tr>` ; 
  }

  document.getElementById("tableContent").innerHTML = catoona ; 
}

function deleteBook(indexForBook) {
  allBook.splice(indexForBook , 1 ) ; 
  localStorage.setItem("sitesContainer", JSON.stringify(allBook));
  display()
}


function nameSiteCheck() {
  var siteName = document.getElementById("bookmarkName").value;
  var inputElement = document.getElementById("bookmarkName");

  if (siteName.length < 3 && siteName.length !== 0) {
    inputElement.classList.add("form-control-invalid");
  } else if (siteName.length >= 3) {
    inputElement.classList.remove("form-control-invalid");
    inputElement.classList.add("form-control-valid");
  } else {
    inputElement.classList.remove("form-control-invalid");
    inputElement.classList.remove("form-control-valid");
  }
}


function linkSiteCheck() {
  var siteLink = document.getElementById("bookmarkURL").value;
  var inputElement = document.getElementById("bookmarkURL");

  if (siteLink === "") {
    inputElement.classList.remove("form-control-invalid");
    inputElement.classList.remove("form-control-valid");
  } else if (ValidURL(siteLink)) {
    inputElement.classList.add("form-control-valid");
    inputElement.classList.remove("form-control-invalid");
  } else {
    inputElement.classList.add("form-control-invalid");
    inputElement.classList.remove("form-control-valid");
  }
}