import { Controller, Get, Post, Param, Delete, Body } from "@nestjs/common";
import { AddBookDto } from "src/dto/add-book.dto";
import { BookService } from "src/service/book.service";

@Controller('books')
export class BookController {
    constructor(private bookService: BookService) {}

    @Post()
    async addBook(@Body() addBookDto: AddBookDto) {
        return await this.bookService.add(addBookDto);
    }

    @Get(':bookId/user/:userId')
    async takeBook(@Param('bookId') bookId: number, @Param('userId') userId: number) {
        return await this.bookService.takeBook(bookId, userId);
    }

    @Delete(':id')
    async returnBook(@Param('id') id: number) {
        return await this.bookService.returnBook(id);
    }

}