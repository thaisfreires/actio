import { MovementType } from "./enums/MovementType.enum";

export interface Movement {
    id_movement: string;
    id_account: string;
    value: number;
    movement_type: MovementType;
    date: Date;
}
