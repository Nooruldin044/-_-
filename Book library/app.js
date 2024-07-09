document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('book-form');
    const bookList = document.getElementById('book-list');
    const searchInput = document.getElementById('search');
    const categoriesSelect = document.getElementById('categories');

    // Function to add a book to the library
    function addBook(title, author, category) {
        const books = getBooks();
        const book = { title, author, category, history: [] };
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
        updateCategories();
    }

    // Function to get books from local storage
    function getBooks() {
        const books = localStorage.getItem('books');
        return books ? JSON.parse(books) : [];
    }

    // Function to display books
    function displayBooks() {
        const books = getBooks();
        const searchQuery = searchInput.value.toLowerCase();
        const selectedCategory = categoriesSelect.value;

        bookList.innerHTML = '';
        books.forEach((book, index) => {
            if ((book.title.toLowerCase().includes(searchQuery) || book.author.toLowerCase().includes(searchQuery)) &&
                (selectedCategory === '' || book.category === selectedCategory)) {
                const bookElement = document.createElement('div');
                bookElement.className = 'book';
                bookElement.innerHTML = `
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <p>Category: ${book.category}</p>
                    <button onclick="borrowBook(${index})">Borrow</button>
                    <button onclick="deleteBook(${index})">Delete</button>
                    <div class="history">
                        <h4>Borrowing History:</h4>
                        ${book.history.map(record => `<p>${record}</p>`).join('')}
                    </div>
                `;
                bookList.appendChild(bookElement);
            }
        });
    }

    // Function to update categories dropdown
    function updateCategories() {
        const books = getBooks();
        const categories = [...new Set(books.map(book => book.category))];
        categoriesSelect.innerHTML = '<option value="">All Categories</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoriesSelect.appendChild(option);
        });
    }

    // Function to delete a book
    window.deleteBook = function(index) {
        const books = getBooks();
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
        updateCategories();
    }

    // Function to borrow a book
    window.borrowBook = function(index) {
        const books = getBooks();
        const book = books[index];
        const borrower = prompt('Enter your name:');
        if (borrower) {
            const date = new Date().toLocaleString();
            book.history.push(`${borrower} borrowed on ${date}`);
            localStorage.setItem('books', JSON.stringify(books));
            displayBooks();
        }
    }

    // Event listener for form submission
    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const category = document.getElementById('category').value;
        addBook(title, author, category);
        bookForm.reset();
    });

    // Event listener for search input
    searchInput.addEventListener('input', displayBooks);

    // Event listener for category change
    categoriesSelect.addEventListener('change', displayBooks);

    // Initial display of books and categories
    displayBooks();
    updateCategories();
});
