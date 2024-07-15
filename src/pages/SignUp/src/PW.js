import React from 'react';

const Password = () => {
  return (
    <div>
      <div style={styles.group6}>
        <div style={styles.rectangle2}></div>
        <div style={styles.lockIcon}></div>
        <div style={styles.vector}></div>
        <div style={styles.pw}>P/W</div>
        <div style={styles.passwordHint}>8~20자 영문, 숫자, 특수문자로 구성된 비밀번호를 입력하세요</div>
      </div>
    </div>
  );
};

const styles = {
  group6: {
    // position: 'absolute',
    width: '457px',
    height: '56px',
    left: '368px',
    top: '523px',
  },
  rectangle2: {
    boxSizing: 'border-box',
    // position: 'absolute',
    width: '371px',
    height: '56px',
    left: '454px',
    top: '523px',
    background: 'rgba(255, 255, 255, 0.3)',
    boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: '50px',
  },
  lockIcon: {
    // position: 'absolute',
    width: '25px',
    height: '29px',
    left: '476px',
    top: '537px',
  },
  vector: {
    // position: 'absolute',
    left: '37.19%',
    right: '60.86%',
    top: '64.54%',
    bottom: '31.97%',
    background: 'rgba(169, 169, 169, 0.5)',
  },
  pw: {
    // position: 'absolute',
    width: '99px',
    height: '17px',
    left: '368px',
    top: '545px',
    fontFamily: "'Julius Sans One', sans-serif",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '17px',
    textAlign: 'center',
    color: '#000000',
  },
  passwordHint: {
    // position: 'absolute',
    width: '298px',
    height: '12px',
    left: '510px',
    top: '548px',
    fontFamily: "'Julius Sans One', sans-serif",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '11px',
    lineHeight: '12px',
    textAlign: 'center',
    color: '#909090',
  },
};

export default Password;