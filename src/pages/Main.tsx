import React from 'react';
import Header from '../components/header/Header';
import Content from '../components/content/Content';
import Pagination from '../components/pagination/Pagination';
import PaginationContainer from '../components/pagination/p';
import container from '../styles/container.module.scss';

function Main() {
  return (
    <div className={container.container}>
      <Header />
      <Content />
      <PaginationContainer />
    </div>
  );
}

export default Main;
