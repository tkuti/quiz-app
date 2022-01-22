import htmr from 'htmr';

const HTMLComponent = ({string}) => {
    return htmr(`<p>${string}</p>`);
};

export default HTMLComponent;
