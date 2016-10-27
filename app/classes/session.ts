import { Speaker }  from '../classes/speaker';

export class Session {

    public $key: number;
    public allDay: boolean;
    public description: any;
    public endTime: Date;
    public hasDetails: boolean;
    public location: any;
    public onMySchedule: boolean;
    public slug: string;
    public managers: Speaker[];
    public speakers: Speaker[];
    public startTime: Date;
    public tags: any[];
    public title: any;
    public canAsk: boolean;

    constructor(){}

}

