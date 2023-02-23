import {termsText} from './terms.js';

const ConditionsLinks =[
    {
        title: 'help',
        info: ['VRNL is an online video journal that allows you to upload video messages to yourself or other subscribers.',
                'You can create collections to view, organize, and group different video messages. Collections can be comprised of videos uploaded solely by you, or of videos uploaded by all the subscribers to a collection.',
                'This is the beta version of VRNL, many features like data encryption and the ability to subscribe to other users have not been added yet.'
            ],
    },
     {
        title: 'privacy',
        info: ['Data encryption is currently not implemented for the beta version of VRNL. All uploaded videos are under no protection, this version of VRNL serves as a proof of concept.'],

    },
     {
        title: 'terms',
        info: termsText.split('\n'),

    },
];

export default ConditionsLinks;



