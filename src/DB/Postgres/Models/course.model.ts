import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity()
export default class Course extends BaseEntity {
    @PrimaryColumn()
    desiredCourse: string
    @Column()
    userId: string
    @Column({ nullable: true })
    requiredCourse: string
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}

