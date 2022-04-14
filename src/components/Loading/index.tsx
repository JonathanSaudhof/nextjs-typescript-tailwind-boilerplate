import styles from "./styles.module.css";

export function Loading() {
  return (
    <div className='absolute top-0 flex flex-col gap-6 h-full w-full justify-center items-center'>
      <div className='italic'>Loading ...</div>
      <div className={styles.sword}>
        <div className={styles.griff}>
          <div className={styles.griffFront}></div>
          <div className={styles.griffDot}></div>
          <div className={styles.griffLast}></div>
        </div>
        <div className={styles.klinge}></div>
      </div>
    </div>
  );
}
