import styles from './loading.module.css';

export function Loading() {
  return (
    <div>
      <div className={styles.loading}></div>
      <div className={styles.loadingText}>Loading...</div>
    </div>
  );
}
