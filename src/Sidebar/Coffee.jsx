import React from 'react'
import styles from './Coffee.module.scss'

import './Coffee.css'

export default () => (
    <>
        <div className={styles.promo}>
            Made with <span role='img' aria-label='heart'>❤</span>️ by <a href="https://neilsutcliffe.com">Neil</a>
        </div>
        <div className="bmc-container">
            <link href="https://fonts.googleapis.com/css?family=Cookie" rel="stylesheet" />
            <a className="bmc-button" target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/kSXgEU9">
                <img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee" />
                <span>Buy me a coffee</span>
            </a>
        </div>
    </>
)
