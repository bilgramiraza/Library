//The Book Object
function Book(title, author, pageCount, isRead) {
	this.title=title;
	this.author=author;
	this.pageCount=pageCount;
	this.isRead=isRead;
}
//The Book Object

let library=[]; //The array that will hold all the Book Objects 

window.onload=init();  

//startup function
function init() {
    const addBtn=document.querySelector('#add');
    const delBtn=document.querySelector('#remove');
    const readEditbtn=document.querySelector('.material-icons');
    const bookShelf=document.querySelector('.bookShelf');
    addBtn.addEventListener('click',addBookHandling);
    delBtn.addEventListener('click',delBookHandling);
    readEditbtn.addEventListener('click',bookReadToggle);
    bookShelf.addEventListener('click',(event)=>{           //Event Handler responsible for the BookShelf functionality
        displayBookHandling(event.target.textContent);
    });
    loadLibraryHandling();
    displayAll();
    displayBook(library[0]);
}
//startup function

//Add Book
//Manages the ErrorHandling for the function
function addBookHandling() {
    if(library.length===18){
        alert('Shelf Full');
        return;
    }
    toggleVisibility();         //Hides the Book display section
    const submitBtn=document.querySelector('#submit');
    const cancelBtn=document.querySelector('#cancel');
    submitBtn.addEventListener('click',addBook,{once:true});
    cancelBtn.addEventListener('click',()=>{
        toggleVisibility();
        displayAll();
    },{once:true});
}
//Manages the ErrorHandling for the function
//Responsible to add the book
function addBook(){
    const inputs=document.querySelectorAll('input');
    let duplicateCheck=lookUp(inputs[0].value);
    if(duplicateCheck!==-1){                //Checking if the title already exists in the library
        alert('Book Already Exists.');
        toggleVisibility();
        return;
    }
    //Pushing the New Book object into the array
    library.push(new Book(inputs[0].value,
                        inputs[1].value,
                        parseInt(inputs[2].value,10),
                        inputs[3].checked));
    localStorageUpdate();       //Update the localStorage 
    toggleVisibility();         //Hides the input section
    displayAll();               //Updates the shelf
}
//Responsible for swapping between the display and input sections
function toggleVisibility() {
    const displayWindow=document.querySelector('.display');
    const inputWindow=document.querySelector('.input');
    displayWindow.classList.toggle('hide');
    inputWindow.classList.toggle('hide');
}
//Add Book

//Delete Book
//Manages the ErrorHandling for the function
function delBookHandling() {
    if(library.length===0){         //Checks if the library is empty
        alert("Shelf Empty");
        return;
    }
    const title=document.querySelector('#title');
    const index=lookUp(title.textContent);          //Locates the index of the book to be removed
    if(index===-1)                                  //above function returns -1 if the book doesn't exist
        return;
    delBook(index);                                 //Deletes the book
}
//Deletes the book from the array
function delBook(position) {
    let libraryLeft=library.slice(0,position);      //Selects all the elements from the left of the target book
    let libraryRight=library.slice(position+1);     //Selects all the elements from the right of the target book
    library=[...libraryLeft,...libraryRight];       //Overights the old library array with all the elements except the target book
    localStorageUpdate();                           //updates the localStorage
    displayAll();                                   //Updates the shelf
}
//Delete Book

//Display Shelf functionality
//Handles the funcitonality of the Bookshelf
function displayAll() {
    const bookShelf=document.querySelector('.bookShelf');
    if(bookShelf.lastElementChild!==null)           //checks if the bookshelf has any HTML elements in it
        clearBoard();                               //clears the Div if true
    library.forEach((book)=>{                       //Iterates through the array of objects and extracts the name of the book
        let element=createElement(book);            //and fills the shelf using them. uses a function to get the DOM element built
        bookShelf.appendChild(element);             //which it them appends to the end of the BookShelf DOM Element
    });
}
//Generates the DOM element
//Creates a DOM element of the specified Book object and returns it to be appended
//the DOM element get 2 classes first being "Book" and the other can be either "read" or "notread" depending on the value of the 
//isRead property of the object
function createElement(obj) {
    const item=document.createElement('div');
    item.textContent=obj.title;
    item.classList.add('book');
    if(obj.isRead)
        item.classList.add('read');
    else
       item.classList.add('notread');
    return item;
}
//Clears the board
//checks if the last child of the DOM exists. if true removes it.  
function clearBoard() {
    const parentNode=document.querySelector('.bookShelf');
    while(parentNode.lastChild)
        parentNode.removeChild(parentNode.lastChild);
}

//Display Book
//Manages the ErrorHandling for the function
function displayBookHandling(title) {
    const index=lookUp(title);
    if(index===-1)
        return;
    displayBook(library[index]);
}
//Displays the details of the specified Book
function displayBook(book) {
    const title=document.querySelector('#title');
    const author=document.querySelector('#author');
    const pages=document.querySelector('#pages');
    const read=document.querySelector('#read');

    title.textContent=book.title;
    author.textContent=book.author;
    pages.textContent=book.pageCount;
    if(book.isRead){
        read.textContent='Read';
        read.parentNode.classList.remove('notread');
        read.parentNode.classList.add('read');
    }
    else{
        read.textContent='Not Read';
        read.parentNode.classList.remove('read');
        read.parentNode.classList.add('notread');
    }
}
//Returns the index of the specified book in the array using its title
//Uses Map function to get an array that contains the titles of all the present books
//then applies the indexOf function to locate the title of the book in the array
//Which is then finally returned
function lookUp(title) {
    return library.map((book)=>{return book.title})
                  .indexOf(title);
}
//Gives the user the ability to update the read status of any book entered into the library
function bookReadToggle() {
    const title=document.querySelector('#title').textContent;   //gets the title of the book
    const read=document.querySelector('#read');
    const index=lookUp(title);                                  //gets its index in the array
    library[index].isRead=!(library[index].isRead);             //flips its read status
    localStorageUpdate();                                       //Updates localStorage
    displayAll();                                               //Updates Shelf
    displayBook(library[index]);                                //updates the Book Display 
}
//Display Book

//Loading Library from memory
//Manages the ErrorHandling for the function
function loadLibraryHandling() {
    if(storageAvailable('localStorage'))    //if the system supports localStorage
    {
        if(localStorage.length>0)           //checks if the Library is empty
            library=[...JSON.parse(localStorage.getItem('library'))];   //loads data from localStorage
        else {                              //if first time visit
            loadDummyData();                //loads some dummy data
            localStorage.setItem('library',JSON.stringify(library));    //and adds it the memory
        }
    }
    else                                    //if the browser doesn't support localStorage
        loadDummyData();                    //Just loads the dummy data for temporary usage
}
//Pushes Dummy Data for display Purposes
function loadDummyData() {
    library.push(new Book('LOTR:The Fellowship of the Ring','J.R.R Tolkien',479,false));
    library.push(new Book('The Hobbit','J.R.R Tolkien',304,true));
    library.push(new Book('The Cat in the Hat','Dr. Seuss',61,false));
    library.push(new Book('The Adventures of Sherlock Holmes','Sir Arthur Conan Doyle',307,true));
    library.push(new Book('Animal Farm','George Orwell',112,false));
    library.push(new Book('The Great Gatsby','F. Scott Fitzgerald',160,true));
    library.push(new Book('The Catcher in the Rye','J. D. Salinger',277,false));
}
//Checks if the browser supports localStorage
// Credit:https://developer.mozilla.org Taken from:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];         //loads and removes random data into the localStorage
        let x = '__storage_test__';     //and checks for if an error is triggered
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
//Updates the localStorage
function localStorageUpdate() {
    if(!storageAvailable('localStorage'))   //checks if localStorage is available
        return;
    localStorage.clear();                   //if it is clears the existing localStorage
    localStorage.setItem('library',JSON.stringify(library));    //and loads the new data
}
//Loading Library from memory