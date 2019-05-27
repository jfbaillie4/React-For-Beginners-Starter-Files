import ReactGA from 'react-ga';

const initGA = () => {
    //console.log('GA init');
    ReactGA.initialize('UA-140852847-1');
};

const logPageView = (pagename) => {
    var page
    if (pagename) {
        page = pagename;
     } else {
        page = window.location.pathname + window.location.search;
     };
    //console.log(page)
    ReactGA.pageview(page)
}

const logEvent = (EventObject) => {
    ReactGA.event(EventObject);
    //console.log(EventObject);
}

export { initGA };

export { logPageView };

export { logEvent };