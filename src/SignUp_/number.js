import React from 'react';

const Number = () => {
  return (
    <div>
      <div style={styles.group14}></div>
      <div style={styles.group10}></div>
      <div style={styles.group15}></div>
      <div style={styles.rectangle2}></div>
      <div style={styles.certificationNumber}>Certification Number</div>
      <div style={styles.certificationHint}>인증번호를 입력하세요.</div>
    </div>
  );
};

const styles = {
  group14: {
    position: 'absolute',
    width: '497px',
    height: '56px',
    left: '257px',
    top: '443px',
  },
  group10: {
    position: 'absolute',
    width: '497px',
    height: '56px',
    left: '257px',
    top: '443px',
  },
  group15: {
    position: 'absolute',
    width: '497px',
    height: '56px',
    left: '257px',
    top: '443px',
  },
  rectangle2: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '299px',
    height: '56px',
    left: '455px',
    top: '553px',
    background: 'rgba(255, 255, 255, 0.3)',
    boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: '50px 10px 10px 50px',
  },
  certificationNumber: {
    position: 'absolute',
    width: '185px',
    height: '17px',
    left: '257px',
    top: '570px',
    fontFamily: "'Julius Sans One', sans-serif",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '17px',
    textAlign: 'center',
    color: '#000000',
  },
  certificationHint: {
    position: 'absolute',
    width: '197px',
    height: '13px',
    left: '473px',
    top: '578px',
    fontFamily: "'Julius Sans One', sans-serif",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '13px',
    textAlign: 'center',
    color: '#909090',
  },
};

export default Number;
