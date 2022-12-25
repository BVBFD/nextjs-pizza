import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import Featured from '../components/Featured';
import PizzaList from '../components/PizzaList';
import styles from '../styles/Home.module.css';

export type HomePropsType = {
  pizzaList: [PizzaType];
};

export interface PizzaType {
  _id: string;
  map?: any;
  title: string;
  desc: string;
  img: string;
  prices: Array<number>;
  extraOptions: Array<OptionType>;
  createdAt: any;
  updatedAt: any;
}

export type OptionType = {
  _id: string;
  text: string;
  price: number;
};

export default function Home({ pizzaList }: HomePropsType) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name='description' content='Best pizza shop in town' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Featured />
      <PizzaList pizzaList={pizzaList} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get('http://localhost:3000/api/products');
  return {
    props: {
      pizzaList: res.data,
    },
  };
};
