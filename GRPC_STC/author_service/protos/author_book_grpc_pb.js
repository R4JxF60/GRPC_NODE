// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var author_book_pb = require('./author_book_pb.js');

function serialize_AuthorsBooks_Book(arg) {
  if (!(arg instanceof author_book_pb.Book)) {
    throw new Error('Expected argument of type AuthorsBooks.Book');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AuthorsBooks_Book(buffer_arg) {
  return author_book_pb.Book.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AuthorsBooks_BookName(arg) {
  if (!(arg instanceof author_book_pb.BookName)) {
    throw new Error('Expected argument of type AuthorsBooks.BookName');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AuthorsBooks_BookName(buffer_arg) {
  return author_book_pb.BookName.deserializeBinary(new Uint8Array(buffer_arg));
}


var FindBooksService = exports.FindBooksService = {
  findBookByBookName: {
    path: '/AuthorsBooks.FindBooks/findBookByBookName',
    requestStream: false,
    responseStream: false,
    requestType: author_book_pb.BookName,
    responseType: author_book_pb.Book,
    requestSerialize: serialize_AuthorsBooks_BookName,
    requestDeserialize: deserialize_AuthorsBooks_BookName,
    responseSerialize: serialize_AuthorsBooks_Book,
    responseDeserialize: deserialize_AuthorsBooks_Book,
  },
};

exports.FindBooksClient = grpc.makeGenericClientConstructor(FindBooksService);
