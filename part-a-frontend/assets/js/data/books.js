books = [
    '{ "Title": "1", "Description": "Test2", "image": "null", "availability": 1 }',
    '{ "Title": "2", "Description": "Test2", "image": "null", "availability": 0 }'
]

function display_book(book) {
    book = JSON.parse(book)
    console.log(book)
    title = book["Title"]
    console.log(title)
    li = '<h2>Title: ' + title + '</h2>'
    document.getElementById('book').innerHTML += li
}

window.onload = function display_books() {
    books.forEach(book => display_book(book));
}