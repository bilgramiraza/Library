function Book(title, author, pageCount, isRead) {
	this.title=title;
	this.author=author;
	this.pageCount=pageCount;
	this.isRead=isRead;
}
let library=[];

window.onload=init();

function init() {
    const addBtn=document.querySelector('#add');
    const delBtn=document.querySelector('#remove');
    const bookShelf=document.querySelector('.bookShelf');
    addBtn.addEventListener('click',addBookHandling);
    delBtn.addEventListener('click',delBookHandling);
    bookShelf.addEventListener('click',(event)=>{
        displayBookHandling(event.target.textContent);
    });
    loadLibraryHandling();
    displayAll();
    displayBook(library[0]);
}

function addBookHandling() {
    if(library.length===18){
        alert('Shelf Full');
        return;
    }
    toggleVisibility();
    const submitBtn=document.querySelector('#submit');
    submitBtn.addEventListener('click',addBook,{once:true});
}
function addBook(){
    const inputs=document.querySelectorAll('input');
    library.push(new Book(inputs[0].value,
                        inputs[1].value,
                        parseInt(inputs[2].value,10),
                        inputs[3].checked));
    toggleVisibility();
    displayAll();
}
function toggleVisibility() {
    const displayWindow=document.querySelector('.display');
    const inputWindow=document.querySelector('.input');
    displayWindow.classList.toggle('hide');
    inputWindow.classList.toggle('hide');
}

function delBookHandling() {
    if(library.length===0){
        alert("Shelf Empty");
        return;
    }
    const title=document.querySelector('#title');
    const index=lookUp(title.textContent);
    if(index===-1)
        return;
    clearBoard();
    delBook(index);
}
function delBook(position) {
    let libraryLeft=library.slice(0,position);
    let libraryRight=library.slice(position+1);
    library=[...libraryLeft,...libraryRight];
    displayAll();
}

function displayAll() {
    const bookShelf=document.querySelector('.bookShelf');
    if(bookShelf.lastElementChild!==null)
        clearBoard();
    library.forEach((book)=>{
        let element=createElement(book);
        bookShelf.appendChild(element);    
    });
}
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
function clearBoard() {
    const parentNode=document.querySelector('.bookShelf');
    while(parentNode.lastChild)
        parentNode.removeChild(parentNode.lastChild);
}

function displayBookHandling(title) {
    const index=lookUp(title);
    if(index===-1)
        return;
    displayBook(library[index]);
}
function displayBook(book) {
    const title=document.querySelector('#title');
    const author=document.querySelector('#author');
    const pages=document.querySelector('#pages');
    const read=document.querySelector('#read');
    title.textContent=book.title;
    author.textContent=book.author;
    pages.textContent=book.pageCount;
    if(book.isRead)
        read.textContent='Read';
    else
        read.textContent='Not Read';
}

function lookUp(title) {
    return library.map((book)=>{return book.title})
                  .indexOf(title);
}

function loadLibraryHandling() {
    //TODO: Local data storage implementation
    loadDummyData();
}

function loadDummyData() {
    library.push(new Book('The Lord of the Rings','J.R.R Tolkien',250,false));
    library.push(new Book('The hobbit','J.R.R Tolkien',100,true));
    library.push(new Book('The cat in the hat','Dr. Suess',35,false));
    library.push(new Book('Sherlock Holmes','Sir Arthur Conan Doyle',175,true));
}