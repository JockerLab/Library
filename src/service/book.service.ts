import { Injectable } from "@nestjs/common";
import { AddBookDto } from "src/dto/add-book.dto";
import { Book } from "src/entity/Book";
import { AppDataSource } from "src/main";
import { Repository } from "typeorm";
import { UserService } from "./user.service";

@Injectable()
export class BookService {
    private userService = new UserService();
    private bookRepository = AppDataSource.getRepository(Book);

    async add(book: AddBookDto) {
        return await this.bookRepository.save(book);
    }

    async takeBook(bookId: number, userId: number) {
        let numberUserBooks = await this.bookRepository
            .createQueryBuilder("book")
            .where("book.user = :userId", { userId: userId })
            .getCount();
        let book = await this.bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.user', 'user')
            .where('book.id = :bookId', { bookId })
            .getOne();
        if (book.user !== null) {
            return `Book ${bookId} is not free.`;
        }
        if (numberUserBooks === 5) {
            return `User ${userId} cannot take book ${bookId}, maximum 5 books.`;
        }
        if (!(await this.userService.hasSubscription(userId))) {
            return `User ${userId} has no subscription.`;
        }
        book.user = userId;
        await this.bookRepository.save(book);
        return `User ${userId} successfully took a book ${book.id}.`
    }

    async returnBook(id: number) {
        let book = await this.bookRepository.findOneBy({
            id: id
        });
        book.user = null;
        await this.bookRepository.save(book);
        return `Book ${id} was successfully returned.`
    }

}