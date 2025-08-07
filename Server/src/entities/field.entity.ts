import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Sport } from './sport.entity';
import { FieldSlot } from 'src/entities/field-slot.entity';
import { FieldReview } from 'src/entities/field-review.entity';

@Entity('fields')
export class Field {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, (user) => user.fields, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @ManyToOne(() => Sport, (sport) => sport.fields, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sport_id' })
    sport: Sport;

    @Column({ nullable: true })
    location: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column()
    price_per_hour: number;

    @Column({ default: 0 })
    discount_percent: number;

    @Column({ default: false })
    approved: boolean;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(() => FieldSlot, (slot) => slot.field)
    slots: FieldSlot[];

    @OneToMany(() => FieldReview, (review) => review.field)
    reviews: FieldReview[];
}
