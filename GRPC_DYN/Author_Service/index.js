var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var path = require('path');

var PROTO_PATH = path.join(__dirname, 'protos', 'author_books.proto');

var authorBooksPackageDefinition = protoLoader.loadSync(PROTO_PATH);
var authorBooksProtoDescriptor = grpc.loadPackageDefinition(authorBooksPackageDefinition);
var authorBooksNamespace = authorBooksProtoDescriptor.author_books;

// Unary API
function requestBookByBookName(call, callback) {
    console.log(call.request);
    callback(null, {
        author: {
            author_name: "Martine Wickramasinghe",
        },
        book_name: "Madol Duva",
        book_description: "Describe the life of Upali Giniwelle",
        book_price: 1054,
    });
}

function main() {
    const server = new grpc.Server();
    server.addService(authorBooksNamespace.FindBooks.service, {
        requestBookByBookName: requestBookByBookName,
    })
    server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), function(error, port){
        if(error) {
            console.error('Server Binding Error : '+error);
            return;
        }
        console.info('Server is running at port : ',+port);
        //console.log(authorBooksNamespace);
        server.start();
    });
}

main();