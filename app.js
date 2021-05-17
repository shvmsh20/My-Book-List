//Book Class

class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}



//UI Class

class UI{
    static displayBooks(){


        //books are comming fron local storage
        const books = Store.getBooks();

        books.forEach((book)=> UI.addBooktoList(book));
        
    }

        // Add book to UI list function
        static addBooktoList(book){
            const list = document.querySelector("#book-list");
            const row = document.createElement('tr');
            row.innerHTML=`
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete btn btn-sm btn-danger">X</a></td>
            `;
            list.appendChild(row);
            
        }


        //Alerts
        static showAlert(message,className){
            const div = document.createElement("div");
            div.className = `alert alert-${className}`;
            div.appendChild(document.createTextNode(message));
            const container = document.querySelector(".container");
            const form= document.querySelector("#book-form");
            container.insertBefore(div,form);

            //vanish in 2 s
            setTimeout(()=>{
                div.remove();
            },2000);
        }



        //Clear fields function
        static clearFields(){
            document.querySelector("#title").value="";
            document.querySelector("#author").value="";
            document.querySelector("#isbn").value="";
        }


        //Remove Book function
        static deleteBook(el){
            if(el.classList.contains("delete")){
                el.parentElement.parentElement.remove();
            }
        }
    }






//Store Class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem("books")===null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static addBook(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
    }

    static removeBook(isbn){
        const books= Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem("books",JSON.stringify(books));
    }
}


//Display Book Event

document.addEventListener("DOMContentLoaded",UI.displayBooks);



//Add Book Event

document.querySelector("#book-form").addEventListener("submit",(e)=>{
    //prevent from submitting
    e.preventDefault();

    //Get values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    //Validation
    if(title==="" || author==="" || isbn===""){
        //success message
        UI. showAlert("Please fill all fields","danger");

    }else{
        //Instantiate
        const book = new Book(title, author, isbn);
        
        //Add to UI list
        UI.addBooktoList(book);

        //Add Book to Store
        Store.addBook(book);

        //Clear fields
        UI.clearFields();
        
        //alert
        UI.showAlert("Book Added","success");
    } 

});




//Remove Book Event

document.querySelector("#book-list").addEventListener("click",(e)=>{
    //Remove from UI list
    UI.deleteBook(e.target);
    
    //Remove from localstorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //show success message
    UI.showAlert("Book Removed","success");
});


