# Group project (Books)

# Overview

Website that gets books information using an API (http://myapi-profstream.herokuapp.com/).

Website link: https://noahlinn.github.io/groupproject1/

Created by: Jason Ouyang, Noah Linn, Anel Tuyebayeva

# User Stories

1. When I load the site, I see links to "All Books" and "Create a New Book". I also see a header (under the links) identifying which view I'm currently in, and a viewing area. The header starts off as "Index of All Books", and the viewing area starts off with a list of all existing books.
2. Each book in the list displays just the book's title.
3. When I click on a single book in the list, the header changes to "Details for {book title}", and the viewing area changes to the full details for that book.
4. When I click on "Create a New Book", the header changes to "New Book Details", and the viewing area changes to a form. The form contains a labelled input for each attribute of the book (as required by the API).
5. When I submit the new book, I see the details page for the book I just created (including an updated header and viewing area).

# Stretch Goals

1. When I am in "Details for {book title}" view, there is a Delete button underneath the book's details. When I click this button, the book gets deleted from the API, and the view changes to the List of All Books.
2. When I am in "Details for {book title}" view, there is an Edit button underneath the book's details. When I click this button, the header changes to "Editing {book-title}", and the viewing area changes to a form. The fields of the form are pre-filled with the book's attributes. When I submit this form, the book gets updated in the API, and my view changes to the Details page for the book I just updated.
The API will only accept your POST request if all fields are present. We want to visually communicate this to our user. So when the Create a New Book form is submitted, before firing off the API call, check that each field has something in it. If any fields are blank, decline to make the API request, and visually indicate that those fields are required. This is called validating the form.
4. Perform form validations on the Edit form as well as the Create form.
5. Put a placeholder on the page while the data is loading (a spinner, something else animated, or even just "Loading..." text)
