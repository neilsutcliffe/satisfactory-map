import React from 'react'
import styles from './CloseButton.module.scss'

export default ({ toggleDrawer }) => <a className={styles.close} onClick={toggleDrawer} href="#close">×</a>