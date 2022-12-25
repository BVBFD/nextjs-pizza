import styles from '../../styles/Product.module.css';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { OptionType, PizzaType } from '../index';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';

type ProductPropsType = {
  pizza: PizzaType;
};

const Product = ({ pizza }: ProductPropsType) => {
  const [price, setPrice] = useState<number>(pizza.prices[0]);
  const [size, setSize] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [extras, setExtras] = useState<Array<OptionType>>([]);
  const dispatch = useDispatch();

  const changePrice = (number: number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex: number) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    option: OptionType
  ) => {
    const checked = e.target.checked;
    console.log(checked);

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, extras, price, quantity }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit='contain' layout='fill' alt='' />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src='/img/size.png' layout='fill' alt='' />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src='/img/size.png' layout='fill' alt='' />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src='/img/size.png' layout='fill' alt='' />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type='checkbox'
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor='double'>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            type='number'
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  query,
}: {
  query: { id: string };
}) => {
  const res = await axios.get(`http://localhost:3000/api/products/${query.id}`);
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;