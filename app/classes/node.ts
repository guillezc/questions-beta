import { Material }  from '../classes/material';

export class Node {

    public $key: number;
    public id: number;
    public name: string;
    public nameSpanish: string;
    public nameEnglish: string;
    public total: number;
    public children: any;
    public material: Material[];

    constructor(){}

}