import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Book } from "./Book"

@Entity({ name: "Users" })
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 64
    })
    firstName: string

    @Column({
        length: 64
    })
    lastName: string

    @Column()
    age: number

    @Column()
    hasSubscription: boolean

    @OneToMany(() => Book, (book) => book.user)
    books: Book[]

}
