document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search)
    const courseId = params.get("courseId")

    console.log("Course ID from URL:", courseId)

    const course = coursesJSON.find(c => c.id == courseId)

    console.log("Course found:", course)

    if (!course) {
        document.querySelector(".main-content").innerHTML = "<h2>404 Course not found.</h2><a href='courses.html'>Back to Courses</a>"
        return
    }

    renderCourseDetails(course)
})

function renderCourseDetails(course) {
    document.getElementById("courseTitle").textContent = course.title

    const catObj = categoriesData.find(c => c.id === course.category)
    const catName = catObj ? catObj.name : course.category

    const diffMap = { 1: "Beginner", 2: "Intermediate", 3: "Advanced" }
    const diffLabel = diffMap[course.level] || "Unknown"

    const relatedBooks = booksJSON.filter(book => course.books.includes(book.id))

    let booksHTML = ""
    if (relatedBooks.length > 0) {
        booksHTML = `<div class="related-books">
            <h3>Available Books</h3>
            <div class="books-horizontal-list">
                ${relatedBooks.map(book =>
                    `<div class="book-scroll-item">
                        <img class="book-img" src="${book.image}" alt="${book.Title}">
                        <div class="book-info">
                            <h3 class="book-title" style="font-size:1rem">${book.Title}</h3>
                            <p class="book-desc" style="-webkit-line-clamp:2">${book.Description}</p>
                        <div class="book-secondary-info" style="justify-content:flex-start">
                        </div>
                    </div>
                </li>
                `).join('')}
            </ul>
        </div>`
    } else {
        booksHTML = "<p>No textbooks required for this course.</p>"
    }

    const container = document.getElementById("courseDetailsContainer")

    container.innerHTML = `
        <div class="course-info">
            <div class="course-meta-tags">
                <span class="badge" style="background:#745151ff">${catName}</span>
                <span class="badge" style="background:${getDiffColor(course.level)}">${diffLabel}</span>
            </div>
            <p class="teacher-name">Taught by <strong>${course.teacher}</strong></p>
            <p class="duration-info">Duration: ${course.duration} Weeks</p>
        </div>
        <div class="course-description-section">
            <h2>About this Course</h2>
            <p>${course.description}</p>
        </div>

        ${booksHTML}
    `
}

function getDiffColor(level) {
    if (level === 1) return "#28a745"
    if (level === 2) return "#fd7e14"
    return "#dc3545"
}