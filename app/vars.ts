import { Question } from './classes/question';

let _settings = {
    layout: {
        pageSidebarClosed: false, 
        pageContentWhite: true,
        pageBodySolid: false, 
        pageAutoScrollOnLoad: 1000 
    },
    assetsPath: 'app/assets',
    globalPath: 'app/assets/global',
    layoutPath: 'app/assets/layouts/layout'
}


let _questions: Question[] = []

export const VARS = {
	SETTINGS: _settings,
	QUESTIONS: _questions
}