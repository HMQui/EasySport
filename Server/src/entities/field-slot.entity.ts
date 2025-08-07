import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Field } from './field.entity';
import { Booking } from 'src/entities/booking.entity';

@Entity('field_slots')
export class FieldSlot {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Field, (field) => field.slots, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'field_id' })
    field: Field;

    @Column({ type: 'date' })
    date: string;

    @Column({ type: 'time' })
    start_time: string;

    @Column({ type: 'time' })
    end_time: string;

    @Column({ default: false })
    is_booked: boolean;

    @Column({ default: false })
    cancelled: boolean;

    @OneToMany(() => Booking, (booking) => booking.field_slot)
    bookings: Booking[];
}
