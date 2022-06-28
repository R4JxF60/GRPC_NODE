var author_book = require('../protos/author_book_pb');
var author_book_grpc = require('../protos/author_book_grpc_pb');
var grpc = require('@grpc/grpc-js');

function findBookByBookName(call, callback) {
  console.log(call.request.getName());

  var book = new author_book.Book();
  var bookName = new author_book.BookName();
  var author = new author_book.Author();

  // hard coded values just for testing
  // set book name
  bookName.setName("Madol Duwa");
  // set author's details
  author.setFirstname("Martine");
  author.setLastname("Wicramasinghe");

  // set book's details
  book.setAuthor(author);
  book.setName(bookName);
  book.setDescription("Describes life events of young boy called Upali Ginivella");
  book.setGenre(2);
  callback(null, book);
} 

function main() {
  var server = new grpc.Server();
  server.addService(author_book_grpc.FindBooksService, { findBookByBookName: findBookByBookName});
  server.bindAsync('localhost:8081', grpc.ServerCredentials.createInsecure(), function(error, port) {
    if(error) {
      console.error('Error occured when binding the server : '+error);
      return;
    }
    server.start();
    console.info('Server is up and running at port : '+port);
  });
}

main();