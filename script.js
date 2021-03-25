//http://myapi-profstream.herokuapp.com/api/b9c89d/books

const allBooks = document.querySelector('#allBooks')
const newBook = document.querySelector('#createBooks')
const loadPage = document.querySelector('.onLoad')
const allBooksContainer = document.querySelector('.displayAllBooks')
const createBookContainer = document.querySelector('#newBook')
const bookList = document.querySelector('.listOfBooks')
const bookDetailContainer = document.querySelector('.bookDetails')
const submitForm = document.querySelector('#new-book-form')




//get request
const getData = async() =>{
    let response = await fetch('http://myapi-profstream.herokuapp.com/api/b9c89d/books')
    let data = await response.json()
    console.log(data)
    bookList.innerHTML = ''
    for (let i in data){
        let bookTitle = data[i].title
        let bookId = data[i].id
        addNewBook(bookTitle, bookId)
    }
}

addNewBook = (title, id) => {
    let bookTitle = document.createElement('li')

    bookTitle.innerHTML = title
    bookList.append(bookTitle)
    bookTitle.addEventListener('click',() =>{
        showBook(id)
    })
}






const createBook = async(body_params) => {
    try {
        const resp = await fetch('http://myapi-profstream.herokuapp.com/api/b9c89d/books', 
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
        else if (resp.status === 201) {
            // Have the dom show the new books
            // showBook(resp.json().id)
            const data = await resp.json()
            console.log(data)
            showBook(data.id)
            submitForm.classList.add('hidden')
            submitForm.reset()
            getData()
        } 
    }
    catch(error) {
        console.log(error);
        return;
    }
}

const showBook = async (id) => {
    const res = await fetch(`http://myapi-profstream.herokuapp.com/api/b9c89d/books/${id}`)
    const data = await res.json()
    document.querySelector('#details-header').innerText = `Details for ${data.title}`
    document.querySelector('#show-name').innerText = data.title
    document.querySelector('#show-author').innerText = data.author
    document.querySelector('#show-release-date').innerText = data.release_date
    document.querySelector('#show-image').src = data.image
    bookDetailContainer.classList.remove('hidden')
    allBooksContainer.classList.add('hidden')
}



submitForm.addEventListener('submit', event =>{
    event.preventDefault()
    let submitArr = event.target.elements
    const body = {}
    for(let i = 0; i<submitArr.length-1; i++){
        console.log(submitArr[i])
        const key = submitArr[i].getAttribute('name')
        console.log(submitArr[i].value)
        body[key] = submitArr[i].value
    }
    createBook(body)
})


allBooks.addEventListener('click', () =>{
    bookDetailContainer.classList.add('hidden')
    allBooksContainer.classList.remove('hidden')
    createBookContainer.classList.add('hidden')

    console.log('click')
})

newBook.addEventListener('click', () => {
    allBooksContainer.classList.add('hidden')
    bookDetailContainer.classList.add('hidden')
    createBookContainer.classList.remove('hidden')
    submitForm.classList.remove('hidden')
    // console.log(submitForm)
})
