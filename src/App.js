/* globals window, chrome, CustomEvent, document */
import { h, Component } from 'preact';
/** @jsx h */

import Intro from './Intro'
import List from './List'

import logo from './images/logo.svg'

import './Base.css'
import './styles/normalize.mod.css'

import styles from './App.css'

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

class App extends Component {

    constructor() {
        super()

        this.doc = document

        this.state = {
            isExtensionInstalled: false,
            isChromeDesktop: false,

            receivedAchievos: [],

            achievements: urls,
            error: '',
        }
    }

    componentDidMount = () => {

        this.checkBrowser()

        // this is async as it waits for a response from the extension so needs a callback
        // we won't hear anything if its not installed, so must assume its not installed by default
        this.checkExtension(isExtensionInstalled => {
            this.setState({
                isExtensionInstalled
            })

            if (isExtensionInstalled) {
                this.doc.addEventListener('loginEvent', e => {
                    this.setState({
                        receivedAchievos: e.detail
                    })
                })
            }
        })

    }

    checkBrowser = () => {
        // http://stackoverflow.com/a/13348618
        const isChromium = window.chrome
        const winNav = window.navigator
        const vendorName = winNav.vendor
        const isOpera = winNav.userAgent.indexOf('OPR') > -1
        const isIEedge = winNav.userAgent.indexOf('Edge') > -1
        const isIOSChrome = winNav.userAgent.match('CriOS')

        const isChromeDesktop = (!isIOSChrome && isChromium !== null && isChromium !== undefined && vendorName === 'Google Inc.' && isOpera === false && isIEedge === false)

        this.setState({
            isChromeDesktop
        })
    }

    checkExtension = cb => {
        this.doc.addEventListener('extensionCheckEvent', e => {
            cb(e.detail)
        })
    }

    triggerDemo = () => {
        const event = new CustomEvent('triggerDemo')
        this.doc.dispatchEvent(event)
    }

    addToChrome = () => {
        chrome.webstore.install('', () => {
            this.setState({
                isExtensionInstalled: true,
            })
        }), err => {
            this.setState({
                isExtensionInstalled: false,
                error: err
            })
        }
    }

    calculatePoints = () => {
        let totalPoints = 0
        let arrOfWinningUrls = []

        this.state.receivedAchievos.forEach(winner => {
            arrOfWinningUrls.push(winner.url)
            totalPoints = totalPoints + winner.points
        })

        return {
            totalPoints,
            arrOfWinningUrls
        }
    }

    render() {

        const {totalPoints, arrOfWinningUrls} = this.calculatePoints()

        return (
            <main className={styles.main}>
                <div className={styles.plaque}>
                    <div className={styles.plaqueInner}>
                        <img className={styles.logo} src={logo} alt="" />
                        <h1 className={styles.title} >Achievos</h1>
                        <p className={styles.byline}>Get achievements for discovering websites.</p>
                    </div>
                </div>

                <div className={styles.content}>

                    {this.state.isChromeDesktop ? (
                        <Intro
                            isExtensionInstalled={this.state.isExtensionInstalled}
                            addToChrome={this.addToChrome}
                            triggerDemo={this.triggerDemo}
                        />
                    ) : (
                        <section className={styles.intro}>
                            <p>Visit this site in Chrome desktop to get the extension.</p>
                        </section>
                    )}

                    <p>Total pointssss 🐍 &nbsp; {totalPoints}.</p>

                    {this.state.error &&
                        <p>Something's the bother: {this.state.error}</p>
                    }

                    <List
                        achievements={this.state.achievements}
                        arrOfWinningUrls={arrOfWinningUrls}
                    />
                </div>

            </main>
        )
    }
}

export default App
