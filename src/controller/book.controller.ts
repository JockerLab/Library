import { Controller, Get, Post, Param, Delete, Body } from "@nestjs/common";
import { AddBookDto } from "src/dto/add-book.dto";
import { BookService } from "src/service/book.service";

@Controller('books')
export class BookController {
    constructor(private bookService: BookService) {}

    /**
     * Adds book with fields described in class AddBookDto.
     * @param book - The book information.
    */
    @Post()
    async addBook(@Body() addBookDto: AddBookDto) {
        return await this.bookService.add(addBookDto);
    }

    /**
     * Takes book for user.
     * @param bookId - The id of book.
     * @param userId - The id of user.
    */
    @Get(':bookId/user/:userId')
    async takeBook(@Param('bookId') bookId: number, @Param('userId') userId: number) {
        return await this.bookService.takeBook(bookId, userId);
    }

    /**
     * Returns book.
     * @param id - The id of book.
    */
    @Delete(':id')
    async returnBook(@Param('id') id: number) {
        return await this.bookService.returnBook(id);
    }

}