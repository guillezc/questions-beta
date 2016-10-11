import { Session }  from '../classes/session';
import { Vote }  from '../classes/vote';

export class Survey {

    public $key: number;
    public sessionId: string;
    public type: string;
    public session: Session[];
    public question: any;
    public options: Vote[];
    public chartLabels: string[];
    public chartValues: number[];

    constructor(){}

}