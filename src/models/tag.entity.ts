import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tags' })
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
