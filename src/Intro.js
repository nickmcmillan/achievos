import { h } from 'preact';
/** @jsx h */
import styles from './App.css'

const Intro = props => (
    <div>
        {!props.isExtensionInstalled ? (
            <section className={styles.intro}>
                <button
                    onClick={props.addToChrome}
                    className={styles.button}
                >
                    Add to Chrome
                </button>
            </section>
        ) : (
            <section className={styles.intro}>
                <p>
                    You're all set. As you discover stuff you'll <button className={styles.buttonInline} onClick={props.triggerDemo}>get notifications</button> and the list of clues below will show your progress.
                </p>
            </section>
            )
        }
    </div>
)

export default Intro
