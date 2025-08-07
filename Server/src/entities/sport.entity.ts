import { Field } from 'src/entities/field.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('sports')
export class Sport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => Field, (field) => field.sport)
    fields: Field[];
}
