import { 
    Column, 
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity({ name:'users' })
export class UserEntity{
    @PrimaryGeneratedColumn({ type:"bigint" })
    id:number;

    @Column({ unique:true, type:"varchar",length:150 })
    email:string;

    @Column({ type:"varchar",length:120 })
    name:string;

    @Column({ type:"varchar",length:120 })
    password:string;

    @Column({ type:"text",nullable:true })
    verification_token:string;

    @Column({ type:"boolean" , default: false})
    is_verified: boolean;

    @Column({ type:"boolean",default:false })
    is_deleted: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date; 

}