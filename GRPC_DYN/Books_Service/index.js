var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var path = require('path');

var PROTO_PATH = path.join(__dirname, 'protos', 'author_books.proto');

var authorBooksPackageDefinition = protoLoader.loadSync(PROTO_PATH);
var authorBooksProtoDescriptor = grpc.loadPackageDefinition(authorBooksPackageDefinition);
var authorBooksNamespace = authorBooksProtoDescriptor.author_books;

// Unary API
var BooksServiceClient = new authorBooksNamespace.FindBooks('localhost:50051', grpc.credentials.createInsecure());

function callRequestBookByBookName() {
setInterval(function () {
    BooksServiceClient.requestBookByBookName("Madol Duwa", function(error, response) {
        if(error) {
            console.error('Error occur when invoking RPC : '+error);
            return;
        }
        console.info(JSON.stringify(response));
    });
}, 1000);
}

function main() {
    callRequestBookByBookName();
}

main();