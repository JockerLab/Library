import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User"

@Entity({ name: "Books" })
export class Book {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100
    })
    name: string

    @Column({
        length: 128
    })
    author: string

    @Column("text")
    text: string

    @ManyToOne(() => User, (user) => user.books)
    @JoinColumn({ name: 'userId' })
    user?: number
    
}
