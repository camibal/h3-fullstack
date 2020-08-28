import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';
import { MinLength, IsNotEmpty, IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['id'])
export class Register {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tid: string;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    name: string;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    email: string;

    // @Column()
    // @IsNotEmpty()
    // password: string;

    // hashPassword(): void {
    //     const salt = bcrypt.genSaltSync(10);
    //     this.password = bcrypt.hashSync(this.password, salt);
    // }

    // checkPassword(password: string): boolean {
    //     return bcrypt.compareSync(password, this.password);
    // }
}
