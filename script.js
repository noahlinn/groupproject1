//http://myapi-profstream.herokuapp.com/api/b9c89d/books

const allBooks = document.querySelector('#allBooks')
const newBook = document.querySelector('#createBooks')
const loadPage = document.querySelector('.onLoad')
const allBooksContainer = document.querySelector('.displayAllBooks')
const createBookContainer = document.querySelector('#newBook')
const bookList = document.querySelector('.listOfBooks')
const bookDetailContainer = document.querySelector('.bookDetails')
const submitForm = document.querySelector('#new-book-form')
const deleteBookButton = document.getElementById('delete-book-button')
const editBookButton = document.getElementById('edit-book-button')
const editSection = document.querySelector('#edit-section')
const editForm = document.querySelector('#edit-book-form')
const loader = document.querySelector('.loader')
// https://myapi-profstream.herokuapp.com/api/b9c89d/books

//get request
const getData = async() =>{
    loader.classList.remove('hidden')
    try {
        let response = await fetch('http://localhost:3000/books/')  
        if (response.status === 200) {
            let data = await response.json()
            console.log(data)
            bookList.innerHTML = ''
            for (let i in data){
                let bookTitle = data[i].title
                let bookImage = data[i].image
                let bookId = data[i].id
                addNewBook(bookTitle,bookImage, bookId)
            }
            loader.classList.add('hidden')
        }
        else {
            throw new Error('Server Error')
        }
       
        
    } catch (error) {
        displayMessage(error.message)
        loader.classList.add('hidden')
    }
    
}

addNewBook = (title, image, id) => {
    let card = document.createElement('div')
    let bookImage = document.createElement('img')
    let bookTitle = document.createElement('p')
    
    card.classList.add('book-card')

    bookTitle.innerText = title
    bookImage.src = image

    card.append(bookTitle, bookImage)
    
    bookList.append(card)


    card.addEventListener('click',() =>{
        showBook(id)
    })
}






const createBook = async(body_params) => {
    loader.classList.remove('hidden')
    try {
        const resp = await fetch('http://localhost:3000/books/', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body_params),
            });
           
        if (resp.status === 400) {
            throw new Error('Something is missing in your Create a Book Form');
        }
        else if(resp.status === 401) {
            throw new Error('You can only have 10 records at a time with a free account. Please upgrade :)');
        }
        else if (resp.status === 201 || resp.status === 200) {
            // Have the dom show the new books
            // showBook(resp.json().id)
            const data = await resp.json()
            showBook(data.id)
            createBookContainer.classList.add('hidden')
            submitForm.reset()
            getData()
            loader.classList.add('hidden')
        } 
    }
    catch(error) {
        loader.classList.add('hidden')
        displayMessage(error.message);
        return;
    }
}

const showBook = async (id) => {
    loader.classList.remove('hidden')
    try {
        const res = await fetch(`http://localhost:3000/books/${id}`)
        if (res.status === 200) {
            const data = await res.json()
            document.querySelector('#details-header').innerText = `Details for ${data.title}`
            document.querySelector('#show-name').innerText = data.title
            document.querySelector('#show-author').innerText = data.author
            document.querySelector('#show-release-date').innerText = data.release_date
            document.querySelector('#show-image').src = data.image
            newBook.classList.remove('active')
            allBooks.classList.remove('active')
            bookDetailContainer.classList.remove('hidden')
            deleteBookButton.setAttribute('data-id',id);
            allBooksContainer.classList.add('hidden')
            editSection.classList.add('hidden')
            loader.classList.add('hidden')
        }
        else {
            throw new Error('Server Error')
        }
     
    }
    catch(error) {
        displayMessage(error.message)
        loader.classList.add('hidden')
    }
   
    
}

const updateBook = async(id,body_params) => {
    loader.classList.remove('hidden')
    try {
        const resp = await fetch(`http://localhost:3000/books/${id}`, 
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body_params),
            });
       
        if (resp.status === 404) {
            throw new Error('404 error');
        }

        else if (resp.status === 201 || resp.status === 200) {

            // What to do after a book is updated
           showBook(id)
           getData()
           editForm.reset()
           loader.classList.add('hidden')
        } 
    }
    catch(error) {
        loader.classList.add('hidden')
        displayMessage(error.message);
        return;
    }
}

const deleteBook = async (bookId) => {
    loader.classList.remove('hidden')
    try {
        const res = await fetch(`http://localhost:3000/books/${bookId}`, { method: 'DELETE' })
    
        if (res.status === 404) {
            throw new Error('404 error');
        }
        else if (res.status === 200) {
            getData();
            allBooksContainer.classList.remove('hidden');
            bookDetailContainer.classList.add('hidden');
            loader.classList.add('hidden')
        }
    }
    catch(error) {
        loader.classList.add('hidden')
        displayMessage(error.message);
    }
   
     
}

// Check Validation of Form Return true if everything is in th field. False if not
const checkValidation = submitArr => {
    for (let i = 0; i < submitArr.length-1; i++) {
        if (submitArr[i].value === '' && submitArr[i].getAttribute("name") !== 'image') return false;
        // console.log(submitArr[i].getAttribute("name") !== 'image') 

    }

    return true;
}

// Check Validation for Edit Form
const checkValidationEdit = submitArr => {
    for (let i = 0; i < submitArr.length-1; i++) {
        if (submitArr[i].value !== '') return true;
    }

    return false;
}



// Put this in Catch Area of Your Try/Catch.  Shows an error on screen if anything went wrong.
const displayMessage = (error) => {
    document.getElementById('alert-message').innerHTML= "";
    const p = document.createElement('p');
    p.innerText = error
    document.getElementById('alert-message').append(p);
    document.getElementById('alert-message').classList.remove('hidden');
    
    setTimeout(()=> {
        document.getElementById('alert-message').classList.add('hidden');
    },2000);
}

submitForm.addEventListener('submit', event =>{
    event.preventDefault()
    let submitArr = event.target.elements

    if (checkValidation(submitArr)) {
        const body = {}
        for (let i = 0; i<submitArr.length-1; i++){
            const key = submitArr[i].getAttribute('name')
            body[key] = submitArr[i].value
        }
        
        createBook(body)
    }

    else {
        let message = ''
        for (let i = 0; i < submitArr.length-1; i++) {
            if (submitArr[i].value === '' && submitArr[i].getAttribute("name") !== 'image') message += `${submitArr[i].getAttribute('name')} is empty \n`
        }
        displayMessage(message)
    }
   
})

editForm.addEventListener('submit', event => {
    event.preventDefault()
    let updateArr = event.target.elements
    if (checkValidationEdit(updateArr)) {
        const body = {}
        for(let i = 0; i<updateArr.length-1; i++){
            if (updateArr[i].value !== "") {
                const key = updateArr[i].getAttribute('name')
                body[key] = updateArr[i].value
            }
        }
    
        const bookId = editForm.getAttribute('data-id')
        updateBook(bookId, body)
    }

    else {
        displayMessage('Everything is empty')
    }
   
})

allBooks.addEventListener('click', () =>{
    bookDetailContainer.classList.add('hidden')
    allBooksContainer.classList.remove('hidden')
    createBookContainer.classList.add('hidden')
    editSection.classList.add('hidden')
    allBooks.classList.add('active')
    newBook.classList.remove('active')

    console.log('click')
})

newBook.addEventListener('click', () => {
    allBooksContainer.classList.add('hidden')
    bookDetailContainer.classList.add('hidden')
    createBookContainer.classList.remove('hidden')
    submitForm.classList.remove('hidden')
    editSection.classList.add('hidden')
    newBook.classList.add('active')
    allBooks.classList.remove('active')
   
    // console.log(submitForm)
})

// Deletes a book
deleteBookButton.addEventListener('click', (event) => {
    const bookId = event.target.getAttribute('data-id')
    deleteBook(bookId);
    
})

getData();

editBookButton.addEventListener('click', (event) => {
   
    const bookId = deleteBookButton.getAttribute('data-id')
    editForm.setAttribute('data-id', bookId)
    bookDetailContainer.classList.add('hidden') 
    editSection.classList.remove('hidden')
    let bookName = document.querySelector('#show-name').innerText
    document.querySelector('#edit-header').innerText = `Edit ${bookName}`
})