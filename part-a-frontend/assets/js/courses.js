document.addEventListener("DOMContentLoaded", () => {
    populateCategoryFilters()

    const params = new URLSearchParams(window.location.search)
    const categoryParam = params.get("courseCategory")
    let initialFilterApplied = false

    if (categoryParam) {
        const checkbox = document.querySelector(`#categories input[value="${categoryParam}"]`)

        if (checkbox) {
            checkbox.checked = true
            applyCourseFilters()
            initialFilterApplied = true
        }
    }

    if (!initialFilterApplied) {
        renderCourses(coursesJSON)
    }

    // Apply Button
    document.getElementById("applyBtn").addEventListener("click", applyCourseFilters)

    const searchInput = document.querySelector('input[name="search"]')
    if (searchInput) {
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") applyCourseFilters()
        })
    }

    // Search Button
    const searchBtn = document.querySelector('.search-container button')
    if (searchBtn) {
        searchBtn.addEventListener("click", applyCourseFilters)
    }
})

const difficultyMap = {
    1: { label: "Beginner", color: "#28a745" },
    2: { label: "Intermediate", color: "#fd7e14" },
    3: { label: "Advanced", color: "#dc3545" }
}

function renderCourses(courses) {
    const listContainer = document.getElementById("coursessList")
    listContainer.innerHTML = ""

    if (courses.length === 0) {
        listContainer.innerHTML = "<p style='width:100% text-align:center padding:20px'>No courses found.</p>"
        return
    }

    courses.forEach(course => {
        const catObj = categoriesData.find(c => c.id === course.category)
        const catName = catObj ? catObj.name : course.category

        const diffInfo = difficultyMap[course.level] || { label: "Unknown", color: "#333" }

        const li = document.createElement("li")
        li.className = "course-card"

        li.innerHTML = `
            <div class="course-header">
                <span class="badge" style="background-color: #745151ff">${catName}</span>
                <span class="badge" style="background-color: ${diffInfo.color}">${diffInfo.label}</span>
            </div>
            
            <h3 class="course-title">${course.title}</h3>
            <p class="course-teacher">${course.teacher}</p>
            
            <p class="course-desc">${course.description}</p>
            
            <div class="course-footer">
                <span>${course.duration} Weeks</span>
                <a href="course-details.html?courseId=${course.id}" class="details-btn">View Details</a>
            </div>
        `

        listContainer.appendChild(li)
    })
}

function populateCategoryFilters() {
    const catList = document.getElementById("categories")
    if (!catList) return

    categoriesData.forEach(cat => {
        const li = document.createElement("li")
        li.innerHTML = `
            <label>
                <input type="checkbox" value="${cat.id}"> ${cat.name}
            </label>
        `
        catList.appendChild(li)
    })
}

function applyCourseFilters() {
    const searchText = document.querySelector('input[name="search"]').value.toLowerCase()

    const enableDuration = document.getElementById("enableDuration").checked
    const maxDuration = parseInt(document.getElementById("maxDuration").value)

    const enableDifficulty = document.getElementById("enableDifficulty").checked
    const maxDifficulty = parseInt(document.getElementById("maxDifficulty").value)

    const checkedCats = Array.from(document.querySelectorAll("#categories input:checked")).map(cb => cb.value)

    const filtered = coursesJSON.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchText) ||
            course.description.toLowerCase().includes(searchText) ||
            course.teacher.toLowerCase().includes(searchText)

        const matchesDuration = enableDuration ? (course.duration <= maxDuration) : true

        const matchesDifficulty = enableDifficulty ? (course.level <= maxDifficulty) : true

        const matchesCategory = checkedCats.length === 0 || checkedCats.includes(course.category)

        return matchesSearch && matchesDuration && matchesDifficulty && matchesCategory
    })

    renderCourses(filtered)
    const baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({ path: baseUrl }, '', baseUrl);
}

function toggleSlider(sliderId, checkbox) {
    const slider = document.getElementById(sliderId)
    slider.disabled = !checkbox.checked

    applyCourseFilters()
}