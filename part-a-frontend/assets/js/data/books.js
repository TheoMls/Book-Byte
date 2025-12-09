books = [
    '{ "id": 1, "Title": "1", "Description": "Test2", "Course": "Course 1", "publicationYear": "2022", "Publisher": "Tziolas", "image": "null", "Availability": 1 }',
    '{ "id": 2, "Title": "2", "Description": "Test2", "Course": "Course 2", "publicationYear": "2004", "Publisher": "Klidarithmos", "image": "null", "Availability": 0 }'
]

titleList = []
courses = new Set()
publicationYearSet = new Set()
publishers = new Set()
availabilityList = []

window.onload = function get_book_data() {
    books.forEach(book => load_books(book))
    console.log("books loaded")
    fixFilters()
    console.log("updated filters")
}


function load_books(book) {
    // load book data
    book = JSON.parse(book)
    id = book["id"]
    title = book["Title"]
    titleList.push([id, title])
    description = book["Description"]
    course = book["Course"]
    courses.add(course)
    publicationYear = book["publicationYear"]
    publicationYearSet.add(publicationYear)
    publisher = book["Publisher"]
    publishers.add(publisher)
    image = book["image"]
    availability = book["Availability"]
    availabilityList.push([id, availability])

    // show books on page
    display_book(title, description, course)
}

// TODO: needs rebuilt with cresteElement() not innerHTML 
function display_book(title, description, course) {
    li = '<h2>' + title + '</h2>' + '<p>' + description + '</p>' + '<h3>' + course + '</h3>'
    document.getElementById('book').innerHTML += li
}

// fix filters according to book data
function fixFilters() {
    minPublicationYear = Math.min(...publicationYearSet);
    maxPublicationYear = Math.max(...publicationYearSet);
    let publicationYearFilter = document.getElementById('publicationYear')
    publicationYearFilter.setAttribute('min', minPublicationYear)
    publicationYearFilter.setAttribute('max', maxPublicationYear)
    publicationYearFilter.setAttribute('value', maxPublicationYear)

    courses.forEach(course => updateExpandedFilter(course, 'courses'));
    publishers.forEach(publisher => updateExpandedFilter(publisher, 'publishers'))
}

function updateExpandedFilter(item, id) {
    let list = document.getElementById(id)

    // Create elements
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    if (id === 'courses')
        checkboxId = 'course'
    else if (id === 'publishers')
        checkboxId = 'publisher'

    checkbox.id = checkboxId;

    const label = document.createElement('label');
    label.setAttribute('for', checkbox.id);
    label.textContent = item;

    // Build structure
    li.appendChild(label);
    li.appendChild(checkbox);

    // Add to DOM
    list.appendChild(li);
}