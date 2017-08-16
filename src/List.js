import React from 'react'

import styles from './List.css'

const List = props => (

    <div className={styles.list}>

        <ul>
            {props.achievements.map(item => {

                const hasAchieved = props.arrOfWinningUrls.includes(item.url)

                return (
                    <li key={item.title} className={`${hasAchieved ? styles.success : ''} ${styles.item}`}>
                        <span className={styles.points}>
                            {item.points}
                        </span>
                        <div className={styles.itemInner}>
                            <span className={styles.clue}>
                                {item.title}
                            </span>
                            {hasAchieved &&
                                <div className={styles.url}>{item.url}</div>
                            }
                        </div>
                    </li>
                )
            })}
        </ul>

    </div>

)

export default List
