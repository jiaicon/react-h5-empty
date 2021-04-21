/**
 * Created by icon on 2021/4/21
 */
import React, { useEffect } from 'react';
import styles from './styles.css';

const Launch = () => {
  useEffect(() => {
    console.log('launch');
  }, []);
  return (
    <div className={styles.launch}>
      dasdasd
    </div>
  );
};

export default Launch;

