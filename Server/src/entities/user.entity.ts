import { Booking } from 'src/entities/booking.entity';
import { FieldReview } from 'src/entities/field-review.entity';
import { Field } from 'src/entities/field.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum UserRole {
    USER = 'user',
    OWNER = 'owner',
    ADMIN = 'admin',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    phone: string;

    @Column({
        default:
            'https://res.cloudinary.com/dteeo7nn2/image/upload/z0bgfar7toh7t5knqpnm.png',
    })
    avatar: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Column({ default: 100 })
    reputation: number;

    @Column({ default: null })
    refresh_token: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @OneToMany(() => Field, (field) => field.owner)
    fields: Field[];

    @OneToMany(() => Booking, (booking) => booking.user)
    bookings: Booking[];

    @OneToMany(() => FieldReview, (review) => review.user)
    reviews: FieldReview[];
}
