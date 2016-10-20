import { Material }  from '../classes/material';

export class Node {

    public $key: number;
    public id: number;
    public name: string;
    public nameSpanish: string;
    public nameEnglish: string;
    public total: number;
    public children: Node[];
    public material: Material[];

    constructor(){}

}