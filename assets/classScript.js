class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    this.books.forEach((book, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${index + 1}</td><td>${book.title}</td><td>${book.author}</td>`;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.classList.add('removeBtn');
      removeBtn.onclick = () => {
        this.removeBook(book);
      };

      const tdAction = document.createElement('td');
      tdAction.appendChild(removeBtn);
      tr.appendChild(tdAction);
      bookList.appendChild(tr);
    });
  }

  addBook(title, author) {
    const book = { title, author };
    this.books.push(book);
    this.displayBooks();
    this.saveBooks();
  }

  removeBook(bookToRemove) {
    this.books = this.books.filter((book) => book !== bookToRemove);
    this.displayBooks();
    this.saveBooks();
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }
}

const bookCollection = new BookCollection();
// eslint-disable-next-line no-unused-vars
function addBook() {
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (title !== '' && author !== '') {
    bookCollection.addBook(title, author);
    titleInput.value = '';
    authorInput.value = '';
  }
}

bookCollection.displayBooks();
