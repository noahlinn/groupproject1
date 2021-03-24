//http://myapi-profstream.herokuapp.com/api/b9c89d/books

const allBooks = document.querySelector('#allBooks')
const newBook = document.querySelector('#createBooks')
const loadPage = document.querySelector('.onLoad')
const allBooksContainer = document.querySelector('.displayAllBooks')
const createBookContainer = document.querySelector('.displayCreateBooks')



//get request
const getData = async() =>{
let response = await fetch('http://myapi-profstream.herokuapp.com/api/b9c89d/books')
let data = await response.json()
console.log(data)}

getData()

allBooks.addEventListener('click', () =>{
    loadPage.classList.add('hidden')
    allBooks.classList.add('hidden')
    allBooksContainer.classList.remove('hidden')
    // newBook.classList.add('hidden')
    // newBook.classList.remove('hidden')
    console.log('click')
})

newBook.addEventListener('click', () => {
    loadPage.classList.add('hidden')
    newBook.classList.add('hidden')
    createBookContainer.classList.remove('hidden')
})
