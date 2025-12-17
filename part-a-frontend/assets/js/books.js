books = []
titleList = []
courses = new Set()
publicationYearSet = new Set()
publishers = new Set()
availabilityList = []

window.onload = function get_book_data() {
    booksJSON.forEach(book => load_books(book))
    console.log("books loaded")
    fixFilters()
    console.log("updated filters")
    apply = document.getElementById("applyBtn").addEventListener("click", applyFilters);
}


function load_books(book) {
    // load book data
    books.push(book)
    id = book["id"]
    title = book["Title"]
    titleList.push([id, title])
    description = book["Description"]
    course = book["Course"]
    course.forEach(item => { courses.add(item) })
    publicationYear = book["publicationYear"]
    publicationYearSet.add(publicationYear)
    publisher = book["Publisher"]
    publishers.add(publisher)
    image = book["image"]
    availability = book["Availability"]
    availabilityList.push([id, availability])

    // show books on page
    display_book(book)
}

function display_book(book) {
    let bookList = document.getElementById("booksList")

    // Create elements
    const li = document.createElement('li');
    const img = document.createElement('img');
    const bookInfo = document.createElement('div');
    const importantInfo = document.createElement('div');
    const secondaryInfo = document.createElement('div');
    const title = document.createElement('h3');
    const desc = document.createElement('p');
    const course = document.createElement('p');
    const publisher = document.createElement('p');
    const publicationYear = document.createElement('p');
    const availability = document.createElement('p');

    // Set classes
    li.classList.add('book-container');
    img.classList.add('book-img');
    bookInfo.classList.add('book-info');
    importantInfo.classList.add('book-important-info');
    secondaryInfo.classList.add('book-secondary-info');
    title.classList.add('book-title');
    desc.classList.add('book-desc');
    course.classList.add('book-course');
    publisher.classList.add('book-publisher');
    publicationYear.classList.add('book-publication-year');
    availability.classList.add('book-availability');

    // Set attributes
    img.setAttribute('src', book.image);
    title.textContent = book.Title;
    desc.textContent = book.Description + " 123456789123456789123456789";
    course.textContent = book.Course;
    publisher.textContent = book.Publisher;
    publicationYear.textContent = book.publicationYear;
    availability.textContent = book.Availability;

    // Build structure
    li.appendChild(img);
    li.appendChild(bookInfo);
    bookInfo.appendChild(importantInfo);
    bookInfo.appendChild(secondaryInfo);
    importantInfo.appendChild(title);
    importantInfo.appendChild(desc);
    secondaryInfo.appendChild(publisher);
    secondaryInfo.appendChild(course);
    secondaryInfo.appendChild(publicationYear);
    secondaryInfo.appendChild(availability);

    // Add to DOM
    bookList.appendChild(li);
    console.log("book added")
}

// fix filters according to book data
function fixFilters() {
    minPublicationYear = Math.min(...publicationYearSet);
    maxPublicationYear = Math.max(...publicationYearSet);
    let publicationYearFilter = document.getElementById('publicationYear')
    publicationYearFilter.setAttribute('min', minPublicationYear)
    publicationYearFilter.setAttribute('max', maxPublicationYear)
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

// apply filters
function applyFilters() {
    // remove every book
    let bookList = document.getElementById("booksList")
    while (bookList.hasChildNodes())
        bookList.removeChild(bookList.firstChild)

    // apply filters to show correct books
    books.forEach(book => checkBook(book))
    console.log("filters applied")
}

function checkBook(book) {
    availableFilter = document.getElementById("available").checked
    if (availableFilter && book.Availability === 0)
        return

    publicationYearFilter = document.getElementById("publicationYear").value
    if (book.publicationYear > publicationYearFilter && publicationYearFilter !== "")
        return

    coursesButton = document.getElementById("courses")
    coursesFilter = coursesButton.children
    isValid = false
    allEmpty = true
    for (course of coursesFilter) {
        courseInput = course.getElementsByTagName("input")[0]
        if (courseInput.checked) {
            allEmpty = false
            if (book.Course === course.getElementsByTagName("label")[0].textContent)
                isValid = true
        }
    }
    if (!isValid && !allEmpty)
        return

    publishersButton = document.getElementById("publishers")
    publishersFilter = publishersButton.children
    isValid = false
    allEmpty = true
    for (publisher of publishersFilter) {
        publisherInput = publisher.getElementsByTagName("input")[0]
        if (publisherInput.checked) {
            allEmpty = false
            if (book.Publisher === publisher.getElementsByTagName("label")[0].textContent)
                isValid = true
        }
    }
    if (!isValid && !allEmpty)
        return

    display_book(book)
    return
}