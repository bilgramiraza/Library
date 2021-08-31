function Book(title, author, pageCount, isRead) {
	this.title=title;
	this.author=author;
	this.pageCount=pageCount;
	this.isRead=isRead;
}

let library=[];
library.push(new Book('The Lord of the Rings','J.R.R Tolkien',250,false));
library.push(new Book('The hobbit','J.R.R Tolkien',100,true));
library.push(new Book('The cat in the hat','Dr. Suess',35,false));
library.push(new Book('Sherlock Holmes','Sir Arthur Conan Doyle',175,true));

function displayAll() {
    const shelf=document.querySelector('.bookShelf');
    library.forEach((book)=>{
        let item=document.createElement('div');
        item.textContent=book.title;
        item.classList.add('book');
        if(book.isRead)
            item.classList.add('read');
        else
            item.classList.add('notread');
        shelf.appendChild(item);
    })
}
displayAll();

document.querySelector('.bookShelf').addEventListener('click',(event)=>{
    const book=lookup(event.target.textContent);
    display(book)
})

function lookup(title) {
    for(book of library){
        if(book.title===title)
            return book;
    }
}

function display(obj) {
    const title=document.querySelector('#title');
    const author=document.querySelector('#author');
    const pages=document.querySelector('#pages');
    const read=document.querySelector('#read');
    title.textContent=obj.title;
    author.textContent=obj.author;
    pages.textContent=obj.pageCount;
    read.textContent=obj.isRead;
}

const input=document.querySelector('#add');
input.addEventListener('click',()=>{
    // document.querySelector('.display').classList.add('hide');
    document.querySelector('.input').classList.remove('hide');
    document.querySelector('#submit').addEventListener('click',addBook);
})

function addBook() {
    const input=document.querySelector('#inputTitle');
    const Author=document.querySelector('#inputAuthor');
    const Pages=document.querySelector('#inputPages');
    const Read=document.querySelector('#inputRead');
    library.push(new Book(input.value,Author.value,Pages.value,Read.checked));
    displayAll();
}

const remove=document.querySelector('#remove');
remove.addEventListener('click',()=>{
    const toBeRemoved=document.querySelector('#title').textContent;
    let index = library.map((book)=>{
        return book.title;
    }).indexOf(toBeRemoved);
    let library1=(library.slice(0,index));
    let library2=(library.slice(index+1));
    library=[...library1,...library2];
    displayAll();
})