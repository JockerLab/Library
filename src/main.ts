import "reflect-metadata"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Book } from "./entity/Book"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User, Book],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize().then(async () => {}).catch(error => console.log(error))

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
