import { Module } from '@nestjs/common'
import { BookController } from 'src/controller/book.controller'
import { UserController } from 'src/controller/user.controller'
import { BookService } from 'src/service/book.service'
import  { UserService } from 'src/service/user.service'

@Module({
    controllers: [UserController, BookController],
    providers: [BookService, UserService]
})
export class AppModule {}