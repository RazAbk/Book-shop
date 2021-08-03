"use strict";

function init() {
  renderBooks();
}

function renderBooks() {
  gBooks = loadFromStorage("booksDb");

  // In case no books, add books to show
  if (!gBooks || gBooks.length === 0) {
    gBooks = [];
    createBooks();
  }

  var books = getBooksByPageSize();

  var elPageIdx = document.querySelector(".page-idx");
  elPageIdx.innerText = gPageIdx + 1;

  var elContent = document.querySelector(".content");

  var strHtmls = books.map(function (book) {
    return `
             <tr>
                 <td class="align-middle">${book.id}</td>
                 <td class="align-middle"><img src="${
                   book.img
                 }" class="img rounded rounded mx-auto d-block"></td>
                 <td class="align-middle change-title-${
                   book.id
                 }">${book.title}</td>
                 <td class="align-middle change-price-${
                   book.id
                 }">${formatCurrency(book.price)}</td>
                 <td  class="align-middle" colspan="3">
                  <div class="container">
                  <div class="row p-0">
                  <div class="col-md-4">
                  <button onclick="onReadBook('${
                    book.id
                  }')" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#readModal" data-trans="read">
                    Read
                  </button>
                  </div>
                  <div class="col-md-4">

                  <button onclick="onUpdateModal('${
                    book.id
                  }')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal" data-trans="update">
                    Update
                  </button>
                  
                  </div>
                  <div class="col-md-4">
                  <button class="btn btn-danger" onclick="onRemoveBook('${
                    book.id
                  }')" data-trans="delete">
                    Delete
                  </button>
                  </div>
                  
                  </div>
                  </div>
                  </td>
            </tr>`;
  });

  strHtmls = strHtmls.join("");

  elContent.innerHTML = strHtmls;
}

function onAddBook() {
  var elBookTitle = document.querySelector("[name=title]");
  var elBookPrice = document.querySelector("[name=price]");
  var elBookImg = document.querySelector("[name=img]");

  if (!elBookTitle.value || !elBookPrice.value || !elBookImg.value) return;

  addBook(elBookTitle.value, +elBookPrice.value, elBookImg.value);

  elBookTitle.value = "";
  elBookPrice.value = "";
  elBookImg.value = "";

  renderBooks();
}

function onRemoveBook(bookId) {
  deleteBook(bookId);
  renderBooks();
}

function onReadBook(bookId) {
  var elBookModal = document.querySelector(".book-read");

  var book = getBookById(bookId);

  document.querySelector(".book-title").innerText = book.title;
  document.querySelector(".book-price").innerText =
    " - " + formatCurrency(book.price);

  document.querySelector("[data-id]").value = bookId;

  // Trigger a click in order to display the current rating
  if (book.rating) document.querySelector(`.star-${book.rating}`).click();

  var strHtml = `
  <div class="container">
    <div class="row">
      <div class="col">
      ${makeLorem(30)}
      </div>
      <div class="col">
      <img src="${book.img}" />
      </div>
    
    </div>
  </div>
`;

  elBookModal.innerHTML = strHtml;
}

function onUpdateModal(bookId) {
  var elBookModal = document.querySelector(".book-update");

  var book = getBookById(bookId);

  var strHtml = `
                  
<div class="card card-body bg-light">
 

<div class="row justify-content-center">
  <input class="rounded-pill text-center" type="text" name="title-update-${book.id}" placeholder="${book.title}">
</div>

<div class="row justify-content-center">
  <input class="rounded-pill text-center" type="number" name="price-update-${book.id}" placeholder="${book.price}">
</div>

</div>

</div>
</div>
`;

  elBookModal.innerHTML = strHtml;

  var elUpdateBtn = document.querySelector('.on-update-btn');
  elUpdateBtn.dataset.updateid = bookId;


}

function onUpdateBook(bookId){
  var bookTitle = document.querySelector(`[name=title-update-${bookId}]`).value;
  var bookPrice = document.querySelector(`[name=price-update-${bookId}]`).value;

  if(bookTitle && bookPrice){
    updateBook(bookId, bookTitle, bookPrice);
    var elUpdateQuitBtn = document.querySelector('.update-quit');
    elUpdateQuitBtn.click();
    renderBooks();
  }
}

function onSetRating(rating) {
  if (!rating) return;

  var bookId = document.querySelector("[data-id]").value;

  setBookRating(bookId, rating);
}

function onNextPage(indicator) {
  nextPage(indicator);
  renderBooks();
  doTrans();
}

function onFilterBy(filterBy) {
  filterBooks(filterBy);
  renderBooks();
}

function onSetLang(lang) {
  setLang(lang);

  if (lang === "he") {
    document.querySelector("html").dir = "rtl";
  } else {
    document.querySelector("html").dir = "ltr";
  }

  renderBooks();
  doTrans();
}
