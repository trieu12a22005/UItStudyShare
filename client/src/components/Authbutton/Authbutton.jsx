import React from 'react';
import { createStyles } from 'antd-style';
import { Link } from 'react-router-dom';

const useStyle = createStyles(({ css }) => ({
  authWrapper: css`
    display: flex;
    gap: 1rem;
  `,
  gradientButton: css`
    position: relative;
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    border: none;
    border-radius: 8px;
    background: linear-gradient(135deg, #6253e1, #04befe);
    cursor: pointer;
    overflow: hidden;
    z-index: 1;
    transition: all 0.3s ease;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: #ffffff10;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: -1;
    }

    &:hover::before {
      opacity: 1;
    }

    &:hover {
      opacity: 0.9;
    }
  `,
}));

function AuthButtons() {
  const { styles } = useStyle();

  return (
    <div className={styles.authWrapper}>
      <button className={styles.gradientButton}>
        <Link to="/login">Login</Link>
      </button>
      <button className={styles.gradientButton}>
        <Link to="/register">Sign up</Link>
      </button>
    </div>
  );
}

export default AuthButtons;
