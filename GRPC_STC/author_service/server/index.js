var author_book = require('../protos/author_book_pb');
var author_book_grpc = require('../protos/author_book_grpc_pb');
var grpc = require('@grpc/grpc-js');

function callFindBookByBookName() {
  var client = new author_book_grpc.FindBooksClient('localhost:8081', grpc.credentials.createInsecure());
  var bookName = new author_book.BookName();
  // hard coded values
  bookName.setName('Madol Duva');
  client.findBookByBookName(bookName, function(error, response){
    if(error) {
      console.log(error);
      return;
    }
    
    var book = { 
      name: response.getName().getName(), 
      author: {firstname: response.getAuthor().getFirstname(), lastname: response.getAuthor().getLastname()},
      description: response.getDescription(),
      genre: response.getGenre(),
    }

    console.log(book);
  })
}


function main() {
  callFindBookByBookName();
}

main();