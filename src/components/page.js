import React from "react";
import styles from "./page.scss";

const render = () => {
  return (<div className={styles.root}>
    Finally! It's working!?
  </div>);
};

export default props => render({props});
