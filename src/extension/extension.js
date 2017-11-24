/* globals chrome, document, window, CustomEvent */
const doc = document
const host = window.location.href

// that's cheating!! ಥ_ಥ
const urls = [
    {
        title: 'The Front Page of the Internet',
        url: 'reddit.com',
        points: 80
    },
    {
        title: 'Pie is Good',
        url: 'pie.gd',
        points: 150
    },
    {
        title: 'It never hits the corner',
        url: 'itneverhitsthecorner.com',
        points: 200
    },
    {
        title: 'Pink trombone throat',
        url: 'dood.al/pinktrombone',
        points: 200
    },
    {
        title: '8 bit Rainbow Dogs!',
        url: 'omfgdogs.com',
        points: 50
    },
    {
        title: "Hempy's Coolest Tree on the Block",
        url: 'tree.cool',
        points: 100
    },
    {
        title: 'Rainbow Pooping Poptart Cat',
        url: 'nyan.cat',
        points: 100
    },
    {
        title: 'The Jerk Store Called',
        url: 'thejerkstore.com',
        points: 50
    },
    {
        title: 'The Saddest Sound',
        url: 'sadtrombone.com/',
        points: 100
    },
    {
        title: 'Welcome to ZomboCom',
        url: 'zombo.com',
        points: 100
    },
    {
        title: 'Encountered the Epilepsy Worm',
        url: 'staggeringbeauty.com',
        points: 100
    },
    {
        title: 'Eel Slap',
        url: 'eelslap.com',
        points: 20
    },
    {
        title: 'RRRGGGBBB',
        url: 'rrrgggbbb.com',
        points: 10
    },
    {
        title: 'Ducks Are The Best',
        url: 'ducksarethebest.com',
        points: 30
    },
    {
        title: 'EVERYONE GETS BEES!!!',
        url: 'beesbeesbees.com',
        points: 30
    },
    {
        title: '25/12',
        url: 'isitchristmas.com',
        points: 20
    },
    {
        title: 'HTLHCDTWY?',
        url: 'hasthelargehadroncolliderdestroyedtheworldyet.com',
        points: 20
    },
    {
        title: "Don't go Chasing Capistrano Waterfalls",
        url: 'salmonofcapistrano.com',
        points: 30
    },
    {
        title: 'My Computer Is On',
        url: 'ismycomputeron.com',
        points: 20
    },
    {
        title: 'Please Like',
        url: 'pleaselike.com',
        points: 30
    },
    {
        title: 'OMFG Corgies',
        url: 'corgiorgy.com',
        points: 10
    },
    {
        title: 'Pointer',
        url: 'pointerpointer.com',
        points: 30
    },
    {
        title: 'QWOP',
        url: 'foddy.net/Athletics.html',
        points: 30
    },
    {
        title: 'Four Legged QWOP',
        url: 'foddy.net/CLOP.html',
        points: 30
    },
    {
        title: 'Lions on a Pink Background',
        url: 'lionswithpinkbg.com',
        points: 80
    },
    {
        title: 'Pizza Forever',
        url: 'perpetual.pizza',
        points: 40
    },
    {
        title: 'Slow. Empty.',
        url: 'slowempty.com',
        points: 80
    },
    {
        title: 'Veryman',
        url: 'veryman.expert',
        points: 50
    },
    {
        title: "The Dead Pirates. Drop The Motherfuckin' Needle",
        url: 'overthetinyhills.com',
        points: 60
    },
    {
        title: 'The End of the Internet',
        url: 'hmpg.net',
        points: 100
    },
    {
        title: 'Butts 4 Lyf',
        url: 'butts.life',
        points: 30
    },
    {
        title: 'Camerons World',
        url: 'cameronsworld.net',
        points: 20
    },
    {
        title: 'Title Scream Pixel Artwork',
        url: 'titlescream.com',
        points: 40
    },
    {
        title: '8 bit Pixelblob Dancing Thing. I don\t Even.',
        url: 'matmartinez.net/nsfw',
        points: 120
    },
    {
        title: 'How Many People Are In Space Right Now?',
        url: 'howmanypeopleareinspacerightnow.com',
        points: 60
    },
    {
        title: 'Nyanify Anything',
        url: 'nyanit.com',
        points: 20
    },
    {
        title: 'Does Your Girlfriend Like to Collect Gems?',
        url: 'isyourgirlfriendahorse.com',
        points: 100
    },
    {
        title: '"Why Did I Buy This Domain?"',
        url: 'Poop.bike',
        points: 40
    },
    {
        title: 'Found the Cow',
        url: 'findtheinvisiblecow.com',
        points: 50
    },
    {
        title: 'A Way To Go',
        url: 'a-way-to-go.com',
        points: 80
    },
    {
        title: 'Now Kithhhh',
        url: 'nowkith.com',
        points: 40
    },
    {
        title: 'Jazz Computering',
        url: 'jazz.computer',
        points: 40
    },
    {
        title: 'Corn Dog Party',
        url: 'pinkandgold.party',
        points: 60
    },
    {
        title: 'The Nicest Place on the Internet',
        url: 'thenicestplaceontheinter.net',
        points: 20
    },
    {
        title: 'GIF Dance Party',
        url: 'gifdanceparty.giphy.com',
        points: 60
    },
    {
        title: 'Vomit Your Own Face',
        url: 'kamra.invisi-dir.com',
        points: 200
    },
    {
        title: 'You Can Trust Me, I am LING!',
        url: 'lingscars.com',
        points: 100
    },
    {
        title: 'Pickle Cat in Space',
        url: 'dn.ht/picklecat',
        points: 100
    },
    {
        title: 'First World Wide Website',
        url: 'info.cern.ch/hypertext/WWW/TheProject.html',
        points: 400
    },
    {
        title: "Website With the Sound of It's Own Making",
        url: 'emmaraeworks.com/wwtsoiom',
        points: 80
    },
    {
        title: 'Internet Archaeology Heaven',
        url: 'heaven.internetarchaeology.org/heaven.html',
        points: 60
    },
    {
        title: 'Ha GHEEEEYY',
        url: 'youtube.com/watch?v=YaG5SAw1n0c',
        points: 60
    },
    {
        title: 'That\s the Finger',
        url: 'thatsthefinger.com',
        points: 50
    }
]

const createNotification = host => {

    // generate elements
    const wrapperAnchor = doc.createElement('a')
    const titleDiv = doc.createElement('div')
    const contentDiv = doc.createElement('div')
    const pointsDiv = doc.createElement('div')
    const iconDiv = doc.createElement('div');

    // create the icon http://www.flaticon.com/free-icon/achievement_142733
    const svgString = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 485 485" xml:space="preserve"><path d="M257.5 217.1V0H104.5v131.3H227.5v85.8L0 462.9V485h485v-22.1L257.5 217.1zM314.9 323.3l-24.9 18 -47.5-34.2 -47.5 34.2 -24.9-18 72.4-78.2L314.9 323.3zM134.5 101.3V30h93v71.3H134.5zM48.2 455l101.3-109.5 45.5 32.8 47.5-34.2 47.5 34.2 45.5-32.8L436.8 455H48.2z"/></svg>'
    iconDiv.innerHTML = svgString

    // give them classes
    wrapperAnchor.classList.add('achievos')
    iconDiv.classList.add('achievos-icon')
    titleDiv.classList.add('achievos-title')
    pointsDiv.classList.add('achievos-points')

    // give them content
    wrapperAnchor.setAttribute('href', 'http://www.achievos.xyz')
    wrapperAnchor.setAttribute('target', '_blank')
    let titleContent = doc.createTextNode(host.title)
    let pointsContent = doc.createTextNode(host.points + ' points')

    // add each element to the main wrapper
    titleDiv.appendChild(titleContent)
    pointsDiv.appendChild(pointsContent)
    contentDiv.appendChild(titleDiv)
    contentDiv.appendChild(pointsDiv)
    wrapperAnchor.appendChild(iconDiv)
    wrapperAnchor.appendChild(contentDiv)

    // create the css
    let css = doc.createElement('style')
    css.type = "text/css"
    css.innerHTML = `
    .achievos {
        display: flex;
        position: fixed;
        top: 20px;
        left: 20px;
        color: #3f3f3f;
        user-select: none;
        background-color: rgba(255, 255, 255, 0.95);
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        line-height: 1;
        padding: 20px;
        max-width: 320px;
        border-radius: 2px;
        font-size: 18px;
        z-index: 1999999999;
        opacity: 0;
        transform: translateY(-100%);
        text-align: left;
        pointer-events: none;
        transition: transform 360ms cubic-bezier(0.45, 0.05, 0.14, 1.2), box-shadow 300ms cubic-bezier(.25,.8,.25,1), color 150ms, background-color 150ms, opacity 500ms;
        will-change: opacity, box-shadow, transform, color, background-color;
    }
    .achievos:hover {
        background-color: #fff;
        color: #de6262;
        text-decoration: none;
        box-shadow: 0 10px 20px rgba(0,0,0,0.14), 0 6px 6px rgba(0,0,0,0.20);
    }
    .achievos:hover svg {
        fill: #de6262;
    }
    .achievos-icon {
        padding: 0 20px 0 0;
        flex-shrink: 0;
    }
    .achievos-icon svg {
        transition: fill 150ms;
        width: 40px;
    }
    .achievos-title {
        font-weight: bold;
        padding-bottom: 5px;
        margin: 0;
        text-decoration: none;
        color: #333;
        display: inline-block;
    }
    .achievos--visible {
        opacity: 1;
        transform: none;
        pointer-events: auto;
    }
    `;

    doc.getElementsByTagName('head')[0].appendChild(css)
    doc.body.appendChild(wrapperAnchor)

    window.setTimeout(() => {
        wrapperAnchor.classList.add('achievos--visible')
    }, 500)

    window.setTimeout(() => {
        wrapperAnchor.classList.remove('achievos--visible')
    }, 4000)

}

// store existing achievos in here on extension load
let achievementArr = []

const get = cb => {
    chrome.storage.sync.get('achievements', chromeStorage => {
        const loginEvent = new CustomEvent('loginEvent', {
            detail: chromeStorage.achievements ? chromeStorage.achievements : []
        })
        // set the extension variable to be the achievements
        achievementArr = chromeStorage.achievements || []
        doc.dispatchEvent(loginEvent)
        cb()
    })
}

const set = newAchievement => {
    chrome.storage.sync.set({
        // add new achievement to existing collection
        achievements: [
            ...achievementArr,
            newAchievement
        ]
    }, () => {
        //console.log('Achievement saved')
    })
}


// first thing we need to do is get any existing achievos for the user on each page load
get(()=>{

    // get achievements right away so that we can show the notification if successfulMatch
    const successfulMatch = urls.filter(url => {
        // does the url from the query string match a string in the urls arr
        return host.toLowerCase().indexOf(url.url.toLowerCase()) >= 0
    })

    if (successfulMatch.length) {

        // check whether the user already has this achievo
        // we dont want to show it everytime they hit that site
        var found = false;
        for (let i = 0; i < achievementArr.length; i++) {
            if (achievementArr[i].url === successfulMatch[0].url) {
                found = true
                break
            }
        }
        if (!found) {
            // if it doesn't exists, pop open the notification!
            doc.body.onload = createNotification(successfulMatch[0])
            // and then set the event to chromestorage
            set(successfulMatch[0])
        }

    }
})

doc.addEventListener('triggerDemo', () => {
    const demo = {
        title: `Here's what a notification will look like`,
        url: 'achievos.xyz',
        points: 80
    }
    doc.body.onload = createNotification(demo)
})

doc.addEventListener('getAchievos', () => {
    get()
})

doc.addEventListener('clearChromeStorage',() => {
    chrome.storage.sync.clear(() => {
        const logoutSuccess = new CustomEvent('logoutSuccess')
        doc.dispatchEvent(logoutSuccess)
    })
})

const extensionCheckEvent = new CustomEvent('extensionCheckEvent', {
    detail: true
})
doc.dispatchEvent(extensionCheckEvent)
