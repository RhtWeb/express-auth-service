import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamp" })
    expiresAt: Date;

    // user can have multiple token via different devices like phone, laptop etc
    @ManyToOne(() => User)
    user: User;

    @UpdateDateColumn()
    updatedAt: number;

    @CreateDateColumn()
    createdAt: number;
}

// id of refresh token data is stored in RefreshToken JWT
// So that we can easily check wheter the id exit or not
// if not then the request fails
// if jwt is tempered than verification will also fail

// if user logouts the refresh token data is deleted

// presisteng refresh token in DB to help in revocation of the refresh token if compromised

// token rotation will also be done
// hence while changing the access token with the help of refresh token
// the refresh token is also chnged we if its validity was 1Y
