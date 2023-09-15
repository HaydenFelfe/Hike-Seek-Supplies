import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './quantityButton.module.css';

const QuantityButton = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <div className={styles['quantity-controls']}>
      <Button
        variant="light"
        className={styles['quantity-button']}
        onClick={onDecrease}
        disabled={quantity <= 1}
      >
        <FontAwesomeIcon icon={faMinus} />
      </Button>
      <span className={styles['quantity-num']}>{quantity}</span>
      <Button
        variant="light"
        className={styles['quantity-button']}
        onClick={onIncrease}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  );
};

export default QuantityButton;
