import { HomePropsType, PizzaType } from '../pages';
import styles from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';

const PizzaList = ({ pizzaList }: HomePropsType) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus
        soluta deleniti delectus laboriosam neque est nesciunt saepe harum
        officia illo, repellendus rerum possimus earum, quis distinctio cumque
        ducimus, minima pariatur.
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza: PizzaType) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
