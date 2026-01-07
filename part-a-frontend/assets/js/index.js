document.addEventListener('DOMContentLoaded', () => {

    const categoryList = document.getElementById('category-list')

    if (!categoryList) return

    categoryList.innerHTML = ""

    categoriesData.forEach(cat => {
        const li = document.createElement('li')

        const a = document.createElement('a')
        a.textContent = cat.name

        a.href = `courses.html?courseCategory=${cat.id}`

        a.className = "category-link"

        li.appendChild(a)
        categoryList.appendChild(li)
    })

    // make random book suggestions
    const suggestionsMenu = document.getElementById('suggestionsMenu')
    const books = booksJSON
    for (suggestion of suggestionsMenu.children) {
        if (!books.length) break
        const randomIndex = Math.floor(Math.random() * books.length)
        suggestion.children[0].src = `assets/img/books/${books[randomIndex].coverImage}`
        books.splice(randomIndex, 1)
    }
})