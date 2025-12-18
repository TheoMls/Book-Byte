let books = []
let coursesSet = new Set()
let publicationYearSet = new Set()
let publishersSet = new Set()

window.onload = function init() {
    booksJSON.forEach(book => {
        books.push(book)

        book.Course.forEach(cID => coursesSet.add(cID))
        publicationYearSet.add(book.publicationYear)
        publishersSet.add(book.Publisher)
    })

    fixFilters()
    renderBooks(books)

    document.getElementById("applyBtn").addEventListener("click", applyFilters)
}

function renderBooks(booksToDisplay) {
    const bookList = document.getElementById("booksList")
    bookList.innerHTML = ""

    if (booksToDisplay.length === 0) {
        bookList.innerHTML = "<p>No books found.</p>"
        return
    }

    booksToDisplay.forEach(book => display_book(book))
}

function display_book(book) {
    const bookList = document.getElementById("booksList")

    const li = document.createElement('li')
    li.className = 'book-container'

    const courseLinks = book.Course.map(courseId => {
        const courseObj = coursesJSON.find(c => c.id == courseId)
        const title = courseObj ? courseObj.title : "Unknown Course"
        return `<a href="./course-details.html?courseId=${courseId}">${title}</a>`
    }).join(", ")

    li.innerHTML = `
        <img class="book-img" src="${book.image}" alt="${book.Title}">
        <div class="book-info">
            <div class="book-important-info">
                <h3 class="book-title">${book.Title}</h3>
                <p class="book-desc">${book.Description}</p>
            </div>
            <div class="book-secondary-info">
                <p class="book-publisher">${book.Publisher}</p>
                <p class="book-course"><strong>Course:</strong> ${courseLinks}</p>
                <p class="book-publication-year">Published: ${book.publicationYear}</p>
                <p class="book-availability">
                    In Stock: ${book.Availability}
                </p>
            </div>
        </div>
    `

    bookList.appendChild(li)
}


function fixFilters() {
    if (publicationYearSet.size > 0) {
        const minYear = Math.min(...publicationYearSet)
        const maxYear = Math.max(...publicationYearSet)
        const yearInput = document.getElementById('maxYear')
        if (yearInput) {
            yearInput.setAttribute('min', minYear)
            yearInput.setAttribute('max', maxYear)
            yearInput.value = maxYear
        }
    }

    coursesSet.forEach(courseId => {
        const courseObj = coursesJSON.find(c => c.id === courseId)
        if (courseObj) {
            updateExpandedFilter('courses', courseObj.title, courseId)
        }
    })

    publishersSet.forEach(pubName => {
        updateExpandedFilter('publishers', pubName, pubName)
    })
}

function updateExpandedFilter(containerId, labelText, value) {
    const list = document.getElementById(containerId)
    const li = document.createElement('li')

    const safeValue = value.toString().replace(/\s+/g, '-').toLowerCase()
    const uniqueId = `filter-${containerId}-${safeValue}`

    li.innerHTML = `
        <label for="${uniqueId}">
            <input type="checkbox" id="${uniqueId}" value="${value}"> ${labelText}
        </label>
    `

    list.appendChild(li)
}


function applyFilters() {
    const onlyAvailable = document.getElementById("available").checked

    const maxYearInput = document.getElementById("maxYear")
    const maxYear = maxYearInput.value ? parseInt(maxYearInput.value) : 2025

    const checkedCourseIds = Array.from(document.querySelectorAll('#courses input:checked'))
        .map(cb => parseInt(cb.value))

    const checkedPublishers = Array.from(document.querySelectorAll('#publishers input:checked'))
        .map(cb => cb.value)

    const filteredBooks = books.filter(book => {
        if (onlyAvailable && book.Availability === 0) return false

        
        if (book.publicationYear > maxYear && !maxYearInput.disabled) return false

        
        if (checkedCourseIds.length > 0) {
            const hasMatch = book.Course.some(id => checkedCourseIds.includes(id))
            if (!hasMatch) return false
        }

        if (checkedPublishers.length > 0) {
            if (!checkedPublishers.includes(book.Publisher)) return false
        }

        return true
    })

    renderBooks(filteredBooks)
}

function toggleSlider(sliderId, checkbox) {
    const slider = document.getElementById(sliderId)
    slider.disabled = !checkbox.checked

    applyFilters()
}