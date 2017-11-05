import React from "react";
import styles from "./page.scss";

const render = () => {
  return (<div className={styles.root}>
    Hello world.
  </div>);
}

export default props => render({props});
