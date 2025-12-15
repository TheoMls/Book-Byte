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

})