const myLibrary = [];
const displayLibraryButton = document.querySelector("#display-library-button");
const dialog = document.querySelector("#new-book-dialog");
const newBookModalWrapper = document.querySelector(".new-book-modal-wrapper");
const newBookForm = document.querySelector("#new-book-form");
const saveButton = document.querySelector("#save-button");
const bookList = document.querySelector(".book-list");
// bookList.style.display = "";

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read),
    (this.info = function () {
      let status;
      if (this.read === "read") {
        status = "read";
      } else status = "not read yet";
      return this.title + " by " + author + ", " + this.pages + " pages, " + status;
    });
}

function addBookToLibrary(book) {
  myLibrary.push(book.info());
}

function displayLibrary() {
  if (bookList.children.length === 0) {
    myLibrary.forEach((book) => {
      const changeReadStatusButton = document.createElement("button");
      changeReadStatusButton.classList = "list-item-button";
      changeReadStatusButton.textContent = "Read";
      const deleteBookButton = document.createElement("button");
      deleteBookButton.classList = "list-item-button";
      deleteBookButton.textContent = "Delete";
      const buttonDiv = document.createElement("div");
      const listDiv = document.createElement("div");
      listDiv.classList = "list-div";
      const listItem = document.createElement("li");
      listItem.classList = "book-list-item";
      listItem.innerHTML = book;
      bookList.appendChild(listDiv);
      listDiv.appendChild(listItem);
      listDiv.appendChild(buttonDiv);
      buttonDiv.appendChild(changeReadStatusButton);
      buttonDiv.appendChild(deleteBookButton);
      deleteBookButton.addEventListener("click", () => {
        let index = myLibrary.indexOf(book);
        myLibrary.splice(index, 1);
        listDiv.remove();
      });
      changeReadStatusButton.addEventListener("click", () => {
        let index = myLibrary.indexOf(book);
        if (myLibrary[index].includes(", read")) {
          myLibrary[index] = myLibrary[index].replace(", read", ", not read yet");
        } else if (myLibrary[index].includes(", not read yet")) {
          myLibrary[index] = myLibrary[index].replace(", not read yet", ", read");
        }
        displayLibrary();
        displayLibrary();
      });
    });
  } else {
    while (bookList.firstChild) {
      bookList.removeChild(bookList.firstChild);
    }
  }
}

displayLibraryButton.addEventListener("click", () => {
  displayLibrary();
});

newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector('input[name="status"]:checked').value;
  title = new Book(title, author, pages, read);
  addBookToLibrary(title);
  showNewBookModal(false);
  newBookForm.reset();
  if (bookList.innerHTML === "") {
    displayLibrary();
  } else {
    displayLibrary();
    displayLibrary();
  }
});

const showNewBookModal = (show) => (show ? dialog.showModal() : dialog.close());
dialog.addEventListener("click", (e) => !newBookModalWrapper.contains(e.target) && dialog.close());
